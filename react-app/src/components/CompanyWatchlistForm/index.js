import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createStockWatchlists } from '../../store/watchlist'
import './CompanyWatchlistForm.css';



function CompanyWatchlistForm(props) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const transactions = useSelector(state => state?.transaction?.entries)
    const transArr = Object.values(transactions)
    const stocks = useSelector(state => state?.stock?.entries)
    const companies = Object.values(stocks)
    const watchlists = props.props


    const [value, setValue] = useState('')


    useEffect(() => {
    }, [dispatch]);

    const onSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            value
        }
        console.log(payload)
        // await dispatch(createStockWatchlists(payload))

    }

    const getWatchList = (watchlist) =>{
        console.log(watchlist, '<<<<<<<<<<<<<<<<<')
        let value = watchlist.value;
        setValue(value)
        return value
      }


    return (
        <div className='CompanyWatchlistDiv'>
            <h3> Add This Stock To A Watchlist</h3>
            <form className='CompanyWatchlistForm' onSubmit={onSubmit}>
                <select name='WathlistNames'  onChange={getWatchList}>
                    {watchlists.map(watchlist => {
                        return <option value={watchlist.name}>{watchlist.name}</option>
                        // onChange={setValue(value)}
                        // <option value="cat">Cat</option>
                        // <option value="hamster">Hamster</option>
                        // <option value="parrot">Parrot</option>
                        // <option value="spider">Spider</option>
                        // <option value="goldfish">Goldfish</option>
                    })
                    }
                </select>
                <button
                type='submit'
                    // onClick={(e) => {
                    //     // e.target.value
                    //     // const watchlistId = watchlist.id
                    //     // const payload = { watchlistId: watchlistId, ticker: 'TSLA' }
                    //     // dispatch(createStockWatchlists(payload))
                    // }}
                    >
                    Submit
                </button>
            </form>

        </div >
    )
}


export default CompanyWatchlistForm;
