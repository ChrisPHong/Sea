import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStockPrices, getStocks } from '../../store/stock';
import { getTransactions, getAllTransactions } from '../../store/transaction';
import { getPortfolio, getAssetPrices } from '../../store/portfolio';
import WatchlistPage from '../Watchlist'
import WatchlistForm from '../WatchlistForm';
import PortfolioChart from '../AssetTable';
import { getGeneralNews } from '../../store/news';
import MarketNews from '../MarketNews';
import AssetTable from '../AssetTable';
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
// import { getPortfolio } from '../../store/portfolio';
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
    const companies = Object.values(stocks)
    const transArr = Object.values(transactions)
    const portfolio = Object.values(portfolioPrices)
    const newsArr = Object.values(news)
    const options = { style: 'currency', currency: 'USD' };
    const currencyFormat = new Intl.NumberFormat('en-US', options);
    let sumAssetPrices = 0
    let nameTickerArr = []
    let closingPrice = []
    let gainLossArr = []
    let assetBalance = []

    const [balanceVal, setBalanceVal] = useState(sumAssetPrices)

    console.log('portfolio here', portfolio)

    useEffect(() => {
        // dispatch(getTransactions(currentUser?.id))

        dispatch(getGeneralNews())
        dispatch(getAllTransactions())
        dispatch(getStocks())

    }, [dispatch, currentUser])

    useEffect(() => {
        for (let transaction of transArr) {
            if (transaction.type === 'buy') {
                dispatch(getAssetPrices(transaction?.companyId))
            }
        }
    }, [dispatch, currentUser, stocks])

    useEffect(() => {
        setBalanceVal(sumAssetPrices)
        console.log('here is our balanceVal', balanceVal)
    }, [])

    useEffect(() => {
        dispatch(getPortfolio({ userId: currentUser?.id, currentBalance: closingPriceAndSumUp() }))
    }, [dispatch, currentUser])

    // Returns the total price of ALL the stocks you own for the day.
    const buyingTotal = () => {
        let total = 0
        for (let compId in assetPrices) {
            const prices = assetPrices[parseInt(compId)]
            total += prices[prices.length - 1].price
        }
        return total.toLocaleString('en-US')
    }

    // Find name and ticker from transaction that matches with the pool of companies in database
    for (let id in stocks) {
        let company = stocks[id]
        for (let transaction of transArr) {
            if (company.id === transaction?.companyId) {
                nameTickerArr.push({'name': company.name, 'ticker': company.ticker})
            }
        }
    }

    // Returns the last price (closing price) that YOU OWN along with
    // buyingPrice and number of shares to help calculate gain/loss percentage
    // as well as calculating asset balance
    for (let compId in assetPrices) {
        for (let transaction of transArr) {
            if (parseInt(compId) === transaction?.companyId) {
                let pricesArr = assetPrices[compId]
                closingPrice.push({
                    'closingPrice': pricesArr[pricesArr.length - 1].price,
                    'shares': transaction.shares,
                    'buyingPrice': transaction.price
                })
            }
        }
    }

    // Total money you put in to buy shares
    const totalFunds = () => {
        let total = 0
        for (let transaction of transArr) {
            if (transaction?.type === 'buy') {
                total += transaction.price * transaction.shares
            }
        }
        return total.toLocaleString('en-US')
    }

    const closingPriceAndSumUp = (transaction) => {
        for (let compId in assetPrices) {
            if (parseInt(compId) === transaction?.companyId) {
                let pricesArr = assetPrices[compId]
                sumAssetPrices += pricesArr[pricesArr.length - 1].price * transaction?.shares
                return pricesArr[pricesArr.length - 1].price
            }
        }
        return sumAssetPrices
    }



    // -------------------------------------- GRAPH CODE --------------------------------------
    // const transArr = Object.values(transactions)
    const [newData, setNewData] = useState(portfolio)
    const stock = useSelector(state => state?.stock)
    // console.log(" THIS IS THE STOCK CHECKER FOR THE STOCK CHART", stock.prices)
    const [currPrice, setCurrPrice] = useState(newData[newData?.length - 1])

    // useEffect(() => {
    //     // dispatch(getPortfolio(currentUser?.id))
    // }, [dispatch])
    // Once portfolio is fetched, display the one week graph.
    useEffect(() => {
        createData('1w')
    }, [portfolio?.length, currentUser])

    const createData = (time) => {
        if (time === '1y') {
            setNewData(portfolio)
            return newData
        }
        if (time === '1w') {
            setNewData(portfolio?.slice(-7))
            return newData
        }
        if (time === '1m') {
            setNewData(portfolio?.slice(-30))
            return newData
        }
        if (time === '3m') {
            setNewData(portfolio?.slice(-90))
            return newData
        }
        if (time === '6m') {
            setNewData(portfolio?.slice(-(Math.floor(portfolio?.length / 2))))
            return newData
        }
    }

    const lineMouseOver = (price) => {
        if (price) {
            setCurrPrice(price?.toFixed(2))
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





    //     return (
//         <>
//             <div className='balance-info'>
//                 <div className='balance-label'>Balance</div>
//                 <div className='balance-amt'>
//                     {sumAssetPrices}
//                 </div>
//                 <div className='balance-percent'>
//                     {(buyingTotal() > totalFunds()) ?
//                         <div className='all-time-diff' style={{ color: 'green' }}>
//                             +${(Math.abs((buyingTotal() - totalFunds())).toFixed(2)).toLocaleString('en-US')}
//                         </div>
//                         :
//                         <div className='all-time-diff' style={{ color: 'red' }}>
//                             -${Math.abs((buyingTotal() - totalFunds())).toFixed(2)}
//                         </div>
//                     }
//                     <div className='all-time'>All time</div>
//                 </div>
//             </div>
//             {/* -------------------- LINE CHART HERE -------------------- */}
//             <div className='asset-chart'>
//                 <LineChart
//                     width={950}
//                     height={300}
//                     data={newData}
//                     onMouseMove={(e) => lineMouseOver(e?.activePayload && e?.activePayload[0].payload.price)}
//                 >
//                     <XAxis dataKey="date" hide='true' />
//                     <YAxis dataKey="price" domain={['dataMin', 'dataMax']} hide='true' />
//                     <ReferenceLine y={totalFunds()} stroke="gray" strokeDasharray="3 3" />
//                     <Tooltip
//                         cursor={false}
//                         content={customTooltip}
//                     />
//                     <Line
//                         type="linear"
//                         dataKey="price"
//                         stroke="#0b7cee"
//                         activeDot={{ r: 5 }}
//                         dot={false}
//                         animationDuration={500}
//                         strokeWidth={2}
//                     />
//                 </LineChart>
//             </div>
//             <div className='asset-bottom'>
//                 <div className='buying-power'>
//                     Buying power: ${(currentUser.balance).toLocaleString('en-US')}
//                 </div>
//                 <div className='asset-timeframe'>
//                     <span className='weekly'>
//                         <button
//                             value='1w'
//                             onClick={e => createData(e.target.value)}
//                         >
//                             1W
//                         </button>
//                     </span>
//                     <span className='monthly'>
//                         <button
//                             value='1m'
//                             onClick={e => createData(e.target.value)}
//                         >
//                             1M
//                         </button>
//                     </span>
//                     <span className='three-months'>
//                         <button
//                             value='3m'
//                             onClick={e => createData(e.target.value)}
//                         >
//                             3M
//                         </button>
//                     </span>
//                     <span className='six-months'>
//                         <button
//                             value='6m'
//                             onClick={e => createData(e.target.value)}
//                         >
//                             6M
//                         </button>
//                     </span>
//                     <span className='one-year'>
//                         <button
//                             value='1y'
//                             onClick={e => createData(e.target.value)}
//                         >
//                             1Y
//                         </button>
//                     </span>
//                 </div>
//             </div>
//         </>
//     )
// }










    return (
        <div id='portfolio-ctn'>
            <h1 className='your-assets-heading'>Your assets</h1>
            {/* -------------------- ASSETS GRAPH -------------------- */}
            <div className='portfolio-graph'>
                <PortfolioChart
                    currentUser={currentUser}
                    portfolio={portfolio}
                    totalFunds={totalFunds}
                    buyingTotal={buyingTotal}
                    assetBalance={sumAssetPrices}
                />
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
                    />
                    {/* -------------------- NEWS -------------------- */}
                    <div ref={assetPriceRef}>{sumAssetPrices}</div>
                    <div hidden={true}>
                        <PortfolioChart
                            currentUser={currentUser}
                            portfolio={portfolio}
                            totalFunds={totalFunds}
                            buyingTotal={buyingTotal}
                            assetBalance={sumAssetPrices}
                            sumAssetPrices={sumAssetPrices}
                        />
                    </div>
                    <div className='news-ctn'>
                        <MarketNews news={newsArr} />
                    </div>
                </div>
                <div id='right'>
                    {/* -------------------- WATCHLIST -------------------- */}
                    <div className='watchlist-form'>
                        <WatchlistForm />
                        <WatchlistPage />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
