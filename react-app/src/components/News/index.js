import './News.css'
import { NavLink } from 'react-router-dom';

const News = ({ news }) => {
    console.log("These are the passed in news", news)
    return (
        <>
            <div className="news-title">
                News
            </div>
            <div>
                {news.map(companyNews => {
                    return (
                        <div className="news-container">
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
