import './MarketNews.css'

const MarketNews = ({news}) => {
    // console.log(news)
    let slicedNews = Object.values(news).slice(0, 5)
    return (
        <>
            <div className="general-news-title">
                News
            </div>
            <div>
                {news && slicedNews.map(generalNews => {
                        return (
                            <div key={generalNews.id} className="general-news-container">
                                <div className="general-news-information-container">
                                    <div className="general-news-sources">
                                        {generalNews.source}
                                    </div>
                                    <div className="general-news-headlines">
                                        {generalNews.headline}
                                    </div>
                                    <div className="general-news-summaries">
                                        {generalNews.summary}
                                    </div>
                                    <div >
                                        <a className="general-news-article-link" href={generalNews.url}>
                                            See more.
                                        </a>
                                    </div>
                                </div>
                                <div className="general-news-images-container">
                                    <img className="general-news-images" src={generalNews.image}></img>
                                </div>
                            </div>
                        )
                })}
            </div>
        </>
    )
}

export default MarketNews
