const LOAD_SEARCH_STOCKS = 'search/searchStocks'

export const loadSearchStocks = (stocks) => {
    return {
        type: LOAD_SEARCH_STOCKS,
        stocks
    }
}

export const searchStocks = () => async(dispatch) => {
    const response = await fetch('/api/search/')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadSearchStocks(data))
    }
}

const initialState = { entries: {}, isLoading: true}

export default function searchReducer(state = initialState, action) {
    let newState
    switch(action.type) {
        case LOAD_SEARCH_STOCKS:
            newState =  { ...state, entries: {...state.entries}}
            action.stocks.forEach(stock => newState.entries[stock.id] = stock)
            return newState
    default:
        return state
    }
}
