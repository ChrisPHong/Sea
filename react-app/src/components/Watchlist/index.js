import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getStockPrices } from '../../store/stock';
import { getWatchlists } from '../../store/watchlist'
import { deleteWatchList, deleteStockWatchlists } from '../../store/watchlist'
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import EditWatchListForm from '../EditWatchListForm'
import './Watchlist.css';
import OneWatchlist from '../OneWatchlist'



function WatchlistPage({currencyFormat}) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const watchlist = useSelector((state) => Object.values(state.watchlist));
    const watchlists = Object.values(watchlist[0])
    const transactions = useSelector(state => state?.transaction?.entries)
    const assetPrices = useSelector(state => state?.portfolio?.prices)
    const stocks = useSelector(state => state?.stock?.entries)
    const companies = Object.values(stocks)
    const keyAssetPrices = Object.keys(assetPrices)
    const prices = useSelector(state => state?.stock?.prices)
    const pricesData = Object.values(prices).slice(-7)
    const [watchlistChartData, setWatchlistChartData] = useState(pricesData)

    useEffect(() => {
        dispatch(getWatchlists())

    }, [dispatch, watchlists.length])


    return (
        <div className='watchlists'>
            <h1 className='WatchlistTitleH1'>Watchlists</h1>
            {watchlists.map(watchlist => {

                return (
                    <>
                        <OneWatchlist watchlist={watchlist} currencyFormat={currencyFormat}/>
                    </>

                )
            })}

            <div className='all-watchlists'>
            </div>
        </div >
    )
}


export default WatchlistPage;
