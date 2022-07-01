import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getWatchlists } from '../../store/watchlist'
import { deleteWatchList, createStockWatchlists } from '../../store/watchlist'
import EditWatchListForm from '../EditWatchListForm'
import './Watchlist.css';



function WatchlistPage() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const watchlist = useSelector((state) => Object.values(state.watchlist));
    const watchlists = Object.values(watchlist[0])
    const transactions = useSelector(state => state?.transaction?.entries)
    const transArr = Object.values(transactions)
    const stocks = useSelector(state => state?.stock?.entries)
    const companies = Object.values(stocks)




    const [show, setShow] = useState('hidden')

    const closingPrice = (companyId) => {
        for (let stock of companies) {
            if (stock.id === companyId && stock.prices) {
                const priceArr = stock.prices
                return priceArr[priceArr.length - 1]
            }
        }
    }

    useEffect(() => {
    }, [dispatch]);

    useEffect(() => {
        dispatch(getWatchlists())

    }, [dispatch, show])


    return (
        <div className='watchlists'>
            <h1 className='WatchlistTitleH1'>Watchlists</h1>
            {watchlists.map(watchlist => {
                return (
                    <div className='OneWatchListDiv'>
                        <div className='watchlistButtonsEditAndDelete'>
                            <div className='titleWatchlistDiv'>
                                <p className='watchlistName'>
                                    {watchlist.name}
                                </p>
                                <div className='editAndDeleteButtonDiv'>
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
                                    <button
                                    onClick={(e)=>{
                                        // e.target.value
                                        const watchlistId = watchlist.id
                                        const payload = {watchlistId: watchlistId, ticker:'TSLA'}
                                        dispatch(createStockWatchlists(payload))
                                    }}>
                                        hi
                                    </button>
                                </div>
                            </div>
                            <div className='company'>
                                {watchlist.watchComps.map((company) => {
                                    return (
                                        <div className={`company-${company.id} divCompanyPriceAndGraph`}>
                                            <NavLink className='navLinkStocksWatchlist' to={`/stocks/${company.ticker}`}>
                                                {company.ticker}
                                            </NavLink>
                                            <h5>- Stocks Graph Goes Here -</h5>
                                            <h5>Closing Price: {closingPrice(company.id)}</h5>
                                        </div>
                                    )
                                })}
                            </div>
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
