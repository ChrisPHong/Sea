const LOAD_STOCKS = 'stock/loadStocks'
const LOAD_OWNED_WEEKLY_PRICES = 'stock/loadOwnedWeeklyPrices'

export const loadStocks = (stocks) => {
    return {
        type: LOAD_STOCKS,
        stocks
    }
}

export const loadOwnedWeeklyPrices = (companies) => {
    console.log('in loadOwnedWeeklyPrices action')
    return {
        type: LOAD_STOCKS,
        companies
    }
}

export const getStocks = () => async (dispatch) => {
    const response = await fetch('/api/stocks/')

    const stocks = await response.json()
    dispatch(loadStocks(stocks))
}

export const getOwnedWeeklyPrices = (userId) => async (dispatch) => {
    console.log('are we getting thunk?')
    const response = await fetch('/api/stocks/weekly', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId})
    })

    if (response.ok) {
        const companies = await response.json()
        console.log(companies)
        dispatch(loadOwnedWeeklyPrices(companies))
    }
}

const initialState = { entries: {}, isLoading: true }


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
        default:
            return state
    }
}

export default stockReducer
