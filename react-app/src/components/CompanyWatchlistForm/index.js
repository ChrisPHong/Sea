import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createStockWatchlists } from '../../store/watchlist'
import { useParams } from 'react-router-dom';
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

    useEffect(() => {
    }, [dispatch, clicked]);


    return (
        <div className='CompanyWatchlistDiv'>
            <h3 className='add-to-watchlist-title'> Add to Watchlist</h3>

                    {watchlists.map(watchlist => {
                        return <button className='WatchListCompanyButton'
                        onClick={(e)=>{
                            const payload = {
                                watchlistId: watchlist.id,
                                ticker
                            }

                            dispatch(createStockWatchlists(payload))

                        }}
                        > {watchlist.name}</button>

                    })
                    }

        </div >
    )
}


export default CompanyWatchlistForm;
