import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createStockWatchlists } from '../../store/watchlist'
import { useParams } from 'react-router-dom';
import WatchlistConfirmModal from './WatchlistConfirmModal';
import './CompanyWatchlistForm.css';



function CompanyWatchlistForm(props) {
    const dispatch = useDispatch();
    const { ticker } = useParams()
    const state = useSelector((state) => state);
    const transactions = useSelector(state => state?.transaction?.entries)
    const transArr = Object.values(transactions)
    const stocks = useSelector(state => state?.stock?.entries)
    const companies = Object.values(stocks)
    const watchlists = props.props

    const [clicked, setClicked] = useState(false)

    const [addToWatchlist, setAddToWatchlist] = useState(false)

    useEffect(() => {
    }, [dispatch, clicked]);

    const onClick = (id) => {
        setAddToWatchlist(true)
        const payload = {
            watchlistId: id,
            ticker
        }
        dispatch(createStockWatchlists(payload))
    }

    return (
        <>
            <div className='CompanyWatchlistDiv'>
                <h3 className='add-to-watchlist-title'> Add to Watchlist</h3>
                {watchlists.map(watchlist => (
                    <>
                        <button
                            key={watchlist.id}
                            className='WatchListCompanyButton'
                            onClick={() => onClick(watchlist.id)}
                        >
                            <span className='watchlist-name-btn'>{watchlist.name}</span>
                        </button>
                    </>
                ))}
            </div>
            {addToWatchlist ? <WatchlistConfirmModal setAddToWatchlist={setAddToWatchlist} /> : ''}
        </>
    )
}


export default CompanyWatchlistForm;
