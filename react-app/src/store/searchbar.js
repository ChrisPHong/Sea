const GET_SEARCH_STOCKS = 'search/searchStocks'

export const getSearchStocks = (stocks) => {
    return {
        type: GET_SEARCH_STOCKS,
        stocks
    }
}

export const searchStocks = () => async (dispatch) => {
    const response = await fetch('/api/search/')

    if (response.ok) {
        const data = await response.json()
        // console.log('------data-------', data) // data from backend
        dispatch(getSearchStocks(data))
    }
}


let initialState = {
    entries: {}, isLoading: true
}

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SEARCH_STOCKS:
            return {
                entries: action.stocks
            }
        default:
            return state;
    }
}
