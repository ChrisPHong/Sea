import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stockTransaction, updateTransaction } from '../../store/transaction';

const Buy = ({ user, companyId, ticker, priceData }) => {
    // console.log("THIS IS THE PRICE DATA", priceData)
    // console.log("THIS IS THE CLOSE", priceData[priceData?.length - 1].price)
    const dispatch = useDispatch()
    const transactions = useSelector(state => state?.transaction?.entries);
    const updatedTransaction = useSelector(state => state?.transaction?.entries)
    const transArr = Object.values(transactions)
    const updatedTransArr = Object.values(updatedTransaction)
    const userId = user.id;
    // console.log('USERRRRR', user)

    console.log('here is the transactions', transactions)
    console.log('here is the UPDATED transactions', updatedTransaction)


    // console.log(transactions)
    // const stock = useSelector(state => state?.stock?.entries)
    // const companies = Object.values(stocks)
    // console.log('---companies in buy page', companies)
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

    // const convertDate = date => {
    //     const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    //     const newDate = date.split(' ')
    //     let newMonth
    //     for (let i in dates) {
    //         if (newDate[0] === dates[i]) {
    //             newMonth = i
    //         }

    //     }
    //     const result = new Date(`${newMonth}-${parseInt(newDate[1])}-${parseInt(newDate[2])}`)
    //     return result.toDateString()
    // }

    // console.log('IS THIS OUR BRAND NEW DATE?!??!?!?!!', convertDate(priceData.date))

    const buyStock = async (e) => {
        e.preventDefault();
        setOrder('ordered');
        setBalance((Number(balance) - Number(transactionPrice)).toFixed(2));
        let newBalance = (Number(balance) - Number(transactionPrice)).toFixed(2);

        // console.log('transaction price----', typeof(parseInt(transactionPrice)))
        // console.log('transaction price----', typeof(user.id))
        // console.log('transaction price----', typeof(parseInt(sharesBought)))
        // console.log('transaction price----', typeof(companyId))
        // console.log('transaction price----', typeof('buy'))
        console.log('WHAT IS THIS DUMB MNUMBER', typeof sharesBought)
        let newTransaction = {
            price: Number(transactionPrice).toFixed(2),
            shares: sharesBought,
            type: 'buy',
            user_id: user.id,
            company_id: companyId,
            balance: Number(newBalance).toFixed(2)
        }

        // If companyId is found in the updatedTransArr, update Transaction
        for (let i = 0; i < updatedTransArr.length; i++) {
            let transaction = updatedTransArr[i]
            if (transaction.companyId === companyId) {
                dispatch(updateTransaction(newTransaction))
                return
            }
        }

        // If company is NOT found in updatedTransArr, post a new transaction
        let companyIds = []
        for (let i = 0; i < updatedTransArr.length; i++) {
            let transaction = updatedTransArr[i]
            companyIds.push(transaction.companyId)
        }

        if (!companyIds.includes(companyId)) {
            dispatch(stockTransaction(newTransaction))
        }

        // const payload = { companyId, userId };
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
                        ${priceData && Number(priceData.price).toFixed(2)}
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
                <div className='transaction-labels' id='transaction-balance'>Balance Available: ${Number(balance).toFixed(2)}</div>
            </form>
        </div>
    )
}
export default Buy;
