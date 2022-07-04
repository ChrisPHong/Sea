const LOAD_STOCKS = 'stock/loadStocks'
// const LOAD_OWNED_WEEKLY_PRICES = 'stock/loadOwnedWeeklyPrices'
const LOAD_ONE_STOCK = 'stock/loadOneStock'
const LOAD_STOCK_PRICES = 'stock/loadStockPrices'

export const loadStocks = (stocks) => {
    return {
        type: LOAD_STOCKS,
        stocks
    }
}

// export const loadOwnedWeeklyPrices = (companies) => {
//     return {
//         type: LOAD_OWNED_WEEKLY_PRICES,
//         companies
//     }
// }

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

export const getStockPrices = (company_id) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${company_id}/prices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company_id)
    })

    if (response.ok) {
        const prices = await response.json()
        dispatch(loadStockPrices(prices))
    }
}


const initialState = { entries: {}, prices: {}, isLoading: true }


const stockReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_STOCKS:
            newState = { ...state, entries: { ...state.entries } }
            action.stocks.forEach(stock => newState.entries[stock.id] = stock)
            return newState
        // case LOAD_OWNED_WEEKLY_PRICES:
        //     newState = { ...state, entries: { ...state.entries } }
        //     action.companies.forEach(company => newState.entries[company.id] = company)
        //     return newState

        // Reset the entries data and then fill state with stock.
        case LOAD_ONE_STOCK:
            newState = { ...state, entries: {}, prices: { ...state.prices } }
            newState.entries[action.stock.id] = action.stock
            return newState

        // Keep previous state, but reset the prices data and then fill state with new updated prices.
        case LOAD_STOCK_PRICES:
            newState = { ...state, entries: { ...state.entries }, prices: {} }
            console.log(action.prices)
            let pricesDate = Object.values(action.prices)
            console.log("THIS IS IN THE LOAD STOCK PRICES REDUCER", pricesDate)
            pricesDate.forEach((stockPrice, i) => newState.prices[i] = stockPrice)
            // newState.entries[action.stock] = action.stock
            return newState
        default:
            return state
    }
}

export default stockReducer
