import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStockPrices, getStocks } from '../../store/stock';
import { getTransactions, getAllTransactions } from '../../store/transaction';
import { getPortfolio, getAssetPrices } from '../../store/portfolio';
import WatchlistPage from '../Watchlist'
import WatchlistForm from '../WatchlistForm';
import PortfolioChart from '../PortfolioChart';
import { getGeneralNews } from '../../store/news';
import MarketNews from '../MarketNews';
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


    // Returns the last price (closing price) in the stock prices array that YOU OWN.
    const closingPrice = (companyId) => {
        for (let compId in assetPrices) {
            if (parseInt(compId) === companyId) {
                // console.log('here is the assetPrices being returned hopefully its all different', assetPrices[compId].length - 1)
                let pricesArr = assetPrices[compId]
                return pricesArr[pricesArr.length - 1].price
            }
        }
    }

    // Returns the total price of ALL the stocks you own for the day.
    const buyingTotal = () => {
        let total = 0
        for (let compId in assetPrices) {
            const prices = assetPrices[parseInt(compId)]
            total += prices[prices.length - 1].price
        }
        return total.toLocaleString('en-US')
    }

    // Find ticker from transaction that matches with the pool of companies in database
    const matchTicker = (companyId) => {
        for (let stock of companies) {
            if (stock?.id === companyId) {
                return stock.ticker
            }
        }
    }

    // Find name from transaction that matches with the pool of companies in database
    const matchName = (companyId) => {
        for (let stock of companies) {
            if (stock?.id === companyId) {
                return stock.name
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
        console.log('in closing price and sum up', sumAssetPrices)
        return sumAssetPrices
    }

    const saveLatestBalance = (num) => {
        const finalBalance = num
        console.log('what is our final balance now?!?!?!?!?', finalBalance)
        sumAssetPrices = finalBalance
        console.log('did final balance did transfereed over to sumAssetPrices', sumAssetPrices)

        return sumAssetPrices
        // setBalanceVal(finalBalance)
    }

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
                    saveLatestBalance={saveLatestBalance}
                />
            </div>
            <div id='info'>
                <div id='left'>
                    {/* -------------------- OWNED STOCKS -------------------- */}
                    <div className='owned-assets'>
                        {transArr.length ?
                            <table>
                                <thead>
                                    <tr>
                                        <th className='owned-comp-label'>Company</th>
                                        <th className='owned-shares-label'>Balance</th>
                                        <th className='owned-price-label'>Price</th>
                                        <th className='owned-allocations-label'>Allocation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stocks && transArr.map(transaction => (
                                        transaction.type === 'buy' && transaction.userId === currentUser.id ?
                                            <tr key={transaction.id}>
                                                {/* -------------------- COMPANY SECTION -------------------- */}
                                                <td className='owned-comp-name'>
                                                    <div className='company-name'>
                                                        {matchName(transaction.companyId)}
                                                    </div>
                                                    <div className='company-ticker'>
                                                        {matchTicker(transaction.companyId)}
                                                    </div>
                                                </td>
                                                {/* -------------------- BALANCE SECTION -------------------- */}
                                                <td className='owned-balance'>
                                                    <div className='owned-balance-price'>{currencyFormat.format(transaction?.shares * closingPriceAndSumUp(transaction))}</div>
                                                    <div className='owned-comp-shares'>{transaction.shares}</div>
                                                </td>
                                                {/* -------------------- PRICE SECTION -------------------- */}
                                                <td className='owned-comp-price'>
                                                    <div className='curr-comp-price'>{currencyFormat.format(closingPrice(transaction?.companyId))}</div>
                                                    {(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2) >= 0 ?
                                                        <div className='curr-comp-percent' style={{ color: 'green' }}>+{(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2)}%</div>
                                                        :
                                                        <div className='curr-comp-percent' style={{ color: 'red' }}>{(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2)}%</div>}
                                                </td>
                                                {/* -------------------- ALLOCATION SECTION -------------------- */}
                                                <td className='owned-allocations'>
                                                    {(((closingPrice(transaction.companyId) * transaction.shares) / buyingTotal()) * 100).toFixed(2)}%</td>
                                            </tr> : ""
                                    ))}
                                </tbody>
                            </table>
                            :
                            <p>You do not have any stocks!</p>}
                    </div>
                    {/* -------------------- NEWS -------------------- */}
                    <div>{saveLatestBalance(sumAssetPrices)}</div>
                    <div ref={assetPriceRef}>{sumAssetPrices}</div>
                    <div hidden={true}>
                        <PortfolioChart
                            currentUser={currentUser}
                            portfolio={portfolio}
                            totalFunds={totalFunds}
                            buyingTotal={buyingTotal}
                            assetBalance={sumAssetPrices}
                            saveLatestBalance={saveLatestBalance}
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
