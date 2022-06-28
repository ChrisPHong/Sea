import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getWatchlists } from '../../store/watchlist'
import { deleteWatchList, editWatchlists } from '../../store/watchlist'
import EditWatchListForm from '../EditWatchListForm'
import './Watchlist.css';


function WatchlistPage() {
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => Object.values(state.watchlist));
    const watchlists = Object.values(watchlist[0])
    const user = useSelector((state) => (state.session.user));
    const [show, setShow] = useState('hidden')

    useEffect(() => {
    }, [dispatch]);

    useEffect(() => {
        dispatch(getWatchlists());
    }, [dispatch])



    return (
        <div className='watchlists'>
            <h1>Watchlists</h1>
            {watchlists.map(watchlist => {
                return (
                    <div >
                        <h4>
                            {watchlist.name}
                        </h4>
                        <button
                            className='deleteButton'
                            onClick={() => {
                                dispatch(deleteWatchList(watchlist.id))
                            }}>Delete</button>
                        <button
                            className='editButton'
                            onClick={() => {
                                show ? setShow(false) : setShow(true)
                            }}> Edit</button >
                            < EditWatchListForm className={`${show}`} watchlist={watchlist}/>

                    </div >

                )
            })}

<div className='all-watchlists'>
</div>
        </div >
    )
}


export default WatchlistPage;
