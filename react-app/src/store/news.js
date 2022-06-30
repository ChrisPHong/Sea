const LOAD_COMP_NEWS = 'news/loadCompNews'
const LOAD_GEN_NEWS = 'news/loadGenNews'

export const loadCompanyNews = (news) => {
    return {
        type: LOAD_COMP_NEWS,
        news
    }
}

export const loadGeneralNews = (news) => {
    return {
        type: LOAD_GEN_NEWS,
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

export const getGeneralNews = () => async (dispatch) => {
    const response = await fetch('/api/news/')

    const news = await response.json()
    dispatch(loadGeneralNews(news))
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
        case LOAD_GEN_NEWS:
            newState = { entries: {} }
            action.news.forEach(generalNews => newState.entries[generalNews.id] = generalNews)
            return newState
        default:
            return state
    }
}

export default newsReducer
