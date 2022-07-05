import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStockPrices, getStocks } from '../../store/stock';
import { getTransactions, getAllTransactions, getBoughtTransactions } from '../../store/transaction';
import { getPortfolio, getAssetPrices } from '../../store/portfolio';
import WatchlistPage from '../Watchlist'
import WatchlistForm from '../WatchlistForm';
import AddMoneyCurrentBalance from '../AddMoneyCurrentBalance'
import { getGeneralNews } from '../../store/news';
import MarketNews from '../MarketNews';
import AssetTable from '../AssetTable';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const assetPriceRef = useRef()
    const currentUser = useSelector(state => state?.session?.user);
    const stocks = useSelector(state => state?.stock?.entries)
    const transactions = useSelector(state => state?.transaction?.entries)
    const portfolioPrices = useSelector(state => state?.portfolio?.entries)
    const news = useSelector(state => state?.news?.entries)
    const assetPrices = useSelector(state => state?.portfolio?.prices)
    const boughtTransactions = useSelector(state => state?.transaction?.boughtTrans)
    const companies = Object.values(stocks)
    const transArr = Object.values(transactions)
    const portfolio = Object.values(portfolioPrices)
    const allBoughtTransArr = Object.values(boughtTransactions)
    const newsArr = Object.values(news)
    const options = { style: 'currency', currency: 'USD' };
    const currencyFormat = new Intl.NumberFormat('en-US', options);
    let sumAssetPrices = 0
    let nameTickerArr = []
    let closingPrice = []
    let assetBalance = []
    let portfolioBalance = 0
    let boughtTransArr = []
    let balToBackend

    // nameArr = []
    // sharesTotal = 0
    // totalPrice = 0
    // buy ? sharesTotal += shares : sharesTotal += -${shares}
    // {
        // name: set(nameArr),
        // shares: sharesTotal,
        // updatePrice:
    // }

    const [newData, setNewData] = useState(portfolio)
    const [currPrice, setCurrPrice] = useState(0)

    useEffect(() => {
        // dispatch(getTransactions(currentUser?.id))

        dispatch(getGeneralNews())
        dispatch(getAllTransactions())
        dispatch(getBoughtTransactions(currentUser?.id))
        dispatch(getStocks())

    }, [dispatch, currentUser])

    useEffect(() => {
        for (let compId in boughtTransactions) {
            dispatch(getAssetPrices(compId))
        }
        // boughtTransArr = boughtTransactions
    }, [dispatch, currentUser, stocks])


    useEffect(() => {
        dispatch(getPortfolio({ userId: currentUser?.id, currentBalance: balToBackend}))
        setNewData(portfolio)
    }, [currentUser, balToBackend, dispatch])

    useEffect(() => {
        if (balToBackend) {
            createData('1w')
            setNewData(portfolio?.slice(-7))
        }
    }, [portfolio?.length, currentUser, balToBackend])

    // Find name and ticker from transaction that matches with the pool of companies in database
    console.log('here are the bought transactions', boughtTransactions)
    for (let id in stocks) {
        let company = stocks[id]
        for (let i in boughtTransactions) {
            let transaction = boughtTransactions[i]
            if (company.id === transaction.companyId) {
                nameTickerArr.push({'name': company.name, 'ticker': company.ticker})
            }
        }
    }

    // Returns the last price (closing price) that YOU OWN along with
    // buyingPrice and number of shares to help calculate gain/loss percentage
    // as well as calculating asset balance
    for (let compId in assetPrices) {
        let pricesArr = assetPrices[compId]
        for (let companyId in boughtTransactions) {
            let transaction = boughtTransactions[companyId]
            if (compId === companyId) {
                closingPrice.push({
                    'closingPrice': pricesArr[pricesArr.length - 1].price,
                    'shares': transaction.shares,
                    'buyingPrice': transaction.price
                })
            }
        }
    }

    for (let price of closingPrice) {
        let total = price.closingPrice * price.shares
        assetBalance.push({'total': total, 'shares': price.shares})
    }

    // Total money you put in to buy shares
    const totalFunds = () => {
        let total = 0
        for (let compId in boughtTransactions) {
            let transaction = boughtTransactions[compId]
            total += transaction.price * transaction.shares
        }
        return total
    }

    // Returns the total price of ALL the stocks you own for the day.
    const buyingTotal = () => {
        let total = 0
        for (let price of closingPrice) {
            total += price.closingPrice * price.shares
        }
        return total

    }

    // TOTAL ASSET BALANCE
    for (let i in assetBalance) {
        let balance = assetBalance[i]
        portfolioBalance += balance.total

        if (parseInt(i) === assetBalance.length - 1) {
            balToBackend = portfolioBalance
        }
    }

    // console.log('what is this', typeof (Number(currPrice.toString().replace(/[^0-9.-]+/g,""))).toFixed(2))
    // number data type: 6472.009999999999

    const createData = (time) => {
        if (time === '1y' && balToBackend) {
            setNewData(portfolio)
            return newData
        }
        if (time === '1w' && balToBackend) {
            setNewData(portfolio?.slice(-7))
            return newData
        }
        if (time === '1m' && balToBackend) {
            setNewData(portfolio?.slice(-30))
            return newData
        }
        if (time === '3m' && balToBackend) {
            setNewData(portfolio?.slice(-90))
            return newData
        }
        if (time === '6m' && balToBackend) {
            setNewData(portfolio?.slice(-(Math.floor(portfolio?.length / 2))))
            return newData
        }
    }

    const lineMouseOver = (price) => {
        if (price) {
            setCurrPrice(price?.toFixed(2))
        } else {
            if (portfolioBalance) {
                setCurrPrice(portfolioBalance)
            }
        }
    }

    // Customized tooltip to show price and date
    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-price">{`$${((payload[0].value)).toFixed(2)}`}</p>
                    <p className="tooltip-date">{label}</p>
                </div>
            );
        }
        return null;
    }

    return (
        <div id='portfolio-ctn'>
            <h1 className='your-assets-heading'>Your assets</h1>
            {/* -------------------- ASSETS GRAPH -------------------- */}
            <div className='portfolio-graph'>
                <div className='balance-info'>
                    <div className='balance-label'>Balance</div>
                    <div className='balance-amt'>
                        {currPrice ? `${currencyFormat.format(currPrice)}` : currencyFormat.format(portfolioBalance)}
                    </div>
                    <div className='balance-percent'>
                        {(buyingTotal() > totalFunds()) ?
                            <div className='all-time-diff' style={{ color: 'green' }}>
                                +{currencyFormat.format(Math.abs((buyingTotal() - totalFunds())).toFixed(2))}
                            </div>
                            :
                            <div className='all-time-diff' style={{ color: 'red' }}>
                                -{currencyFormat.format(Math.abs((buyingTotal() - totalFunds())))}
                            </div>
                        }
                        <div className='all-time'>All time</div>
                    </div>
                </div>
                {/* -------------------- LINE CHART HERE -------------------- */}
                <div className='asset-chart'>
                    <LineChart
                        width={950}
                        height={300}
                        data={balToBackend && newData}
                        onMouseMove={(e) => lineMouseOver(e?.activePayload && e?.activePayload[0].payload.price)}
                    >
                        <XAxis dataKey="date" hide='true' />
                        <YAxis dataKey="price" domain={['dataMin', 'dataMax']} hide='true' />
                        <ReferenceLine y={totalFunds()} stroke="gray" strokeDasharray="3 3" />
                        <Tooltip
                            cursor={false}
                            content={customTooltip}
                        />
                        <Line
                            type="linear"
                            dataKey="price"
                            stroke="#0b7cee"
                            activeDot={{ r: 5 }}
                            dot={false}
                            animationDuration={500}
                            strokeWidth={2}
                        />
                    </LineChart>
                </div>
                <div className='asset-bottom'>
                    <div className='asset-timeframe'>
                        <span className='weekly'>
                            <button
                                value='1w'
                                className='weekly-btn'
                                onClick={e => createData(e.target.value)}
                            >
                                1W
                            </button>
                        </span>
                        <span className='monthly'>
                            <button
                                value='1m'
                                className='monthly-btn'
                                onClick={e => createData(e.target.value)}
                            >
                                1M
                            </button>
                        </span>
                        <span className='three-months'>
                            <button
                                value='3m'
                                className='three-months-btn'
                                onClick={e => createData(e.target.value)}
                            >
                                3M
                            </button>
                        </span>
                        <span className='six-months'>
                            <button
                                value='6m'
                                className='six-months-btn'
                                onClick={e => createData(e.target.value)}
                            >
                                6M
                            </button>
                        </span>
                        <span className='one-year'>
                            <button
                                value='1y'
                                className='one-year-btn'
                                onClick={e => createData(e.target.value)}
                            >
                                1Y
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <div id='info'>
                <div id='left'>
                    {/* -------------------- OWNED STOCKS -------------------- */}
                    <AssetTable
                        currentUser={currentUser}
                        stocks={stocks}
                        transArr={transArr}
                        nameTickerArr={nameTickerArr}
                        closingPrice={closingPrice}
                        currencyFormat={currencyFormat}
                        assetBalance={assetBalance}
                        buyingTotal={buyingTotal}
                    />
                    {/* -------------------- NEWS -------------------- */}
                    <div className='news-ctn'>
                        <MarketNews news={newsArr} />
                    </div>
                </div>
                <div id='right'>
                    {/* -------------------- WATCHLIST -------------------- */}
                    <div className='watchlist-form'>
                        <AddMoneyCurrentBalance />
                        <WatchlistForm />
                        <WatchlistPage />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
