import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getStockPrices } from '../../store/stock';
import { getWatchlists } from '../../store/watchlist'
import { deleteWatchList, deleteStockWatchlists } from '../../store/watchlist'
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import EditWatchListForm from '../EditWatchListForm'
import '../Watchlist';



function OneWatchlist({ watchlist, currencyFormat }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const assetPrices = useSelector(state => state?.portfolio?.prices)
    const stocks = useSelector(state => state?.stock?.entries)
    const companies = Object.values(stocks)
    const keyAssetPrices = Object.keys(assetPrices)
    const prices = useSelector(state => state?.stock?.prices)
    const pricesData = Object.values(prices).slice(-7)
    const [watchlistChartData, setWatchlistChartData] = useState(pricesData)



    const closingPriceAssets = (companyId) => {
        for (let compId in assetPrices) {
            if (parseInt(compId) === companyId) {
                // console.log('here is the assetPrices being returned hopefully its all different', assetPrices[compId].length - 1)
                let pricesArr = assetPrices[compId]
                return pricesArr[pricesArr.length - 1].price
            }
        }
    }


    // This will generate a price from the basePrice of the stock
    const stockPriceCreator = (companyId) => {
        for (let stock of companies) {
            if (stock.id === companyId) {
                let basePrice = stock.basePrice
                basePrice += 30

                return basePrice
            }
        }
        return
    }

    useEffect(() => {
        dispatch(getWatchlists())

    }, [dispatch,])

    return (
        <div key={watchlist.id}
        className='watchlist'>

            <div className='OneWatchListDiv'>
                <div className='watchlistButtonsEditAndDelete'>
                    <div className='titleWatchlistDiv'>
                        <p className='watchlistName'>
                            {watchlist.name}
                        </p>
                        <div className='editAndDeleteButtonDiv'>
                            <button

                                className='deleteButton'

                                onClick={async () => {
                                    await dispatch(deleteWatchList(watchlist.id))
                                    await dispatch(getWatchlists())
                                }}

                            ><img className='deletePicture' src={'https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png'} /></button>


                            < EditWatchListForm watchlist={watchlist} names={watchlist.name} />
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
                                        {/* <LineChart
                                                    width={200}
                                                    height={100}
                                                    data={watchlistChartData}
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
                                                </LineChart> */}

                                    </div>
                                    <h5 className='companyStockClosingPrice'>  {keyAssetPrices.indexOf(company.id.toString()) !== -1 ? `$${closingPriceAssets(company.id)}` : `${currencyFormat.format(stockPriceCreator(company.id))}`}
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
                                    ><img className='deletePicture' src={'https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png'} /></button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div >


            <div className='all-watchlists'>
            </div>
        </div >
    )
}


export default OneWatchlist;
