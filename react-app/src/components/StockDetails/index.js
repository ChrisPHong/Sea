import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneStock, getStockPrices } from '../../store/stock';
import { getAllTransactions, getBoughtTransactions } from '../../store/transaction';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { getCompanyNews } from '../../store/news';
import CompanyWatchlistForm from '../CompanyWatchlistForm';
import { getWatchlists } from '../../store/watchlist'
import PageNotFound from '../PageNotFound';
import Buy from './Buy';
import Sell from './Sell';
import News from '../News'
import './StockDetails.css'

const StockDetails = () => {
    const dispatch = useDispatch()
    const { ticker } = useParams()
    const user = useSelector(state => state.session?.user)
    const stockObj = useSelector(state => state?.stock?.entries)
    const news = useSelector(state => state?.news?.entries)
    const prices = useSelector(state => state?.stock?.prices)
    const userShares = useSelector(state => state?.transaction?.entries)
    const boughtTransactions = useSelector((state) => state.transaction.boughtTrans)
    const boughtShares = useSelector((state) => Object.values(state.transaction.boughtTrans))
    const watchlist = useSelector((state) => Object.values(state.watchlist));
    const pricesData = Object.values(prices)
    const stocks = Object.values(stockObj)
    const watchlists = Object.values(watchlist[0])

    const options = { style: 'currency', currency: 'USD' };
    const currencyFormat = new Intl.NumberFormat('en-US', options);

    const [data, setData] = useState(pricesData)
    const [currPrice, setCurrPrice] = useState(0)
    const [showBuy, setShowBuy] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    let stock

    if (stocks) {
        for (let i = 0; i < stocks.length; i++) {
            if (stocks[i].ticker === ticker.toUpperCase()) {
                stock = stocks[i]
            }
        }
    }

    const companyId = stock?.id
    const pricesArr = pricesData[0]

    let stockPrices = []

    if (pricesArr) {
        for (let i = 0; i < pricesArr.length; i++) {
            // console.log(pricesArr[i].price)
            stockPrices.push(pricesArr[i].price)
        }
    }

    const gainOrLoss = [1, -1]
    let gainOrLossRandomElement = gainOrLoss[Math.floor(Math.random().toFixed(2) * gainOrLoss.length)]
    let max = Math.max(...stockPrices).toFixed(2)
    let min = Math.min(...stockPrices).toFixed(2)

    let randomMultiplier = Number(gainOrLossRandomElement).toFixed(2)
    let closePrice = Number(stockPrices[stockPrices.length - 1]).toFixed(2)
    let randomNumber = randomMultiplier * .15 * closePrice
    let buyPrice = Number(stockPrices[stockPrices.length - 1]) + randomNumber
    let openingPrice = Number(stockPrices[0]).toFixed(2)

    useEffect(() => {
        // Force the page to scroll up to top on mount
        window.scrollTo(0, 0)

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [])

    // getting stocks from backend
    useEffect(() => {
        if (stock === undefined) {
            dispatch(getCompanyNews(ticker))
            dispatch(getOneStock(ticker))
            dispatch(getWatchlists())
            dispatch(getAllTransactions())
        }
    }, [dispatch, ticker])

    useEffect(() => {
        if (companyId) {
            dispatch(getStockPrices(companyId))
            dispatch(getCompanyNews(ticker))
        }
    }, [dispatch, stock, companyId])

    useEffect(() => {
        dispatch(getBoughtTransactions(user?.id))
    }, [dispatch, stock, boughtShares.length])

    // When the price state, the length of the pricesData array, or the ticker changes,
    // Set the data to the new pricesData and show the 1W timeframe.
    useEffect(() => {
        if (pricesArr) {
            createData('1w')
            setData(pricesArr?.slice(-7))
        }
    }, [pricesData?.length, prices, ticker])

    const createData = (time) => {
        if (time === '1y') {
            setData(pricesArr)
            return pricesArr
        }
        if (time === '1w') {
            setData(pricesArr?.slice(-7))
            return pricesArr
        }
        if (time === '1m') {
            setData(pricesArr?.slice(-30))
            return pricesArr
        }
        if (time === '3m') {
            setData(pricesArr?.slice(-90))
            return pricesArr
        }
        if (time === '6m') {
            setData(pricesArr?.slice(-(Math.floor(pricesArr?.length / 2))))
            return pricesArr
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
        <>
            {isLoading
            ? <div className='loading-ctn'>
                <div className='loading'></div>
            </div>
            :
            <div id='stocks-detail-ctn'>
                {stock ?
                    <div className='stock-details-information'>
                        <div className='stock-details-name-title'>
                            {stock.name} ({stock.ticker})
                        </div>
                        <div className='stock-balance-amount'>
                            {pricesArr && currencyFormat.format(pricesArr[pricesArr.length - 1].price)}
                        </div>
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
                        <div className='stock-detail-bottom'>
                            <div className='stock-timeframe'>
                                <span className='weekly'>
                                    <button
                                        value='1w'
                                        className='weekly-btn'
                                        onMouseDown={e => createData(e.target.value)}
                                    >
                                        1W
                                    </button>
                                </span>
                                <span className='monthly'>
                                    <button
                                        value='1m'
                                        className='monthly-btn'
                                        onMouseDown={e => createData(e.target.value)}
                                    >
                                        1M
                                    </button>
                                </span>
                                <span className='three-months'>
                                    <button
                                        value='3m'
                                        className='three-months-btn'
                                        onMouseDown={e => createData(e.target.value)}
                                    >
                                        3M
                                    </button>
                                </span>
                                <span className='six-months'>
                                    <button
                                        value='6m'
                                        className='six-months-btn'
                                        onMouseDown={e => createData(e.target.value)}
                                    >
                                        6M
                                    </button>
                                </span>
                                <span className='one-year'>
                                    <button
                                        value='1y'
                                        className='one-year-btn'
                                        onMouseDown={e => createData(e.target.value)}
                                    >
                                        1Y
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div id='bottom-info'>
                            <div id='left'>
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
                                                {(stock.employees).toLocaleString()}
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
                                {news ? <div>
                                    <News news={news} ticker={ticker} />
                                </div> : <div>Loading</div>}
                            </div>
                            <div id='right'>
                                {/* start of buy sell container */}
                                <div className='fixed-side-container'>
                                    <div className='buy-sell-container'>
                                        <div id='tabs'>
                                            <div
                                                className='buy-tab'
                                                onClick={() => setShowBuy(true)}
                                                style={{color: showBuy ? '#0b7cee' : '', borderBottom: showBuy ? '' : '1px solid lightgray', borderTop: showBuy ? '2px solid #0b7cee' : ''}}
                                            >
                                                <span className='trade-span'>Buy</span>
                                            </div>
                                            <div
                                                className='sell-tab'
                                                onClick={() => setShowBuy(false)}
                                                style={{color: showBuy ? '' : '#0b7cee', borderBottom: showBuy ? '1px solid lightgray' : '', borderTop: showBuy ? '' : '2px solid #0b7cee'}}
                                            >
                                                <span className='trade-span'>Sell</span>
                                            </div>
                                        </div>
                                        <section className="buy-sell">
                                            <div className="tab-toggle-content">
                                                {showBuy ?
                                                    prices && <Buy
                                                                user={user}
                                                                companyId={stock?.id}
                                                                ticker={ticker}
                                                                priceData={data[data.length - 1]}
                                                                boughtTransactions={boughtTransactions}
                                                                boughtShares={boughtShares}
                                                            />
                                                    :
                                                    prices && userShares && <Sell
                                                                                user={user}
                                                                                priceData={data[data.length - 1]}
                                                                                companyId={stock?.id}
                                                                                boughtTransactions={boughtTransactions}
                                                                                boughtShares={boughtShares}
                                                                            />
                                                }
                                            </div>
                                        </section>

                                    </div>
                                </div>
                                <div className='PostCompanyInWatchlist'>
                                    < CompanyWatchlistForm props={watchlists} />
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <PageNotFound />
                    }
            </div>}
        </>
    )

}

export default StockDetails
