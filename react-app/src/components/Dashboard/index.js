import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnedWeeklyPrices, getStocks } from '../../store/stock';
import { getTransactions, getAllTransactions } from '../../store/transaction';
import { getGeneralNews } from '../../store/news';
import WatchlistPage from '../Watchlist'
import WatchlistForm from '../WatchlistForm';
import MarketNews from '../MarketNews';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state?.transaction?.entries)
    const stocks = useSelector(state => state?.stock?.entries)
    const currentUser = useSelector(state => state?.session?.user);
    const news = useSelector(state => state?.news?.entries)
    const transArr = Object.values(transactions)
    const companies = Object.values(stocks)
    const newsArr = Object.values(news)
    const data = []

    useEffect(() => {
        // dispatch(getTransactions(currentUser?.id))
        dispatch(getGeneralNews())
        dispatch(getAllTransactions())
        dispatch(getOwnedWeeklyPrices(currentUser?.id))
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

    const [currPrice, setCurrPrice] = useState(buyingTotal().toFixed(2))

    const getPurchasedShares = (companyId) => {
        for (let i = 0; i < transArr.length; i++) {
            let transaction = transArr[i];
            if (transaction?.type === 'buy' && companyId === transaction?.companyId) {
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

        // Add up all the stock prices under each column
        for (let i = 0; i < companies.length; i++) {
            // let prices = companies[i].prices
            if (companies.length) {
                for (let j = 0; j < companies[i]?.prices?.length; j++) {
                    totalPrices[j] += (companies[i]?.prices[j] * getPurchasedShares(companies[i]?.id))
                }

            }
        }

        const date = new Date().getTime()
        const dateCopy = new Date(date)

        // Based on the number to increment by,
        // new dates will be created and will be added to data array along with the matching price
        for (let i = inc; i >= 0; i--) {
            let newDate = dateCopy.setDate(dateCopy.getDate() - 1)
            if (totalPrices) {
                // Add to front of data array so that the most recent date and
                // price will be at the end and previous dates/price near the beginning
                data.unshift({
                    'date': new Date(newDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
                    'price': totalPrices[i]
                })
            }
        }
        data.push(dataObj)
    }
    getDatesAndPrices(60)

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
                <div className='balance-info'>
                    <div className='balance-label'>Balance</div>
                    <div className='balance-amt'>
                        ${buyingTotal().toFixed(2)}
                    </div>
                    <div className='balance-percent'>
                        {(buyingTotal() > totalFunds()) ?
                            <div className='all-time-diff' style={{ color: 'green' }}>
                                +${Math.abs((buyingTotal() - totalFunds())).toFixed(2)}
                            </div>
                            :
                            <div className='all-time-diff' style={{ color: 'red' }}>
                                -${Math.abs((buyingTotal() - totalFunds())).toFixed(2)}
                            </div>}
                        <div className='all-time'>All time</div>
                    </div>
                </div>
                {/* -------------------- LINE CHART HERE -------------------- */}
                <div className='asset-chart'>
                    <LineChart width={950} height={300} data={data}>
                        <XAxis dataKey="date" hide="true" />
                        <YAxis dataKey="price" domain={['dataMin', 'dataMax']} hide="true" />
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
                        // onMouseOver={{setChartPrice}}
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
                                                    <div className='owned-balance-price'>${(((transaction.price * transaction.shares) + transaction.shares * (closingPrice(transaction.companyId) - transaction.price)) * transaction.shares).toFixed(2)}</div>
                                                    <div className='owned-comp-shares'>{transaction.shares}</div>
                                                </td>
                                                {/* -------------------- PRICE SECTION -------------------- */}
                                                <td className='owned-comp-price'>
                                                    <div className='curr-comp-price'>${((transaction.price * transaction.shares) + transaction.shares * (closingPrice(transaction.companyId) - transaction.price)).toFixed(2)}</div>
                                                    {(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2) >= 0 ?
                                                        <div className='curr-comp-percent' style={{ color: 'green' }}>+{(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2)}%</div>
                                                        :
                                                        <div className='curr-comp-percent' style={{ color: 'red' }}>{(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2)}%</div>}
                                                </td>
                                                {/* -------------------- ALLOCATION SECTION -------------------- */}
                                                <td className='owned-allocations'>{(((closingPrice(transaction.companyId) * transaction.shares) / buyingTotal()) * 100).toFixed(2)}%</td>
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
