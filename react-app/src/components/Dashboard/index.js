import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../store/transaction';
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state?.transaction?.entries)
    const currentUser = useSelector(state => state?.session?.user);
    const transArr = Object.values(transactions)

    useEffect(() => {
        dispatch(getTransactions(currentUser?.id))
    }, [dispatch])

    return (
        <>
            <h1>Hi from Dashboard!</h1>
            <ul>
                {transArr.map(transaction => (
                    transaction.type === 'buy'
                    ?
                    <li key={transaction.id}>
                        <div>
                            Company: {transaction.companyId}
                        </div>
                        <div>
                            Shares: {transaction.shares}
                        </div>
                        <div>
                            Date: {transaction.date}
                        </div>
                        <div>
                            Price: {transaction.price}
                        </div>
                    </li>
                    : ""
                ))}
            </ul>
        </>
    )
}

export default Dashboard
