import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnedWeeklyPrices, getStocks } from '../../store/stock';
import { getTransactions } from '../../store/transaction';
import WatchlistPage from '../Watchlist'
import WatchlistForm from '../WatchlistForm';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state?.transaction?.entries)
    const stocks = useSelector(state => state?.stock?.entries)
    const currentUser = useSelector(state => state?.session?.user);
    const transArr = Object.values(transactions)
    const companies = Object.values(stocks)
    const data = []
    console.log(companies)
    console.log('here is the transaction OBJ', transArr)

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

    const getPurchasedShares = (companyId) => {
        for (let i = 0; i < transArr.length; i++) {
            let transaction = transArr[i];
            if (transaction?.type === 'buy' && companyId === transaction?.companyId) {
                console.log('MY SHARES RIGHT HURRRRRR', transaction.shares)
                return transaction.shares
            }
        }
    }

    const getDatesAndPrices = (inc) => {
        const dataObj = {}
        let totalPrices = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        // let totalPrices;
        // totalPrices = companies[0]?.prices
        // [1, 2, 3, 4, 5]
        // let initialVal = 0

        // Add up all the stock prices under each column
        for (let i = 0; i < companies.length; i++) {
            let prices = companies[i].prices
            console.log('here are all the prices', prices)
            // console.log('what is this companies id', companies[i].id)
            // console.log('what is this TRANSACTIONS SHARES', transactions[i]?.companyId)
            for (let j = 0; j < prices.length; j++) {
                console.log('IM ON MY LAST LEGS HERE', companies[i]?.id)
                totalPrices[j] += (prices[j] * getPurchasedShares(companies[i]?.id))// 2, 4, 6
                // initialVal += prices[j]

            }
        }
        // for (let i = 1; i < companies.length; i++) {
        //     let prices = companies[i].prices
        //     for (let j = 0; j < prices.length; j++) {
        //         totalPrices[j] += prices[j] // 2, 4, 6
        //     }
        // }

        console.log('total prices array',totalPrices)

        const date = new Date().getTime()
        const dateCopy = new Date(date)

        for (let i = inc; i >= 0; i--) {
            let newDate = dateCopy.setDate(dateCopy.getDate() - 1)
            if (totalPrices) {
                data.unshift({'date': new Date(newDate), 'price': totalPrices[i]})
            }
        }
        data.push(dataObj)
    }
    getDatesAndPrices(60)
    console.log('data with the totalPrices in each date', data)

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
                <div className='balance-info'>
                    <div className='balance-label'>Balance</div>
                    <div className='balance-amt'>
                        {/* ${data[0]?.price?.toFixed(2)} */}
                        ${buyingTotal().toFixed(2)}
                    </div>
                    <div className='balance-percent'>
                        {(buyingTotal() > totalFunds()) ?
                        <div className='all-time-diff' style={{color: 'green'}}>
                            +${Math.abs((buyingTotal() - totalFunds())).toFixed(2)}
                        </div>
                        :
                        <div className='all-time-diff' style={{color: 'red'}}>
                            -${Math.abs((buyingTotal() - totalFunds())).toFixed(2)}
                        </div>}
                        <div className='all-time'>All time</div>
                    </div>
                </div>
                <div className='asset-chart'>
                    <LineChart width={950} height={300} data={data}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="date" hide="true" />
                    <YAxis dataKey="price" hide='"true' />
                    <Tooltip cursor={false} />
                        <Line
                            type="linear"
                            dataKey="price"
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
                                        {/* <td className='owned-comp-price'>${closingPrice(transaction.companyId)?.toFixed(2)}</td> */}
                                        <td className='owned-comp-price'>${((transaction.price * transaction.shares) + transaction.shares * (closingPrice(transaction.companyId) - transaction.price)).toFixed(2)}</td>
                                        <td className='owned-comp-shares'>{transaction.shares}</td>
                                        <td className='owned-allocations'>{(((closingPrice(transaction.companyId) * transaction.shares) / buyingTotal()) * 100).toFixed(2)}%</td>
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
