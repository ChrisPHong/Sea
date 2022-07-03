import { useEffect, useState } from 'react';
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

    const [assetBalance, setAssetBalance] = useState(0)

    useEffect(() => {
        // dispatch(getTransactions(currentUser?.id))

        dispatch(getGeneralNews())
        dispatch(getAllTransactions())
        dispatch(getPortfolio({ userId: currentUser?.id, currentBalance: totalBalance() }))
        dispatch(getStocks())

    }, [dispatch, currentUser])

    // UPDATE THIS: Currently trying to iterate through each owned company in transaction array
    // If owned, dispatch to get the stock prices of the company by providing the companyId
    // OKAY THIS ACTUALLY WORKS, BUT NOW WE NEED TO FIGURE OUT HOW TO GRAB THE CORRECT PRICES ARRAY AND MATCH IT TO ITS CORRESPONDING COMPANY
    useEffect(() => {
        for (let transaction of transArr) {
            if (transaction.type === 'buy') {
                dispatch(getAssetPrices(transaction?.companyId))
            }
        }
    }, [dispatch, currentUser, stocks])

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
        for (let transaction of transArr) {
            if (transaction.type === 'buy') {
                // console.log('this is the transArr', transArr)
                // console.log('this is what were adding to the total', closingPrice(transaction.companyId) * transaction.shares)
                total += closingPrice(transaction.companyId) * transaction.shares
            }
            // } else if (transaction.type === 'sell') {
            //     total -= closingPrice(transaction.companyId) * transaction.shares
            // }
        }
        return total
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

    const totalBalance = () => {
        let topBalance = 0
        for (let transaction of transArr) {
            if (transaction?.type === 'buy') {
                topBalance += transaction.shares * (closingPrice(transaction?.companyId))
            }
        }
        return topBalance
    }

    let sumAssets = 0
    const closingPriceAndSumUp = (transaction) => {
        for (let compId in assetPrices) {
            if (parseInt(compId) === transaction?.companyId) {
                let pricesArr = assetPrices[compId]
                sumAssets += pricesArr[pricesArr.length - 1].price * transaction?.shares
                return pricesArr[pricesArr.length - 1].price
            }
        }
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
                    assetBalance={assetBalance}
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
                                                    <div className='owned-balance-price'>{currencyFormat.format(transaction?.shares * closingPrice(transaction?.companyId))}</div>
                                                    <div className='owned-comp-shares'>{transaction.shares}</div>
                                                </td>
                                                {/* -------------------- PRICE SECTION -------------------- */}
                                                <td className='owned-comp-price'>
                                                    <div className='curr-comp-price'>{currencyFormat.format(closingPriceAndSumUp(transaction))}</div>
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
