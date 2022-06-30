import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneStock } from '../../store/stock';
import News from '../News'
import { getCompanyNews } from '../../store/news';
import './StockDetails.css'

const StockDetails = () => {
    const dispatch = useDispatch()
    const { ticker } = useParams()
    // console.log(ticker.toUpperCase())
    const stock = useSelector(state => state?.stock?.entries[ticker.toUpperCase()])
    const news = useSelector(state => state?.news?.entries)
    // console.log(news)
    // console.log("THESE ARE THE VALUESSSSSS", displayNews)
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
    useEffect(() => {
        if (stock === undefined) {
            dispatch(getOneStock(ticker))
            dispatch(getCompanyNews(ticker))
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
        </>
    )

}

export default StockDetails
