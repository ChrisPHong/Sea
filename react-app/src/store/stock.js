const LOAD_STOCKS = 'stock/loadStocks'
const LOAD_OWNED_WEEKLY_PRICES = 'stock/loadOwnedWeeklyPrices'
const LOAD_ONE_STOCK = 'stock/loadOneStock'
const LOAD_STOCK_PRICES = 'stock/loadStockPrices'

export const loadStocks = (stocks) => {
    return {
        type: LOAD_STOCKS,
        stocks
    }
}

export const loadOwnedWeeklyPrices = (companies) => {
    return {
        type: LOAD_OWNED_WEEKLY_PRICES,
        companies
    }
}

export const loadOneStock = (stock) => {
    return {
        type: LOAD_ONE_STOCK,
        stock
    }
}

export const loadStockPrices = (prices) => {
    return {
        type: LOAD_STOCK_PRICES,
        prices
    }
}

export const getStocks = () => async (dispatch) => {
    const response = await fetch('/api/stocks/')

    const stocks = await response.json()
    dispatch(loadStocks(stocks))
}

export const getOneStock = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${ticker}`)

    const stock = await response.json()
    dispatch(loadOneStock(stock))
}

export const getStockPrices = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${ticker}/prices`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ticker)
    })

    if (response.ok) {
        const prices = await response.json()
        dispatch(loadStockPrices(prices))
    }
}


const initialState = { entries: {}, prices: {}, isLoading: true }


const stockReducer = ( state = initialState, action ) => {
    let newState
    switch (action.type) {
        case LOAD_STOCKS:
            newState = { ...state, entries: {...state.entries} }
            action.stocks.forEach(stock => newState.entries[stock.id] = stock)
            return newState
        case LOAD_OWNED_WEEKLY_PRICES:
            newState = { ...state, entries: {...state.entries} }
            action.companies.forEach(company => newState.entries[company.id] = company)
            return newState
        case LOAD_ONE_STOCK:
            newState = {entries:{}}
            newState.entries[action.stock.ticker] = action.stock
            return newState
        case LOAD_STOCK_PRICES:
            newState = { ...state, entries: {...state.entries}, prices: {...state.prices} }
            action.prices.forEach((stockPrice, i) => newState.prices[i] = stockPrice)
            return newState
        default:
            return state
    }
}

export default stockReducer
