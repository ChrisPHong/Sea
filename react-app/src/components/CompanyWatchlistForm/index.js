import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getWatchlists } from '../../store/watchlist'
import { deleteWatchList, createStockWatchlists } from '../../store/watchlist'
import EditWatchListForm from '../EditWatchListForm'
import './Watchlist.css';



function CompanyWatchlistForm() {
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => Object.values(state.watchlist));
    const state = useSelector((state) => state);
    const watchlists = Object.values(watchlist[0])
    const transactions = useSelector(state => state?.transaction?.entries)
    const transArr = Object.values(transactions)
    const stocks = useSelector(state => state?.stock?.entries)
    const companies = Object.values(stocks)




    const [value, setValue] = useState('')


    useEffect(() => {
    }, [dispatch]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (errors.length === 0) {
            const payload = {

            }
            await dispatch(createStockWatchlists(payload))

        }

    }


    return (
        <div className='watchlists'>
            <form className='CompanyWatchlistForm' onSubmit={onSubmit}>
                <select name='WathlistNames'></select>

                <select name="pets" id="pet-select">
    <option value="">--Please choose an option--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
</select>

            </form>
                                    <button
                                    onClick={(e)=>{
                                        // e.target.value
                                        const watchlistId = watchlist.id
                                        const payload = {watchlistId: watchlistId, ticker:'TSLA'}
                                        dispatch(createStockWatchlists(payload))
                                    }}>
                                        hi
                                    </button>

        </div >
    )
}


export default CompanyWatchlistForm;
