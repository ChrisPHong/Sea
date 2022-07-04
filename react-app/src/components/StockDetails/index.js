import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneStock, getStockPrices } from '../../store/stock';
import { getAllTransactions } from '../../store/transaction';
import Buy from './Buy';
import Sell from './Sell';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import News from '../News'
import { getCompanyNews } from '../../store/news';
import './StockDetails.css'
import CompanyWatchlistForm from '../CompanyWatchlistForm';
import { getWatchlists } from '../../store/watchlist'

const StockDetails = () => {
    const dispatch = useDispatch()
    const { ticker } = useParams()
    // console.log(ticker.toUpperCase())
    const stockObj = useSelector(state => state?.stock?.entries)
    // console.log("THIS IS THE STOCK OBJECT", stockObj)
    const news = useSelector(state => state?.news?.entries)
    const prices = useSelector(state => state?.stock?.prices)
    const user = useSelector(state => state.session?.user)
    // console.log(prices)
    const pricesData = Object.values(prices)
    const userShares = useSelector(state => state?.transaction?.entries)

    console.log(userShares)


    const stocks = Object.values(stockObj)


    const watchlist = useSelector((state) => Object.values(state.watchlist));
    const watchlists = Object.values(watchlist[0])

    let stock

    if (stocks) {
        for (let i = 0; i < stocks.length; i++) {
            if (stocks[i].ticker === ticker.toUpperCase()) {
                stock = stocks[i]
            }
        }
    }

    const companyId = stock?.id

    // console.log("THIS IS THE PRICES IN THE STATE ", prices)
    // console.log("THIS IS THE PRICE DATA IN AN ARRAY", pricesData[0])
    // console.log('These are the stocks', stocks)
    // console.log("THIS SHOULD BE THE COMPANY ID", companyId)
    // console.log('heres the pricesData that DOESNT WANNA WORK SOMETIMES SMH', pricesData)

    const [data, setData] = useState(pricesData)
    const [currPrice, setCurrPrice] = useState(data[data?.length - 1])

    const pricesArr = pricesData[0]

    // console.log(pricesArr)

    let stockPrices = []

    if (pricesArr) {
        for (let i = 0; i < pricesArr.length; i++) {
            // console.log(pricesArr[i].price)
            stockPrices.push(pricesArr[i].price)
        }
    }

    // console.log(stockPrices)

    const gainOrLoss = [1, -1]

    let gainOrLossRandomElement = gainOrLoss[Math.floor(Math.random().toFixed(2) * gainOrLoss.length)]

    let max = Math.max(...stockPrices).toFixed(2)

    let min = Math.min(...stockPrices).toFixed(2)

    let randomMultiplier = Number(gainOrLossRandomElement).toFixed(2)

    // console.log(randomMultiplier)

    let closePrice = Number(stockPrices[stockPrices.length - 1]).toFixed(2)
    // console.log(stockPrices[stockPrices.length - 1])

    let randomNumber = randomMultiplier * .15 * closePrice

    // console.log(randomNumber)

    let buyPrice = Number(stockPrices[stockPrices.length - 1]) + randomNumber

    let openingPrice = Number(stockPrices[0]).toFixed(2)

    // if (stockPrices.length === 365) console.log(buyPrice)

    // getting stocks from backend
    useEffect(() => {
        if (stock === undefined) {
            dispatch(getCompanyNews(ticker))
            dispatch(getOneStock(ticker))
            dispatch(getWatchlists())
            dispatch(getAllTransactions())
            // dispatch(stockTransaction(transaction))
        }
    }, [dispatch, ticker])

    useEffect(() => {
        if (companyId) {
            dispatch(getStockPrices(companyId))
        }
    }, [dispatch, stock])


    // When the price state, the length of the pricesData array, or the ticker changes,
    // Set the data to the new pricesData and show the 1W timeframe.
    useEffect(() => {
        setData(pricesArr)
        createData('1w')
    }, [pricesData?.length, prices, ticker])

    // console.log('what is data printing again??!?!?!?!?!?!??!?', data[0])

    // console.log("WHAT IS THE PRICES DATA")

    const createData = (time) => {
        if (time === '1y') {
            setData(pricesData)
            return pricesData
        }
        if (time === '1w') {
            setData(pricesData.slice(-7))
            return pricesData
        }
        if (time === '1m') {
            setData(pricesData?.slice(-30))
            return pricesData
        }
        if (time === '3m') {
            setData(pricesData?.slice(-90))
            return pricesData
        }
        if (time === '6m') {
            setData(pricesData?.slice(-(Math.floor(pricesData?.length / 2))))
            return pricesData
        }
    }

    const lineMouseOver = (price) => {
        if (price) {
            setCurrPrice(price?.toFixed(2))
        }
    }

    // Customized tooltip to show price and date
    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-price">{`$${((payload[0].value)).toFixed(2)}`}</p>
                    <p className="tooltip-date">{label}</p>
                </div>
            );
        }
        return null;
    }

    return (
        <div id='stocks-detail-ctn'>
            {/* -------------------- LINE CHART HERE -------------------- */}
            <div className='asset-chart'>
                {prices &&
                    <>
                        <LineChart
                            width={950}
                            height={300}
                            data={data[0]}
                            onMouseMove={(e) => lineMouseOver(e?.activePayload && e?.activePayload[0].payload.price)}
                        >
                            <XAxis dataKey="date" hide='true' />
                            <YAxis dataKey="price" domain={['dataMin', 'dataMax']} hide='true' />
                            <Tooltip
                                cursor={false}
                                content={customTooltip}
                            />
                            <Line
                                type="linear"
                                dataKey="price"
                                stroke="#0b7cee"
                                activeDot={{ r: 5 }}
                                dot={false}
                                animationDuration={500}
                                strokeWidth={2}
                            />
                        </LineChart>
                    </>}
            </div>
            <div className='stock-chart-bottom'>
                <div className='stock-timeframe'>
                    <span className='weekly'>
                        <button
                            value='1w'
                            onClick={e => createData(e.target.value)}
                        >
                            1W
                        </button>
                    </span>
                    <span className='monthly'>
                        <button
                            value='1m'
                            onClick={e => createData(e.target.value)}
                        >
                            1M
                        </button>
                    </span>
                    <span className='three-months'>
                        <button
                            value='3m'
                            onClick={e => createData(e.target.value)}
                        >
                            3M
                        </button>
                    </span>
                    <span className='six-months'>
                        <button
                            value='6m'
                            onClick={e => createData(e.target.value)}
                        >
                            6M
                        </button>
                    </span>
                    <span className='one-year'>
                        <button
                            value='1y'
                            onClick={e => createData(e.target.value)}
                        >
                            1Y
                        </button>
                    </span>
                </div>
            </div>
            {stock &&
                <div className='stock-details-information'>
                    <div className='stock-details-name-title'>
                        {stock.name} ({stock.ticker})
                    </div>
                    <div className='stock-details-company-information'>
                        <div>
                            <div className='stock-details-about-title'>
                                About
                            </div>
                            <hr></hr>
                            <div className='stock-details-about-description'>
                                {stock.description}
                            </div>
                        </div>
                        <div className='stock-details-title'>
                            <div>
                                <div className='stock-details-ceo-title'>
                                    CEO
                                </div>
                                <div>
                                    {stock.ceo}
                                </div>
                            </div>
                            <div>
                                <div className='stock-details-employees-title'>
                                    Employees
                                </div>
                                <div>
                                    {stock.employees}
                                </div>
                            </div>
                            <div>
                                <div className='stock-details-headquarters-title'>
                                    Headquarters
                                </div>
                                <div>
                                    {stock.headquarters}
                                </div>
                            </div>
                            <div>
                                <div className='stock-details-founded-title'>
                                    Founded
                                </div>
                                <div>
                                    {stock.founded}
                                </div>
                            </div>
                        </div>
                        <div className='stock-details-keystats-title'>
                            Key Statistic
                        </div>
                        <hr></hr>
                        <div className='stock-details-keystats-information'>
                            <div>
                                <div className='stock-details-high-price'>
                                    High
                                </div>
                                <div className='stock-details-high-price-number'>
                                    ${max}
                                </div>
                            </div>
                            <div>
                                <div className='stock-details-low-price'>
                                    Low
                                </div>
                                <div className='stock-details-low-price-number'>
                                    ${min}
                                </div>
                            </div>
                            <div>
                                <div className='stock-details-open-price'>
                                    Open price
                                </div>
                                <div>
                                    ${openingPrice}
                                </div>
                            </div>
                            <div>
                                <div className='stock-details-close-price'>
                                    Close price
                                </div>
                                <div>
                                    ${closePrice}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='PostCompanyInWatchlist'>
                        < CompanyWatchlistForm props={watchlists} />
                    </div>
                    {news ? <div>
                        <News news={news} ticker={ticker} />
                    </div> : <div>Loading</div>}
                </div>}
            {/* start of buy sell container */}
            <div className='fixed-side-container'>
                <div className='buy-sell-container'>
                    <section className="buy-sell">
                        <div id='tabs'>
                            <h2>This is the Buy Sell Tab</h2>
                            {/* <Headers
                                    titles={titles}
                                    currentTab={currentTab}
                                    selectTab={setCurrentTab}
                                /> */}
                            <div className="tab-toggle-content">
                                {prices && <Buy user={user} companyId={stock?.id} ticker={ticker} priceData={data[data.length - 1]} />}
                                <br></br>
                                {prices && userShares && <Sell user={user} priceData={data[data.length - 1]} companyId={stock?.id} shares={userShares} />}
                                {/* {currentTab === 0 && <Buy user={user} priceArr={price} />} */}
                                {/* {currentTab === 1 && <Sell user={user} price={closePrice} shares={userShares} />} */}
                            </div>
                        </div>
                    </section>
                    {/* <section className="">
                            watchlist?
                        </section> */}
                </div>
            </div>
        </div>
    )

}

export default StockDetails
