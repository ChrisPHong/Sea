import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoughtTransactions, stockTransaction, updateTransaction } from '../../store/transaction';

const Buy = ({ user, companyId, ticker, priceData }) => {

    const dispatch = useDispatch()

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
                <div className='transaction-labels' id='transaction-balance'>Balance Available: ${Number(balance).toFixed(2)}</div>
            </form>
        </div>
    )
}
export default Buy;
