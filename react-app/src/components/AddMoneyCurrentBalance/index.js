import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addMoneyToCurrentBalance } from '../../store/transaction'
import './AddMoneyCurrentBalance.css';



function AddMoneyCurrentBalance() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const user = useSelector(state => state.session?.user)
    const userId = useSelector(state => state.session?.user.id)
    const [balance, setBalance] = useState(0)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const error = [];
        if (balance < 1) {
            error.push('You can NOT put a value less than 1')
        }

        setErrors(error);
    }, [balance]);


    const onSubmit = (e) => {
        e.preventDefault()
        if (errors.length === 0) {

            const payload = {
                userId,
                balance

            }
            dispatch(addMoneyToCurrentBalance(payload))
            setBalance(0)
        }
    }

    return (
        <div className='AddMoneyCurrentBalanceForm'>
            <h2>Buying Power</h2>
            {errors.length > 0 ?
                <>
                    <ul className='errorsArray'>{errors.map(error => {
                        return (
                            <>
                                <li className='WatchlistFormErrorItem'
                                    key={error}>{error}</li>
                            </>
                        )
                    })}
                    </ul>
                </>
                : null}
            <form onSubmit={onSubmit}>
                <input type='number'
                    placeholder={`Buying Power: ${user.balance}`}
                    className='inputBox'

                    onChange={(e) => {
                        console.log(e.target.value, "VALUE  >>>>>>>>>>>>>>>>>>>>>")
                        setBalance(e.target.value)}}
                />
                <button
                    className='WatchlistSubmitButton'
                    type='submit'
                    disabled={errors.length > 0 ? true : false}
                >Submit</button>
            </form>

        </div >
    )
}


export default AddMoneyCurrentBalance;
