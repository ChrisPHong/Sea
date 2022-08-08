import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBoughtTransactions, stockTransaction } from '../../store/transaction';
import {getUserInformation} from '../../store/session'

const Buy = ({ user, companyId, priceData, boughtTransactions }) => {
    const dispatch = useDispatch()

    const [transactionPrice, setTransactionPrice] = useState((0).toFixed(2));
    const [sharesBought, setSharesBought] = useState('');
    const [order, setOrder] = useState('buy');
    const [balance, setBalance] = useState(user?.balance)
    const [errors, setErrors] = useState({})

    const options = { style: 'currency', currency: 'USD' };
    const currencyFormat = new Intl.NumberFormat('en-US', options);


    useEffect(() => {
        setSharesBought('')
        setTransactionPrice((0).toFixed(2))
    }, [priceData])

    useEffect(() => {
        const validationErrors = {}

        if (transactionPrice > balance) {
            validationErrors.balance = 'You do not have enough money!'
        }

        setErrors(validationErrors)
    }, [transactionPrice])

    const transactionTotal = e => {
        setSharesBought(e.target.value);
        setTransactionPrice((e.target.value * (priceData.price)).toFixed(2));
    }


    const buyStock = async (e) => {
        e.preventDefault();

        setOrder('ordered');
        setBalance((Number(balance) - Number(transactionPrice)).toFixed(2));
        let newBalance = (Number(balance) - Number(transactionPrice)).toFixed(2);

        let newTransaction = {
            price: Number(priceData.price).toFixed(2),
            shares: sharesBought,
            type: 'buy',
            user_id: user.id,
            company_id: companyId,
            balance: Number(newBalance).toFixed(2)
        }

        await dispatch(stockTransaction(newTransaction))
        await dispatch(getUserInformation())
        await dispatch(getBoughtTransactions(user?.id))
        setSharesBought('')
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
                    <div className='validationErrors-Sell'>
                        <p style={{ color: 'red' }}>{errors.balance}</p>
                    </div>
                    <div className='transaction-labels' id='owned-shares'>{boughtTransactions[companyId]?.shares ? `${boughtTransactions[companyId]?.shares} shares owned` : '0 shares owned'}</div>
                    <div className='transaction-info'>
                        <div className='transaction-labels'>Market Price</div>
                        <div id='transaction-stock-price'>
                            ${priceData && Number(priceData.price).toFixed(2)}
                        </div>
                    </div>
                    <div className='shares-ctn'>
                        <div className='transaction-labels'>Shares</div>
                        <input
                            type='number'
                            min='0'
                            onKeyPress={preventMinus}
                            name="shares"
                            id="shares"
                            onChange={transactionTotal}
                            placeholder='0'
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
                        disabled={(balance > Number(transactionPrice) && sharesBought !== "") ? false : true}
                        style={{
                            backgroundColor: balance < Number(transactionPrice) ? 'lightgray' : '#0b7cee',
                            cursor: balance < Number(transactionPrice) ? 'default' : 'pointer',
                            transitionDuration: balance < Number(transactionPrice) ? '' : '1s'
                        }}
                    >
                        {order}
                    </button>
                </div>
                <div className='transaction-labels' id='transaction-balance'>Balance Available: {currencyFormat.format(balance)}</div>
            </form>
        </div>
    )
}
export default Buy;
