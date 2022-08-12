import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchlists, editWatchlists, deleteWatchList } from '../../store/watchlist'
import { useHistory } from 'react-router-dom'
import './EditWatchListForm.css'

function EditWatchListForm({ watchlist, names}) {
    const history = useHistory()
    const id = watchlist.id
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false)
    const [display, setDisplay] = useState(false);


    const lists = useSelector((state) => Object.values(state.watchlist));
    const watchlists = Object.values(lists[0])
    const watchlistNames = watchlists.map((watchlist) => {
        return watchlist.name
    })

    const dispatch = useDispatch();
    let userId = useSelector((state) => state.session?.user?.id)

    useEffect(()=>{
        setName(names)
    },[])
    useEffect(() => {
        const error = [];
        if (name.length > 100) error.push('The Name must be less than 100 characters')
        if (name?.length < 1) error.push('Put a name with at least 1 character')
        // if (watchlistNames.includes(name)) error.push('Provide a unique name')
        setErrors(error);
    }, [name])


    const settingDisplay = () =>{
        if(display === false){
            setDisplay(true);
        } else{
            setDisplay(false);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (errors.length > 0) {
            setShow(true)
            return
        }
        if (errors.length === 0) {
            const payload = {
                id,
                userId,
                name,
            }
            const data = await dispatch(editWatchlists(payload))
            if(data){
                let error = []
                error.push(data)
                setErrors(error)
                setShow(true)
                return
            }
            setDisplay(false)

        }

    }
    useEffect(() => {

    }, [onSubmit])


    return (
        <>
        <div className='editAndDeleteButtonDiv'>

                                    <button
                                        className={`editButton ${watchlist.id}`}
                                        onClick={async (e) => {
                                            settingDisplay()
                                        }
                                        }
                                    >
                                        <img className={`editingPicture ${watchlist.id}`} src={'https://cdn-icons-png.flaticon.com/512/61/61456.png'} />
                                    </button >



                                </div>

            {display ?
                <form className={`WatchlistForm-${id}`} onSubmit={onSubmit}>
                    {show ?
                        errors.length > 0 ?
                            <>
                                {errors.map((error, ind) => {
                                    return (
                                        <>
                                            <p className='edit-watchlist-error-message'
                                                key={ind}>{error}</p>
                                        </>
                                    )
                                })}
                            </>
                            : null
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

                    >Save Changes</button>
                    <button className='cancel-watchlist-edit' onClick={settingDisplay}>Cancel</button>
                </form>

                : null}

        </>
    )
}

export default EditWatchListForm;
