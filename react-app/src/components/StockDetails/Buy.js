import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {stockTransaction } from '../../store/transaction';

const Buy = ({ user, ticker, price }) => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.transactions.transactionData);
    console.log(data)
    const [transactionPrice, setTransactionPrice] = useState((0).toFixed(2));
    const [sharesBought, setSharesBought] = useState(0);
    const [order, setOrder] = useState('buy');
    const [balance, setBalance] = useState(user?.balance)

    const transactionTotal = e => {
        setSharesBought(e.target.value);
        setTransactionPrice((e.target.value * price).toFixed(2));
        //  price = market price per share
    }

    const buyStock = async (e) => {
        e.preventDefault();
        setOrder('ordered');
        setBalance((Number(balance) - Number(transactionPrice)).toFixed(2));
        let newBalance = (Number(balance) - Number(transactionPrice)).toFixed(2);

        let newTransaction = {
            user_id: user.id,
            shares: Number(sharesBought),
            price: Number(transactionTotal),
            type: 'buy',
            balance: Number(newBalance)
        }
        dispatch(stockTransaction(newTransaction))
    }

    if (buyStock) {
        setTimeout(() => {
            setOrder('buy');
        }, 3500)
    }

    return (
        <div>
            <form onSubmit={buyStock}>
                <div className='transaction-box'>
                    <div className='transaction-labels' id='buy-label'>Type: Buy</div>
                    <div className='transaction-labels'>Shares</div>
                    <select name="shares" id="shares" onChange={transactionTotal} value={sharesBought}>
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div className='transaction-info'>
                    <div className='transaction-labels'>Market Price</div>
                    <div id='transaction-stock-price'>
                        ${price}
                    </div>
                </div>
                <hr />
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
                <div className='transaction-labels' id='transaction-balance'>Balance Available: ${balance}</div>
            </form>
        </div>
    )
}
export default Buy;