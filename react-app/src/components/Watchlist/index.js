import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getWatchlists } from '../../store/watchlist'
import './Watchlist.css';


function WatchlistPage() {
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => Object.values(state.watchlist));
    const watchlists = Object.values(watchlist[0])
    const user = useSelector((state) => (state.session.user));



    useEffect(() => {
        dispatch(getWatchlists());
    }, [dispatch])

    

    return (
        <div>
            <h1>Watchlists</h1>
            {watchlists.map(watchlist => {
                return (
                    <div key={watchlist.id}>
                        <h4>
                            {watchlist.name}
                        </h4>
                    </div>
                )
            })}

            <div className='all-watchlists'>
            </div>
        </div>
    )
}


export default WatchlistPage;
