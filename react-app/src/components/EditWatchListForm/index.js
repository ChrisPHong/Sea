import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editWatchlists } from '../../store/watchlist'
import {useHistory} from 'react-router-dom'
import './EditWatchListForm.css'

function EditWatchListForm(watchlist) {

    const history = useHistory()

    const id = watchlist.watchlist.id
    const [name, setName] = useState(watchlist.watchlist.name);
    const [errors, setErrors] = useState([]);
    const lists = useSelector((state) => Object.values(state.watchlist));
    const watchlists = Object.values(lists[0])
    const watchlistNames = watchlists.map((watchlist) => {
        return watchlist.name
    })

    const dispatch = useDispatch();
    let userId = useSelector((state) => state.session?.user?.id)

    useEffect(() => {
        const error = [];
        if (name?.length < 1) error.push('Put a name with at least 1 character')
        if (watchlistNames.includes(name)) error.push('Provide a unique name')
        setErrors(error);
    }, [name])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (errors.length === 0) {
            const payload = {
                id,
                userId,
                name,
            }
            await dispatch(editWatchlists(payload))
            await history.push('/dashboard')

        }

    }
    useEffect(()=>{

    },[onSubmit])


    return (
        <form className={`WatchlistForm-${id}`} onSubmit={onSubmit}>
           {errors.length > 0 ?
           <>
           <h3>Error</h3>
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
                className='submitButton'
                type='submit'
                disabled={errors.length > 0 ? true : false}
            >Save Changes</button>
        </form>
    )
}

export default EditWatchListForm;
