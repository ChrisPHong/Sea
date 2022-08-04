import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sellTransaction, stockTransaction, getBoughtTransactions } from '../../store/transaction';

const Sell = ({ user, companyId, priceData, shares }) => {
    const sharesArr = Object.values(shares)
    const dispatch = useDispatch();
    const [userShares, setUserShares] = useState(shares);
    const boughtShares = useSelector((state) => Object.values(state.transaction.boughtTrans))
    console.log(boughtShares, "<<<<<<<<<<<<<<<<<<<< BOUGHT SHARES???")
    // console.log("THIS IS THE USER SHARES", userShares)
    let ownedStockShares = 0
    if (shares) {
        for (let i = 0; i < sharesArr?.length; i++) {
            if (sharesArr[i]?.companyId === companyId && sharesArr[i]?.userId === user.id && sharesArr[i]?.type === "buy") {
                ownedStockShares += sharesArr[i]?.shares
            }
            if (sharesArr[i]?.companyId === companyId && sharesArr[i]?.type === "sell") {
                ownedStockShares -= sharesArr[i]?.shares
            }
        }
    }

    const [transactionPrice, setTransactionPrice] = useState((0).toFixed(2));
    const [order, setOrder] = useState('sell');
    const [sharesSold, setSharesSold] = useState(0);
    const [balance, setBalance] = useState(user?.balance);
    const [errors, setErrors] = useState([])

    const transactionTotal = e => {
        setSharesSold(e.target.value);
        setTransactionPrice((e.target.value * (priceData.price)).toFixed(2));
        //  price = market price per share
    }

    const sellStock = async (e) => {
        e.preventDefault();
        setOrder('sold');
        // setUserShares(userShares - sharesSold);
        setBalance((Number(balance) + Number(transactionPrice)).toFixed(2));
        let newBalance = (Number(balance) + Number(transactionPrice)).toFixed(2);
        // if we take num of shares of dashboard and subtract shares sold
        let newTransaction = {
            price: Number(transactionPrice).toFixed(2),
            shares: sharesSold,
            type: 'sell',
            user_id: user.id,
            company_id: companyId,
            balance: Number(newBalance).toFixed(2),
        }

        // Checks to see if the sold shares is > or < than the amount of shares owned
        const data = await dispatch(stockTransaction(newTransaction))
        if(data){
            let error = []
            error.push(Object.values(data)[0])
            setErrors(error)
            return
        }
        dispatch(getBoughtTransactions(user?.id))

    }


    if (sellStock) {
        setTimeout(() => {
            setOrder('sell')
        }, 3500)
    }

    return (
        <div>
            <form onSubmit={sellStock}>
                <div className='transaction-box'>
                    {/* <div className='transaction-labels' id='buy-label'>
                        <h2>
                            Sell
                        </h2>
                    </div> */}
                        <div className='validationErrors-Sell' >
                        {errors.length ?
                        errors.map((error, i)=> (<p key={i} style={{color:'red'}}>{error}</p>))
                        : null}
                        </div>
                    <div className='transaction-info'>
                        <div className='transaction-labels'>Market Price</div>
                        <div id='transaction-stock-price'>
                            ${priceData && Number(priceData.price).toFixed(2)}
                        </div>
                    </div>
                    <div className='shares-ctn'>
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
                </div>
                <hr id='buy-sell-hr' />
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
                {/* <div className='transaction-labels' id='transaction-available-shares'>{ownedStockShares || 0} Shares Available</div> */}
            </form>
        </div>
        // <div>
        //     Sell Component
        // </div>
    )
}

export default Sell;
