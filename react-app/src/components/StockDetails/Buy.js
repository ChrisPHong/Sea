import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoughtTransactions, stockTransaction, updateTransaction } from '../../store/transaction';

const Buy = ({ user, companyId, ticker, priceData }) => {

    const dispatch = useDispatch()
    const transactions = useSelector(state => state?.transaction?.entries);
    const updatedTransaction = useSelector(state => state?.transaction?.boughtTrans)
    const transArr = Object.values(transactions)
    const updatedTransArr = Object.values(updatedTransaction)
    const userId = user.id;
    const options = { style: 'currency', currency: 'USD' };
    const currencyFormat = new Intl.NumberFormat('en-US', options);

    const [transactionPrice, setTransactionPrice] = useState((0).toFixed(2));
    const [sharesBought, setSharesBought] = useState(0);
    const [order, setOrder] = useState('buy');
    const [balance, setBalance] = useState(user?.balance)


    useEffect(() => {
        setSharesBought(0)
        setTransactionPrice((0).toFixed(2))
    }, [priceData])

    const transactionTotal = e => {
        setSharesBought(e.target.value);
        setTransactionPrice((e.target.value * (priceData.price)).toFixed(2));
        //  price = market price per share
    }


    const buyStock = async (e) => {
        e.preventDefault();
        setOrder('ordered');
        setBalance((Number(balance) - Number(transactionPrice)).toFixed(2));
        let newBalance = (Number(balance) - Number(transactionPrice)).toFixed(2);

        let newTransaction = {
            price: Number(transactionPrice).toFixed(2),
            shares: sharesBought,
            type: 'buy',
            user_id: user.id,
            company_id: companyId,
            balance: Number(newBalance).toFixed(2)
        }

            dispatch(stockTransaction(newTransaction))
            dispatch(getBoughtTransactions(user?.id))

    }

    if (buyStock) {
        setTimeout(() => {
            setOrder('buy');
        }, 3500)
    }

    const preventMinus = (e) => {
        if (!e.code.includes('Digit')) {
            e.preventDefault();
        }
    };

    return (
        <div>
            <form onSubmit={buyStock}>
                <div className='transaction-box'>
                    {/* <div className='transaction-labels' id='buy-label'>
                        <h2>
                            Buy
                        </h2>
                    </div> */}
                    <div className='transaction-info'>
                        <div className='transaction-labels'>Market Price</div>
                        <div id='transaction-stock-price'>
                            ${priceData && Number(priceData.price).toFixed(2)}
                        </div>
                    </div>
                    <div className='shares-ctn'>
                        <div className='transaction-labels'>Shares</div>
                        <input
                            type="number"
                            min='0'
                            onKeyPress={preventMinus}
                            name="shares"
                            id="shares"
                            onChange={transactionTotal}
                            value={sharesBought}
                        />
                    </div>
                </div>
                <hr id='buy-sell-hr' />
                <div className='transaction-info'>
                    <div className='transaction-labels'>Estimated Cost</div>
                    <div id='transaction-estimate'>
                        ${transactionPrice}
                    </div>
                </div>
                <div className='transaction-btn'>
                    <button id='buy-btn' type="submit"
                        onClick={(e) => {
                            buyStock(e);
                        }}
                        disabled={(balance > Number(transactionPrice) && sharesBought !== "") ? false : true}>
                        {order}
                    </button>
                </div>
                <div className='transaction-labels' id='transaction-balance'>Balance Available: {currencyFormat.format(balance)}</div>
            </form>
        </div>
    )
}
export default Buy;
