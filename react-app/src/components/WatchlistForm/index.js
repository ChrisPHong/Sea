import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {postWatchlists} from '../../store/watchlist'
import {useHistory} from 'react-router-dom'

function WatchlistForm() {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    let userId = useSelector((state) => state.session?.user?.id)

    useEffect(() => {
        const error = [];
        if (name.length < 1) error.push('You must put a name with at least 1 character')
        setErrors(error);
    }, [name])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (errors.length === 0) {
            const payload = {
                userId,
                name,
            }
            dispatch(postWatchlists(payload))
            history.push('/dashboard')
        }

    }

    useEffect(()=>{

    },[onSubmit])

    return (
        <form className="WatchlistForm" onSubmit={onSubmit}>
           {errors.length > 0 ?
           <>
           <h2>Create Your Watchlist</h2>
           <ul className='errorsArray'>{errors.map(error => {
               return (
               <>
               <li className='errorItem'
               key={error}>{error}</li>
               </>
               )
            })}
            </ul>
           </>
           : null}
            <div className='titleInput'>
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='Watchlist Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button
                className='submitButton'
                type='submit'
                disabled={errors.length > 0 ? true : false}
            >Submit</button>
        </form>
    )
}

export default WatchlistForm;
