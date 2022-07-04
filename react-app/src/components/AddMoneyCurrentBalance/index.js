import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addMoneyToCurrentBalance } from '../../store/transaction'
import './AddMoneyCurrentBalance.css';



function AddMoneyCurrentBalance() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const user = useSelector(state => state.session?.user)
    const userId = useSelector(state => state.session?.user.id)
    const [balance, setBalance] = useState(user.balance)
    const [errors, setErrors] = useState([]);


    // useEffect(() => {
    //     const error = [];
    //     if (balance < user.balance) errors.push('You can NOT input a lesser value than your current balance')
    //     // setErrors(error);
    // }, []);


    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            userId,
            balance

        }
        dispatch(addMoneyToCurrentBalance(payload))
    }

    return (
        <div className='AddMoneyCurrentBalanceForm'>
            <form onSubmit={onSubmit}>
                <h2>Buying Power</h2>
                <input type='number'

                    className='inputBox'
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                />
                <button
                    className='WatchlistSubmitButton'
                    type='submit'
                >Submit</button>
            </form>

        </div >
    )
}


export default AddMoneyCurrentBalance;
