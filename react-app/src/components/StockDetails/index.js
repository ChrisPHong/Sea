import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneStock } from '../../store/stock';
import News from '../News'
import { getCompanyNews } from '../../store/news';
import { stockTransaction, getAllTransactions } from '../../store/transaction';
import Buy from './Buy';
import Sell from './Sell';
import './StockDetails.css'

const Headers = ({ titles, currentTab, selectTab }) => {
    const handleClick = (e) => {
        const index = parseInt(e.target.id, 10);
        selectTab(index);
    }
    const tabs = titles.map((title, index) => {
        const headerClass = (index === currentTab) ? 'active' : '';
        return (
            <li
                key={index}
                id={index}
                onClick={handleClick}
                className={headerClass}
            >
                {title}
                {/* Buy / Sell tab toggle titles */}
            </li>
        );
    });
    return (
        <ul className='tab-header'>
            {tabs}
        </ul>
    );
}

const StockDetails = () => {
    const dispatch = useDispatch()
    const { ticker } = useParams()
    // console.log(ticker.toUpperCase())
    const stock = useSelector(state => state?.stock?.entries[ticker.toUpperCase()])
    console.log('STOCKKK', stock)
    const companyId = stock?.id;
    console.log(companyId)
    // console.log('stockk.prices', stock.prices)
    // console.log('pricessss', prices)
    // console.log('stockkkk', prices[prices.length - 1])
    const news = useSelector(state => state?.news?.entries)
    // console.log(news)
    // console.log("THESE ARE THE VALUESSSSSS", displayNews)

    // buy sell container
    const [currentTab, setCurrentTab] = useState(0); // 0 = buy tab; 1 = sell tab
    const folders = [{ title: `Buy ${ticker}` }, { title: `Sell ${ticker}` }]
    const titles = folders.map((folder) => folder.title);
    const user = useSelector(state => state.session.user);
    const transaction = useSelector(state => state.transaction.entries)
    console.log('----stock transaction', transaction)
    // const closePrice = transaction.price?.toFixed(2);
    // console.log('---close price', closePrice)
    // const userShares = transactions
    // const state = useSelector(state => console.log(state))

    let min = Infinity
    let max = -Infinity
    if (stock) {
        // console.log(stock.prices)
        for (let i = 0; i < stock?.prices?.length; i++) {
            if (stock?.prices[i] < min) {
                min = stock?.prices[i].toFixed(2);
            }
            if (stock?.prices[i] > max) {
                max = stock?.prices[i].toFixed(2);
            }
        }
    }
    // console.log(min)
    // console.log(max)
    // getting stocks from backend

    let stockPricesArr;
    const prices = () => {
        stockPricesArr = stock?.prices;
        console.log('stock prices arr on stock details page', stockPricesArr)
        console.log(stockPricesArr[stockPricesArr.length - 1])
        return stockPricesArr[stockPricesArr.length - 1]
    }

    useEffect(() => {
        if (stock === undefined) {
            dispatch(getOneStock(ticker))
            dispatch(getCompanyNews(ticker))
            dispatch(getAllTransactions())
            // dispatch(stockTransaction(transaction))
        }
    }, [dispatch, stock])



    return (
        <>
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
                                    ${stock.prices[0].toFixed(2)}
                                </div>
                            </div>
                            <div>
                                <div className='stock-details-close-price'>
                                    Close price
                                </div>
                                <div>
                                    ${stock.prices[stock.prices.length - 1].toFixed(2)}
                                </div>
                            </div>
                        </div>
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
                                {stock && <Buy user={user}
                                companyId={companyId} ticker={ticker} price={prices()} />}
                                {/* {currentTab === 0 && <Buy user={user} price={price} />} */}
                                {/* {currentTab === 1 && <Sell user={user} price={closePrice} shares={userShares} />} */}
                                </div>
                            </div>
                        </section>
                        {/* <section className="">
                            watchlist?
                        </section> */}
                    </div>
                </div>
        </>
    )

}

export default StockDetails
