import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {stockTransaction } from '../../store/transaction';

const Sell = ({ user, ticker, price, shares }) => {
    const dispatch = useDispatch();
    const [userShares, setUserShares] = useState(shares);
    const [transactionPrice, setTransactionPrice] = useState((0).toFixed(2));
    const [order, setOrder] = useState('sell');
    const [sharesSold, setSharesSold] = useState(0);
    const [balance, setBalance] = useState(user?.balance);

    const transactionTotal = e => {
        setSharesSold(e.target.value);
        setTransactionPrice((e.target.value * price).toFixed(2));
        //  price = market price per share
    }

    const sellStock = async (e) => {
        e.preventDefault();
        setOrder('sold');
        setUserShares(userShares - sharesSold);
        setBalance((Number(balance) + Number(transactionPrice)).toFixed(2));
        let newBalance = (Number(balance) + Number(transactionPrice)).toFixed(2);

            let newTransaction = {
                user_id: user.id,
                shares: Number(-sharesSold),
                price: Number(transactionTotal),
                type: 'sell',
                balance: Number(newBalance)
            }
            dispatch(stockTransaction(newTransaction))
    }

    if (sellStock) {
        setTimeout(() => {
            setOrder('sell')
        }, 3000)
    }

    return (
        <div>
            <form onSubmit={sellStock}>
                <div className='transaction-box'>
                    <div className='transaction-labels' id='buy-label'>Type: Buy</div>
                    <div className='transaction-labels'>Shares</div>
                    <select name="shares" id="shares" onChange={transactionTotal} value={sharesSold}>
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
                    <div className='transaction-labels'>Estimated Credit</div>
                    <div id='transaction-estimate'>
                        ${transactionPrice}
                    </div>
                </div>
                <div className='transaction-btn'>
                    <button id='sell-btn' type="submit"
                        onClick={(e) => {
                        sellStock(e);
                        }}
                        disabled={(sharesSold !== "" && userShares >= sharesSold) ? false : true}>
                        {order}
                    </button>
                </div>
                <div className='transaction-labels' id='transaction-available-shares'>{userShares || 0} Shares Available</div>
            </form>
        </div>
    )
}

export default Sell;
