import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStocks } from '../../store/stock';
import { getTransactions, getAllTransactions } from '../../store/transaction';
import WatchlistPage from '../Watchlist'
import WatchlistForm from '../WatchlistForm';
import StockChart from '../StockChart';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state?.transaction?.entries)
    const stocks = useSelector(state => state?.stock?.entries)
    const currentUser = useSelector(state => state?.session?.user);
    const transArr = Object.values(transactions)
    const companies = Object.values(stocks)

    useEffect(() => {
        // dispatch(getTransactions(currentUser?.id))
        dispatch(getAllTransactions())

    }, [dispatch])



    // // Prices update every 30 seconds
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         dispatch(getOwnedWeeklyPrices(currentUser?.id))
    //     }, 30000)
    //     return () => clearInterval(interval);
    // })

    // Returns the last price (closing price) in the stock prices array that YOU OWN.
    const closingPrice = (companyId) => {
        for (let stock of companies) {
            if (stock.id === companyId && stock.prices) {
                const priceArr = stock.prices
                return priceArr[priceArr.length - 1]
            }
        }
    }

    // Returns the total price of ALL the stocks you own for the day.
    const buyingTotal = () => {
        let total = 0
        for (let transaction of transArr) {
            if (transaction.type === 'buy') {
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
            if (stock.id === companyId) {
                return stock.ticker
            }
        }
    }

    // Find name from transaction that matches with the pool of companies in database
    const matchName = (companyId) => {
        for (let stock of companies) {
            if (stock.id === companyId) {
                return stock.name
            }
        }
    }

    // Total money you put in to buy shares
    const totalFunds = () => {
        let total = 0
        for (let transaction of transArr) {
            if (transaction.type === 'buy') {
                total += transaction.price * transaction.shares
            }
        }
        return total
    }

    return (
        <div id='portfolio-ctn'>
            {/* -------------------- ASSETS GRAPH -------------------- */}
            <div className='portfolio-graph'>
                <StockChart
                    totalFunds={totalFunds}
                    currentUser={currentUser}
                    companies={companies}
                    transArr={transArr}
                    buyingTotal={buyingTotal}
                />
            </div>
            <div id='info'>
                <div id='left'>
                    {/* -------------------- OWNED STOCKS -------------------- */}
                    {/* <div className='owned-assets'>
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
                                    {transArr.map(transaction => (
                                        transaction.type === 'buy' && transaction.userId === currentUser.id ?
                                            <tr key={transaction.id}> */}
                                                {/* -------------------- COMPANY SECTION -------------------- */}
                                                {/* <td className='owned-comp-name'>
                                                    <div className='company-name'>
                                                        {matchName(transaction.companyId)}
                                                    </div>
                                                    <div className='company-ticker'>
                                                        {matchTicker(transaction.companyId)}
                                                    </div>
                                                </td> */}
                                                {/* -------------------- BALANCE SECTION -------------------- */}
                                                {/* <td className='owned-balance'>
                                                    <div className='owned-balance-price'>${(((transaction.price * transaction.shares) + transaction.shares * (closingPrice(transaction.companyId) - transaction.price)) * transaction.shares).toFixed(2)}</div>
                                                    <div className='owned-comp-shares'>{transaction.shares}</div>
                                                </td> */}
                                                {/* -------------------- PRICE SECTION -------------------- */}
                                                {/* <td className='owned-comp-price'>
                                                    <div className='curr-comp-price'>${((transaction.price * transaction.shares) + transaction.shares * (closingPrice(transaction.companyId) - transaction.price)).toFixed(2)}</div>
                                                    {(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2) >= 0 ?
                                                        <div className='curr-comp-percent' style={{ color: 'green' }}>+{(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2)}%</div>
                                                        :
                                                        <div className='curr-comp-percent' style={{ color: 'red' }}>{(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2)}%</div>}
                                                </td> */}
                                                {/* -------------------- ALLOCATION SECTION -------------------- */}
                                                {/* <td className='owned-allocations'>
                                                    {(((closingPrice(transaction.companyId) * transaction.shares) / buyingTotal()) * 100).toFixed(2)}%</td>
                                            </tr> : ""
                                    ))}
                                </tbody>
                            </table>
                            :
                            <p>You do not have any stocks!</p>}
                    </div> */}

                    {/* -------------------- NEWS -------------------- */}
                    <div className='news-ctn'>
                        News Container Here
                    </div>
                </div>
                <div id='right'>
                    {/* -------------------- WATCHLIST -------------------- */}
                    <div className='watchlist-ctn'>
                        <WatchlistPage />
                        <WatchlistForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
