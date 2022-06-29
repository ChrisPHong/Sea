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
    const [show, setShow] = useState('hidden')

    useEffect(() => {
    }, [dispatch]);

    useEffect(() => {
        dispatch(getWatchlists());
    }, [dispatch])

    const changeClass = (e) => {

        console.log('hello', e.target)
        e.stopPropagation()
        // console.log('testing', e.target.__reactProps$54nd8i6xv18.className)
        // console.log('classlist', e.target.classList)
        if (show === 'hidden') {
            setShow('show')
        } else {
            setShow('hidden')
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
                            className={`editButton ${watchlist.id}`}
                            onClick={(e) => {
                                console.log('e.target.classlistNumber', e.target.classList[1])
                                e.stopPropagation()
                                e.preventDefault()
                                if (show === 'show') setShow('hidden')
                                else setShow('show')
                            }}
                        >
                            <img className={`editingPicture ${watchlist.id}`} src={'https://cdn-icons-png.flaticon.com/512/61/61456.png'} />
                        </button >

                            <div className={`editform ${show}${watchlist.id}`}>
                                < EditWatchListForm watchlist={watchlist} />
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
