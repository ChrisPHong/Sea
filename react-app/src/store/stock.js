const LOAD_STOCKS = 'stock/loadStocks'

export const loadStocks = (stocks) => {
    return {
        type: LOAD_STOCKS,
        stocks
    }
}

export const getStocks = () => async (dispatch) => {
    const response = await fetch('/api/stocks/')

    const stocks = await response.json()
    dispatch(loadStocks(stocks))
}

const initialState = { entries: {}, isLoading: true }


const stockReducer = ( state = initialState, action ) => {
    let newState
    switch (action.type) {
        case LOAD_STOCKS:
            newState = { ...state, entries: {...state.entries} }
            action.stocks.forEach(stock => newState.entries[stock.id] = stock)
            return newState
        default:
            return state
    }
}

export default stockReducer
