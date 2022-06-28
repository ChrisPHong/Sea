const GET_SEARCH_STOCKS = 'search/searchStocks'

export const getSearchStocks = (stocks) => {
    return {
        type: GET_SEARCH_STOCKS,
        stocks
    }
}

export const searchStocks = () => async(dispatch) => {
    const response = await fetch('/api/search/')

    if (response.ok) {
        const data = await response.json()
        dispatch(getSearchStocks(data))
        return "Success";
    } else {
        return "Ticker fetch search failed";
    }
}


let initialState = {
    entries: {}, isLoading: true
}

export default function searchReducer(state=initialState, action) {
    switch (action.type) {
        case GET_SEARCH_STOCKS:
            return {
                entries: action.stocks
            }
        default:
            return state;
    }
}



// const initialState = { entries: {}, isLoading: true}

// export default function searchReducer(state = initialState, action) {
//     let newState
//     switch(action.type) {
//         case GET_SEARCH_STOCKS:
//             newState =  { ...state, entries: {...state.entries}}
//             action.stocks.forEach(stock => newState.entries[stock.id] = stock)
//             return newState
//     default:
//         return state
//     }
// }