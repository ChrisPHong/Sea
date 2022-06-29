import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getWatchlists } from '../../store/watchlist'
import { deleteWatchList, getStocksWatchlists } from '../../store/watchlist'
import EditWatchListForm from '../EditWatchListForm'
import './Watchlist.css';



function WatchlistPage() {
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => Object.values(state.watchlist));
    const state = useSelector((state) => state);
    const watchlists = Object.values(watchlist[0])
    console.log('THIS IS STATE', state)
    const [show, setShow] = useState(false)

    // const [show, setShow] = useState('hidden')

    useEffect(() => {
    }, [dispatch]);

    useEffect(() => {
        dispatch(getWatchlists())
        // dispatch(getStocksWatchlists(1));
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
                            }}

                        ><img className='deletePicture' src={'https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png'} /></button>

                        <button
                            className={`editButton ${watchlist.id}`}
                            onClick={(e) => {
                                console.log('<<<<<<<< value >>>>>>>>>', e);
                                console.log('<<<<<<<< value >>>>>>>>>', e.target.value)
                                if(e.currentTarget.value){
                                    setShow(true)
                                }
                            }
                            }
                        >
                            <img className={`editingPicture ${watchlist.id}`} src={'https://cdn-icons-png.flaticon.com/512/61/61456.png'} />
                        </button >
                                <div className={`editform ${watchlist.id} `}>
                                    < EditWatchListForm props={show} watchlist={watchlist} />
                                </div>



                    </div >

                )
            })}

            <div className='all-watchlists'>
            </div>
        </div >
    )
}


export default WatchlistPage;
