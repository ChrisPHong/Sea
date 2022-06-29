import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// import { getCompanyNews } from '../../store/news';
import './News.css'


const News = ({ news, ticker }) => {
    const dispatch = useDispatch()
    // const displayNews = useSelector(state => state?.news?.entries)
    const stock = useSelector(state => state?.stock?.entries[ticker.toUpperCase()])
    // console.log("These are the state in displayNews", displayNews)
    // console.log("These are the passed in news", news)
    // console.log("These are the stockssssssssss", stock)
    let slicedNews = Object.values(news).slice(0, 5)
    // console.log("These are the passed in news after slicing", slicedNews)

    useEffect(() => {

    }, [dispatch])

    return (
        <>
            <div className="news-title">
                News
            </div>
            <div>
                {news && slicedNews.map(companyNews => {
                    if (companyNews.related === ticker)
                    return (
                        <div key={companyNews.id} className="news-container">
                            <div className="news-information-container">
                                <div className="news-sources">
                                    {companyNews.source}
                                </div>
                                <div className="news-headlines">
                                    {companyNews.headline}
                                </div>
                                <div className="news-summaries">
                                    {companyNews.summary}
                                </div>
                                <div >
                                    <a className="news-article-link" href={companyNews.url}>
                                        See more.
                                    </a>
                                </div>
                            </div>
                            <div className="news-images-container">
                                <img className="news-images" src={companyNews.image}></img>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )

}

export default News
