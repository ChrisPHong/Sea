import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadTransactions, getAllTransactions } from '../../store/transaction';
import { getStocks } from '../../store/stock';
import './transaction.css';

function TransactionPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state?.session?.user);
    console.log('this is sesssion userrrrr', sessionUser)
    // console.log('this is sesssion userrrrr ID', sessionUser.id)
    const userId = sessionUser.id;
    // const user = useSelector((state) => (state.session.user));


    const transactionsObj = useSelector(state => state?.transaction?.entries)
    const companiesObj = useSelector(state => state?.stock?.entries)
    const companiesArr = Object.values(companiesObj)

    console.log('------comp obj----', companiesObj)

    // const state = useSelector(state => console.log('this is STATE!!!!!', state))
    console.log('---transactionsObj----', transactionsObj)

    const transactions = Object.values(transactionsObj ? transactionsObj : {})

    // Find ticker from transaction that matches with the pool of companies in database
    const matchTicker = (companyId) => {
        for (let stock of companiesArr) {
            if (stock.id === companyId) {
                return stock.ticker
            }
        }
    }

    // const companiesArr = Object.values(companiesObj ? companiesObj : {})
    // console.log('companies arrrr-----', companiesArr) // array of comp objs
    // console.log('comppppp ticker------', companiesObj[transaction.companyId].ticker)


    useEffect(() => {
        dispatch(getStocks());
        dispatch(getAllTransactions());
    }, [dispatch])

    return (
        <>
            <h1>Transaction Page</h1>
            <h1>Transaction Page</h1>
            <h1>Transaction Page</h1>
            <h1>Transaction Page</h1>
            <h1>Transaction Page</h1>

            <div className='transaction-container'>
                <h2>Transactions</h2>
                <div className='transaction-table'>
                    {transactions ?
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
                                    {transactions.map(transaction => {
                                        if (transaction.userId === userId) {
                                            return (<tr key={transaction.id} className={(transaction?.type === "sell") ? 'sell' : 'buy'}>
                                                {/* <td>{companiesObj && companiesObj[transaction.companyId].ticker}</td> */}
                                                <td>{matchTicker(transaction.companyId)}</td>
                                                <td>{transaction?.price}</td>
                                                <td>{transaction?.shares}</td>
                                                <td>{transaction?.type}</td>
                                                <td>{transaction?.date}</td>
                                            </tr>)
                                        }
                                    })}
                                </tbody>
                            </table>
                        ) :
                        (<div>You don't have any transactions yet.</div>)}

                </div>
            </div>
        </>
    )

}

export default TransactionPage;
