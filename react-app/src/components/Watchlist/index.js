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
    const [show, setShow] = useState(false)

    useEffect(() => {
    }, [dispatch]);

    useEffect(() => {
        dispatch(getWatchlists());
    }, [dispatch])

    const changeClass = (e) => {

        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }



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
                            }}

                        ><img className='deletePicture' src={'https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png'} /></button>

                        <button
                            className={`editButton`}
                            onClick={changeClass}
                        >
                            <img className='editingPicture' src={'https://cdn-icons-png.flaticon.com/512/61/61456.png'} />
                        </button >
                        {show ?
                            <div >
                                < EditWatchListForm watchlist={watchlist} />
                            </div>
                            : null}

                    </div >

                )
            })}

            <div className='all-watchlists'>
            </div>
        </div >
    )
}


export default WatchlistPage;
