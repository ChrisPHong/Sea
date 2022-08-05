import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { stockTransaction, getBoughtTransactions } from '../../store/transaction';
import { getUserInformation } from '../../store/session'

const Sell = ({ user, companyId, priceData, boughtTransactions, boughtShares}) => {
    const dispatch = useDispatch();
    const options = { style: 'currency', currency: 'USD' };
    const currencyFormat = new Intl.NumberFormat('en-US', options);

    let ownedStockShares = 0
    if (boughtShares.length) {
        for (let i = 0; i < boughtShares?.length; i++) {
            if (boughtShares[i]?.companyId === companyId && boughtShares[i]?.userId === user.id && boughtShares[i]?.type === "buy") {
                ownedStockShares += boughtShares[i]?.shares
            }
            if (boughtShares[i]?.companyId === companyId && boughtShares[i]?.type === "sell") {
                ownedStockShares -= boughtShares[i]?.shares
            }
        }
    }

    const [transactionPrice, setTransactionPrice] = useState((0).toFixed(2));
    const [order, setOrder] = useState('sell');
    const [sharesSold, setSharesSold] = useState('');
    const [currentShares, setCurrentShares] = useState(boughtTransactions[companyId]?.shares)
    const [balance, setBalance] = useState(user?.balance);
    const [errors, setErrors] = useState([])

    const transactionTotal = e => {
        setSharesSold(e.target.value);
        setTransactionPrice((e.target.value * (priceData.price)).toFixed(2));
    }

    useEffect(() => {
        let error = []

        if (ownedStockShares < sharesSold) {
            error.push(`Your order exceeds the number of shares you own. Please try again.`)
        }
        setErrors(error)

    }, [balance, sharesSold])

    const sellStock = async (e) => {
        e.preventDefault();
        if (errors.length < 1) {

            setOrder('sold');
            setBalance((Number(balance) + Number(transactionPrice)).toFixed(2));
            setCurrentShares(boughtTransactions[companyId]?.shares - sharesSold)
            let newBalance = (Number(balance) + Number(transactionPrice)).toFixed(2);

            // if we take num of shares of dashboard and subtract shares sold
            let newTransaction = {
                price: Number(priceData.price).toFixed(2),
                shares: sharesSold,
                type: 'sell',
                user_id: user.id,
                company_id: companyId,
                balance: Number(newBalance).toFixed(2),
            }

            // Checks to see if the sold shares is > or < than the amount of shares owned
            const data = await dispatch(stockTransaction(newTransaction))
            if (data) {
                let error = []
                error.push(Object.values(data)[0])
                setErrors(error)
                return
            }
            await dispatch(getUserInformation())
            await dispatch(getBoughtTransactions(user?.id))
            setSharesSold(0)
        }
    }


    if (sellStock) {
        setTimeout(() => {
            setOrder('sell')
        }, 3500)
    }

    const preventMinus = (e) => {
        if (!e.code.includes('Digit')) {
            e.preventDefault();
        }
    };

    return (
        <div>
            <form onSubmit={sellStock}>
                <div className='transaction-box'>
                    <div className='validationErrors-Sell' >
                        {errors.length ?
                            errors.map((error, i) => (<p key={i} style={{ color: 'red' }}>{error}</p>))
                            : null}
                    </div>
                    <div className='transaction-labels' id='owned-shares'>{boughtTransactions[companyId]?.shares ? `${currentShares} shares available` : '0 shares available'}</div>
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
                            placeholder='0'
                            onChange={transactionTotal}
                            value={sharesSold}
                        />
                    </div>
                </div>
                <hr id='buy-sell-hr' />
                <div className='transaction-info'>
                    <div className='transaction-labels'>Estimated Credit</div>
                    <div id='transaction-estimate'>
                        ${transactionPrice}
                    </div>
                </div>
                <div className='transaction-btn'>
                    <button
                        id='sell-btn'
                        type="submit"
                        onClick={(e) => {sellStock(e)}}
                        disabled={(sharesSold !== "" && boughtTransactions[companyId]?.shares >= sharesSold) ? false : true}
                        style={{
                            backgroundColor: sharesSold !== "" && boughtTransactions[companyId]?.shares < sharesSold ? 'lightgray' : '#0b7cee',
                            cursor: sharesSold !== "" && boughtTransactions[companyId]?.shares < sharesSold ? 'default' : 'pointer',
                            transitionDuration: sharesSold !== "" && boughtTransactions[companyId]?.shares < sharesSold ? '' : '1s'
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

export default Sell;
