import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getWatchlists, deleteWatchList, deleteStockWatchlists, getWatchlistPrices } from '../../store/watchlist'
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import EditWatchListForm from '../EditWatchListForm'
import '../Watchlist';

function OneWatchlist({ watchlist, currencyFormat }) {
    const dispatch = useDispatch();
    const assetPrices = useSelector(state => state?.portfolio?.prices)
    const watchlistPrices = useSelector(state => state?.watchlist?.prices)
    const stocks = useSelector(state => state?.stock?.entries)

    useEffect(() => {
        dispatch(getWatchlists())
        dispatch(getWatchlistPrices())
    }, [dispatch])

    return (
        <div key={watchlist.id} className='watchlist'>
            <div className='OneWatchListDiv'>
                <div className='watchlistButtonsEditAndDelete'>
                    <div className='titleWatchlistDiv'>
                        <p className='watchlistName'>{watchlist.name}</p>
                        <div className='editAndDeleteButtonDiv'>
                            <button
                                className='deleteButton'
                                onClick={async () => {
                                    await dispatch(deleteWatchList(watchlist.id))
                                    await dispatch(getWatchlists())
                                }}
                            >
                                <img className='deletePicture' src={'https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png'} />
                            </button>
                            <EditWatchListForm watchlist={watchlist} names={watchlist.name} />
                        </div>
                    </div>
                    <div className='company'>
                        {watchlist.watchComps.map((company) => {
                            return (
                                <div className={`company-${company.id} divCompanyPriceAndGraph`}>
                                    <NavLink className='navLinkStocksWatchlist' to={`/stocks/${company.ticker}`}>
                                        {company.ticker}
                                    </NavLink>
                                    <div className='asset-chart'>
                                        <LineChart
                                            width={50}
                                            height={35}
                                            data={watchlistPrices[company.id]}
                                        >
                                            <XAxis dataKey="date" hide='true' />
                                            <YAxis dataKey="price" domain={['dataMin', 'dataMax']} hide='true' />
                                            <Line
                                            type="linear"
                                            dataKey="price"
                                            stroke="#0b7cee"
                                            activeDot={{ r: 5 }}
                                            dot={false}
                                            strokeWidth={2}
                                            />
                                        </LineChart>
                                    </div>
                                    <h5 className='companyStockClosingPrice'>
                                        {currencyFormat.format(watchlistPrices[company.id]?.slice(-1)[0].price)}
                                    </h5>
                                    <button className='deleteButton'
                                        onClick={async (e) => {
                                            const payload = {
                                                watchlistId: watchlist.id,
                                                ticker: company.ticker
                                            }
                                            await dispatch(deleteStockWatchlists(payload))
                                            // await dispatch(getWatchlists())
                                        }}
                                    >
                                        <img className='deletePicture' src={'https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png'} />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OneWatchlist;
