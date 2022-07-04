import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneStock, getStockPrices } from '../../store/stock';
import Buy from './Buy';
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
    const news = useSelector(state => state?.news?.entries)
    const prices = useSelector(state => state?.stock?.prices)
    const user = useSelector(state => state.session.user)
    // console.log(prices)
    const pricesData = Object.values(prices)
    const stock = Object.values(stockObj)

    const watchlist = useSelector((state) => Object.values(state.watchlist));
    const watchlists = Object.values(watchlist[0])
    // console.log(pricesData)
    console.log("THIS IS THE PRICE DATA IN AN ARRAY", stock)
    // console.log('why are prices not rendering', prices)
    // console.log('heres the pricesData that DOESNT WANNA WORK SOMETIMES SMH', pricesData)

    const [data, setData] = useState(pricesData)
    const [currPrice, setCurrPrice] = useState(data[data?.length - 1])

    let stockPrices = []

    for (let i = 0; i < pricesData.length; i++) {
        stockPrices.push(pricesData[i].price)
    }

    console.log(stockPrices)

    const gainOrLoss = [1, -1]

    const gainOrLossRandomElement = gainOrLoss[Math.floor(Math.random().toFixed(2) * gainOrLoss.length)]

    let max = Math.max(...stockPrices).toFixed(2)

    let min = Math.min(...stockPrices).toFixed(2)

    let openPrice = stockPrices[0]

    console.log(openPrice)

    let randomNum = Math.random().toFixed(2)

    console.log("THIS IS MY TEST FOR THE RANDOM NUMBER GENERATOR", randomNum * openPrice)


    // getting stocks from backend
    useEffect(() => {
        if (stock === undefined) {
            dispatch(getCompanyNews(ticker))
            dispatch(getOneStock(ticker))
            dispatch(getStockPrices(stock?.id))
            dispatch(getWatchlists())
            // dispatch(getAllTransactions())
            // dispatch(stockTransaction(transaction))
        }
    }, [dispatch, ticker])

    // When the price state, the length of the pricesData array, or the ticker changes,
    // Set the data to the new pricesData and show the 1W timeframe.
    useEffect(() => {
        setData(pricesData)
        createData('1w')
    }, [pricesData?.length, prices, ticker])

    console.log('what is data printing again??!?!?!?!?!?!??!?', data)

    const createData = (time) => {
        if (time === '1y') {
            setData(pricesData)
            return pricesData
        }
        if (time === '1w') {
            setData(pricesData?.slice(-7))
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
                        data={data}
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
                                    ${openPrice}
                                </div>
                            </div>
                            <div>
                                <div className='stock-details-close-price'>
                                    Close price
                                </div>
                                <div>
                                    ${stockPrices[stockPrices.length - 1]}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='PostCompanyInWatchlist'>
                        < CompanyWatchlistForm props={watchlists}/>
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
                                {/* {stock && <Sell user={user} price={lastPrice} shares={userShares} />} */}
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
