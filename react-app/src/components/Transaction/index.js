import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadTransactions } from '../../store/transaction';
import './transaction.css';

function TransactionPage () {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state?.session?.user);
    const userId = sessionUser.id;
    const transactionsObj = useSelector(state => state?.transaction?.entries)
    // const transactions = useSelector(state => console.log(state))
    console.log('---transactions----', transactionsObj)
    const transactions = Object.values(transactionsObj ? transactionsObj : {})

    useEffect(() => {
        if(!sessionUser) {
            history.push('/login')
        } else {
            dispatch(loadTransactions(userId));
        }
    }, [dispatch, userId])

    return (
        <div className='transaction-container'>
            <h2>Transactions</h2>
            <div className='transaction-table'>
                {transactions && transactions.length ?
                (
                    <table>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Price</th>
                                <th>Shares</th>
                                <th>Buy/Sell</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id} className={(transaction?.type === "sell") ? 'sell' : 'buy'}>
                                    <td>{transaction?.companyId}</td>
                                    <td>{transaction?.price}</td>
                                    <td>{transaction?.shares}</td>
                                    <td>{transaction?.type}</td>
                                    <td>{transaction?.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ):
                (<div>You don't have any transactions yet.</div>)}

            </div>
        </div>
    )

}

export default TransactionPage;
