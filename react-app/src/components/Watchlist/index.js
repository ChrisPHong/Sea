import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getWatchlists } from '../../store/watchlist'
import { deleteWatchList, getStocksWatchlists } from '../../store/watchlist'
import EditWatchListForm from '../EditWatchListForm'
import './Watchlist.css';



function WatchlistPage() {
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => Object.values(state.watchlist));
    const state = useSelector((state) => state);
    const watchlists = Object.values(watchlist[0])

    console.log('ONE >>>>>>>>>>>>>>', watchlists)
    console.log('MANY >>>>>>>>>>>>>>', watchlists[0])


    const [show, setShow] = useState('hidden')

    useEffect(() => {
    }, [dispatch]);

    useEffect(() => {
        dispatch(getWatchlists())
        // dispatch(getStocksWatchlists());
    }, [dispatch, show])


    return (
        <div className='watchlists'>
            <h1>Watchlists</h1>
            {watchlists.map(watchlist => {
                return (
                    <div>
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
                            onClick={async (e) => {
                                // Getting the specific edit form div
                                let specificEditForm = document.getElementsByClassName(`editform-${watchlist.id}`)[0]
                                // Checking to see if the current clicked is equal to the watchlistId

                                if (parseInt(e.currentTarget.className.split(' ')[1]) === watchlist.id) {
                                    if (specificEditForm.className === `editform-${watchlist.id} hidden`) {

                                        return specificEditForm.className = `editform-${watchlist.id} show`



                                    } else if (specificEditForm.className === `editform-${watchlist.id} show`) {
                                        return specificEditForm.className = `editform-${watchlist.id} hidden`

                                    }
                                }
                                else {
                                    setShow('hidden')
                                    specificEditForm.className = `editform-${watchlist.id} ${show}`
                                    return
                                }
                            }
                            }
                        >
                            <img className={`editingPicture ${watchlist.id}`} src={'https://cdn-icons-png.flaticon.com/512/61/61456.png'} />
                        </button >

                        <div className={`editform-${watchlist.id} hidden`}>
                            < EditWatchListForm watchlist={watchlist} />
                        </div>

                            <div className='company'>
                                {watchlist.watchComps.map((company)=>{
                                    return (
                                        <div className={`company-${company.id}`}>
                                        <NavLink to={`/stocks/${company.ticker}`}>
                                        {company.ticker}
                                        </NavLink>
                                        <h5>- Stocks Graph Goes Here</h5>
                                        <h5>- Company Stock Price Goes Here</h5>
                                        </div>
                                    )
                                })}

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
