import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnedWeeklyPrices, getStocks } from '../../store/stock';
import { getTransactions } from '../../store/transaction';
import WatchlistPage from '../Watchlist'
import WatchlistForm from '../WatchlistForm';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state?.transaction?.entries)
    const stocks = useSelector(state => state?.stock?.entries)
    const currentUser = useSelector(state => state?.session?.user);
    const transArr = Object.values(transactions)
    const companies = Object.values(stocks)
    const allTransData = []

    useEffect(() => {
        dispatch(getTransactions(currentUser?.id))
        dispatch(getOwnedWeeklyPrices(currentUser?.id))
    }, [dispatch])

    // // Prices update every 30 seconds
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         dispatch(getOwnedWeeklyPrices(currentUser?.id))
    //     }, 30000)
    //     return () => clearInterval(interval);
    // })

    const getAllTransData = () => {
        const TransObj = {}
        // transactions.forEach(transaction => )
        // companies.forEach(comp => {
        //     allTransData.push(Object.assign(comp.prices))
        // })
        // console.log(allTransData)
        // console.log(transactions)
        // return allTransData
    }

    const startingPrice = () => {
        const firstTransaction = transArr[transArr.length - 1]
        return firstTransaction?.price * firstTransaction?.shares
    }

    const matchTicker = (companyId) => {
        for (let stock of companies) {
            if (stock.id === companyId) {
                return stock.ticker
            }
        }
    }

    const matchName = (companyId) => {
        for (let stock of companies) {
            if (stock.id === companyId) {
                return stock.name
            }
        }
    }

    const matchPrice = (companyId) => {
        for (let stock of companies) {
            if (stock.id === companyId && stock.prices) {
                const priceArr = stock.prices
                return priceArr[priceArr.length - 1]
            }
        }
    }

    const calculateTotal = () => {
        let total = 0
        for (let transaction of transArr) {
            if (transaction.type === 'buy') {
                total += matchPrice(transaction.companyId) * transaction.shares
            }
        }
        // console.log(total)
        return total
    }

    return (
        <div id='portfolio-ctn'>
            {/* -------------------- ASSETS GRAPH -------------------- */}
            <div className='portfolio-graph'>
                <div className='balance-info'>
                    <div className='balance-label'>Balance</div>
                    <div className='balance-amt'>
                        ${calculateTotal().toFixed(2)}
                    </div>
                    <div className='balance-percent'>
                        {(calculateTotal() - startingPrice()).toFixed(2) > startingPrice() ? '+' : '-'}${(calculateTotal() - startingPrice()).toFixed(2)}
                    </div>
                </div>
                <div className='asset-chart'>
                    <LineChart width={950} height={300} data={getAllTransData()}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="date" />
                    <YAxis dataKey="price" />
                        <Line
                            type="linear"
                            dataKey="prices"
                            stroke="#0b7cee"
                            activeDot={{ r: 5 }}
                            dot={false}
                            strokeWidth={1}
                        />
                    </LineChart>
                </div>
                <div className='asset-bottom'>
                    <div className='buying-power'>
                        Buying power: ${currentUser.balance}
                    </div>
                    <div className='asset-timeframe'>
                        <div className='daily'>
                            1D
                        </div>
                        <div className='weekly'>
                            1W
                        </div>
                        <div className='monthly'>
                            1M
                        </div>
                    </div>
                </div>
            </div>
            <div id='info'>
                <div id='left'>
                    {/* -------------------- OWNED STOCKS -------------------- */}
                    <div className='owned-assets'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='owned-comp-label'>Company</th>
                                    <th className='owned-price-label'>Balance</th>
                                    <th className='owned-shares-label'>Shares</th>
                                    <th className='owned-allocations-label'>Allocation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transArr.map(transaction => (
                                    transaction.type === 'buy' && transaction.userId === currentUser.id ?
                                    <tr key={transaction.id}>
                                        <td className='owned-comp-name'>
                                            <div className='company-name'>
                                                {matchName(transaction.companyId)}
                                            </div>
                                            <div className='company-ticker'>
                                                {matchTicker(transaction.companyId)}
                                            </div>
                                        </td>
                                        {/* <td className='owned-comp-price'>${matchPrice(transaction.companyId)?.toFixed(2)}</td> */}
                                        <td className='owned-comp-price'>${((transaction.price * transaction.shares) + transaction.shares * (matchPrice(transaction.companyId) - transaction.price)).toFixed(2)}</td>
                                        <td className='owned-comp-shares'>{transaction.shares}</td>
                                        <td className='owned-allocations'>{(((matchPrice(transaction.companyId) * transaction.shares) / calculateTotal()) * 100).toFixed(2)}%</td>
                                    </tr> : ""
                                ))}
                            </tbody>
                        </table>
                    </div>

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
