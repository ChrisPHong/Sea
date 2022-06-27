import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStocks } from '../../store/stock';
import { getTransactions } from '../../store/transaction';
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state?.transaction?.entries)
    const stocks = useSelector(state => state?.stock?.entries)
    const currentUser = useSelector(state => state?.session?.user);
    const transArr = Object.values(transactions)
    const companies = Object.values(stocks)

    useEffect(() => {
        dispatch(getTransactions(currentUser?.id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getStocks())
    }, [dispatch])

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

    const calculateTotal = () => {
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
                Graph here
            </div>
            <div id='info'>
                <div id='left'>
                    {/* -------------------- OWNED STOCKS -------------------- */}
                    <div className='owned-assets'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='owned-comp-label'>
                                        Company
                                    </th>
                                    <th className='owned-price-label'>
                                        Price
                                    </th>
                                    <th className='owned-shares-label'>
                                        Shares
                                    </th>
                                    <th className='owned-allocations-label'>
                                        Allocation
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transArr.map(transaction => (
                                    transaction.type === 'buy' && transaction.userId === currentUser.id
                                    ?
                                    <tr key={transaction.id}>
                                        {/* <div className='stock-ctn'> */}
                                            <td className='owned-comp-name'>
                                                <div className='company-name'>
                                                    {matchName(transaction.companyId)}
                                                </div>
                                                <div className='company-ticker'>
                                                    {matchTicker(transaction.companyId)}
                                                </div>
                                            </td>
                                            <td className='owned-comp-price'>{transaction.price}</td>
                                            <td className='owned-comp-shares'>{transaction.shares}</td>
                                            <td className='owned-allocations'>{((20 * transaction.shares) / 2000).toFixed(2)}%</td>
                                        {/* </div> */}
                                    </tr>
                                    : ""
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
                        Watchlist Container Here
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
