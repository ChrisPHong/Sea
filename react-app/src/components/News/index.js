import './News.css'

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
                            <div>
                                <div className="news-sources">
                                    {companyNews.source}
                                </div>
                                <div className="news-headlines">
                                    {companyNews.headline}
                                </div>
                                <div className="news-summaries">
                                    {companyNews.summary}
                                </div>
                            </div>
                            <div>
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
