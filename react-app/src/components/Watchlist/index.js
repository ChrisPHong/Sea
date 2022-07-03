import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getStockPrices } from '../../store/stock';
import { getWatchlists } from '../../store/watchlist'
import { deleteWatchList, deleteStockWatchlists } from '../../store/watchlist'
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import EditWatchListForm from '../EditWatchListForm'
import './Watchlist.css';



function WatchlistPage() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const watchlist = useSelector((state) => Object.values(state.watchlist));
    const watchlists = Object.values(watchlist[0])
    const transactions = useSelector(state => state?.transaction?.entries)
    const transArr = Object.values(transactions)
    const assetPrices = useSelector(state => state?.portfolio?.prices)
    const stocks = useSelector(state => state?.stock?.entries)
    const companies = Object.values(stocks)
    const keyAssetPrices = Object.keys(assetPrices)
    const prices = useSelector(state => state?.stock?.prices)
    const pricesData = Object.values(prices).slice(-7)
    const [watchlistChartData, setWatchlistChartData] = useState(pricesData)



    const [show, setShow] = useState('hidden')

    // const closingPrice = (companyId) => {
    //     for (let stock of companies) {
    //         if (stock.id === companyId && stock.prices) {
    //             const priceArr = stock.prices
    //             return priceArr[priceArr.length - 1]
    //         }
    //     }
    // }

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
        return "Hello"
    }
    useEffect(() => {
    }, [dispatch]);

    useEffect(() => {
        dispatch(getWatchlists())

    }, [dispatch, show])

    // useEffect(() => {
    //     for (let watchlist of watchlists) {
    //         dispatch(getStockPrices(watchlist?.watchComps?.id))
    //     }
    // }, [dispatch])

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
                                            <h5 className='companyStockClosingPrice'>  {keyAssetPrices.indexOf(company.id.toString()) !== -1 ? `Closing Price: ${closingPriceAssets(company.id)}` : `Closing Price: ${stockPriceCreator(company.id)}`}
                                            </h5>
                                            <button className='deleteButton'
                                                onClick={async (e) => {
                                                    const payload = {
                                                        watchlistId: watchlist.id,
                                                        ticker: company.ticker
                                                    }

                                                    await dispatch(deleteStockWatchlists(payload))
                                                    await dispatch(getWatchlists())
                                                }}
                                            ><img className='deletePicture' src={'https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png'} /></button>
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
