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
            if (stock?.id === companyId) {
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

            <div className='transaction-container'>
                <h2 className='TitleTransactions'>Transactions</h2>
                <div className='transaction-table'>
                    {transactions ?
                        (
                            <table>
                                <thead>
                                    <tr>
                                        <th className='ColumnNameTransactions'>COMPANY</th>
                                        <th className='ColumnNameTransactions'>PRICE</th>
                                        <th className='ColumnNameTransactions'>SHARES</th>
                                        <th className='ColumnNameTransactions'>BUY/SELL</th>
                                        <th className='ColumnNameTransactions'>DATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map(transaction => {
                                        if (transaction.userId === userId) {
                                            return (<tr key={transaction.id} className={(transaction?.type === "sell") ? 'sell' : 'buy'}>
                                                {/* <td>{companiesObj && companiesObj[transaction.companyId].ticker}</td> */}
                                                <td className='transactionColumn'>{matchTicker(transaction.companyId)}</td>
                                                <td className='transactionColumn'>${transaction?.price}</td>
                                                <td className='transactionColumn'>{transaction?.shares}</td>
                                                <td className='transactionColumn'>{transaction?.type.toUpperCase()}</td>
                                                <td className='transactionColumn'>{transaction?.date}</td>
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
