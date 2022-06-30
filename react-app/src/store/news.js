const LOAD_COMP_NEWS = 'news/loadCompNews'

export const loadCompanyNews = (news) => {
    return {
        type: LOAD_COMP_NEWS,
        news
    }
}

export const getCompanyNews = (ticker) => async (dispatch) => {
    const response = await fetch('/api/news/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker })
    })

    if (response.ok) {
        const news = await response.json()
        // console.log(news)
        dispatch(loadCompanyNews(news))
    }
}

const initialState = { entries: {}, isLoading: true }


const newsReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_COMP_NEWS:
            // console.log(action.news)
            // console.log("This is the state from the newsREDUCER", state)
            newState = { entries: {} }
            // console.log("-----------THIS IS THE NEW STATE-------------------", newState)
            action.news.forEach(companyNews => newState.entries[companyNews.id] = companyNews)
            return newState
        default:
            return state
    }
}

export default newsReducer
