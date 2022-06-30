import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {postWatchlists} from '../../store/watchlist'
import './WatchlistForm.css';

function WatchlistForm() {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    let userId = useSelector((state) => state.session?.user?.id)
    const lists = useSelector((state) => Object.values(state.watchlist));
    const watchlists = Object.values(lists[0])
    const watchlistNames = watchlists.map((watchlist) => {
        return watchlist.name
    })

    useEffect(() => {
        const error = [];
        if (name.length < 1) error.push('You must put a name with at least 1 character')
        if (watchlistNames.includes(name)) error.push('Provide a unique name')
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
            setName('')
        }

    }

    useEffect(()=>{

    },[onSubmit])

    return (
        <div className="WatchlistFormDiv">

        <form className="WatchlistForm" onSubmit={onSubmit}>
           {errors.length > 0 ?
           <>
           <h2 className='WatchlistHeaderForm'>Create Your Watchlist</h2>
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
                <div className='InputAndSubmitButton'>
            <div className='nameInput'>
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='Watchlist Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
            </div>

            <button
                className='WatchlistSubmitButton'
                type='submit'
                disabled={errors.length > 0 ? true : false}
                >Submit</button>
                </div>
        </form>
                </div>
    )
}

export default WatchlistForm;
