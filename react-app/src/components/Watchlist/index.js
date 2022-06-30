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


    const [show, setShow] = useState('hidden')

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
                            onClick={async (e) => {
                                // Getting the specific edit form div
                                let gottems = document.getElementsByClassName(`editform-${watchlist.id}`)[0]
                                    // Checking to see if the current clicked is equal to the watchlistId
                                if (parseInt(e.currentTarget.className.split(' ')[1]) === watchlist.id) {
                                    console.log('here in the click -=----------------')
                                    if (gottems?.className === `editform-${watchlist.id} hidden`) {
                                        console.log('within the second if <<<<<<<<<<<<<<<<<<')
                                         setShow('show')
                                       gottems.className = `editform-${watchlist.id} ${show}`
                                        console.log(gottems.className, '<<<<<<<<<<<<<<<<<<')

                                    } else if(gottems?.className === `editform-${watchlist.id} show`){
                                        setShow('hidden')
                                       return gottems.className = `editform-${watchlist.id} ${show}`

                                    }

                                }
                                else {
                                     console.log('<<<<<<<<NOT IN THE IFF >>>>>>>> ')
                                    setShow('hidden')
                                    gottems.className = `editform-${watchlist.id} ${show}`
                                }
                            }
                            }
                        >
                            <img className={`editingPicture ${watchlist.id}`} src={'https://cdn-icons-png.flaticon.com/512/61/61456.png'} />
                        </button >

                        <div className={`editform-${watchlist.id} hidden`}>
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
