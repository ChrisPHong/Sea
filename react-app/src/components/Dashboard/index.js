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

    useEffect(() => {
        dispatch(getTransactions(currentUser?.id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getStocks())
    }, [dispatch])

    const matchTicker = (companyId) => {
        const companies = Object.values(stocks)
        for (let stock of companies) {
            if (stock.id === companyId) {
                return stock.ticker
            }
        }
    }

    return (
        <div id='portfolio-ctn'>
            {/* -------------------- ASSETS GRAPH -------------------- */}
            <div className='portfolio-graph'>
                Graph here
            </div>
            <div id='info'>
                <div className=''>
                    {/* -------------------- OWNED STOCKS -------------------- */}
                    <ul>
                        {transArr.map(transaction => (
                            transaction.type === 'buy' && transaction.userId === currentUser.id
                            ?
                            <li key={transaction.id}>
                                <div className='stock-ctn'>
                                    <div className='owned-company'>
                                        Company: {matchTicker(transaction.companyId)}
                                    </div>
                                    <div className='owned-shares'>
                                        Shares: {transaction.shares}
                                    </div>
                                    <div className='owned-price'>
                                        Price: {transaction.price}
                                    </div>
                                </div>
                            </li>
                            : ""
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
