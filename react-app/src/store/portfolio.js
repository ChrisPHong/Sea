const LOAD_PORTFOLIO = 'portfolio/loadPortfolio'
const LOAD_ASSET_PRICES = 'portfolio/loadAssetPrices'
const LOAD_ASSET_CLOSING_PRICES = 'portfolio/loadAssetClosingPrices'
const CLEAR_ALL_PORTFOLIOS = 'portfolio/CLEAR_ALL_PORTFOLIOS'

export const loadPortfolio = (portfolio) => {
    return {
        type: LOAD_PORTFOLIO,
        portfolio
    }
}
export const clearPortfolios = (portfolio) =>{
    return {
        type: CLEAR_ALL_PORTFOLIOS,
        portfolio
    }
}

let assetPrices = {}
export const loadAssetPrices = (prices) => {
    for (let i in prices) {
        assetPrices[i] = prices[i]
    }
    return {
        type: LOAD_ASSET_PRICES,
        prices
    }
}

// FOR ASSET TABLE PRICES
export const loadAssetClosingPrices = (prices) => {
    return {
        type: LOAD_ASSET_CLOSING_PRICES,
        prices
    }
}

export const getPortfolio = () => async (dispatch) => {
    const response = await fetch('/api/portfolio/')

    if (response.ok) {

        const portfolio = await response.json()
        dispatch(loadPortfolio(portfolio))
    }
}

export const getAssetPrices = (company_id) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${company_id}/prices`)

    if (response.ok) {
        const prices = await response.json()
        dispatch(loadAssetPrices(prices))
    }
}

// FOR ASSET TABLE PRICES
export const getAssetClosingPrices = () => async (dispatch) => {
    const response = await fetch('/api/portfolio/asset_prices')

    if (response.ok) {
        const prices = await response.json()
        dispatch(loadAssetClosingPrices(prices))
    }
}

export const clearAllPortFolios = () => async (dispatch) => {
    dispatch(clearPortfolios())
    return {}
}

const initialState = { entries: {}, prices: {}, closing: {}, isLoading: true }

const portfolioReducer = ( state = initialState, action ) => {
    let newState
    switch (action.type) {
        case LOAD_PORTFOLIO:
            newState = { ...state, entries: { ...state.entries }, prices: { ...state.prices }, closing: { ...state.closing} }
            action.portfolio.forEach((priceData, i) => newState.entries[i] = priceData)
            return newState
        case LOAD_ASSET_PRICES:
            newState = { ...state, entries: {...state.entries }, prices: { ...state.prices }, closing: { ...state.closing} }
            newState.prices = assetPrices
            return newState
        case LOAD_ASSET_CLOSING_PRICES:
            newState = { ...state, entries: {...state.entries }, prices: { ...state.prices }, closing: { ...state.closing} }
            action.prices.forEach((price, i) => {
                let compId = Object.keys(price)
                newState.closing[compId[0]] = price[compId]
            })
            return newState
        case CLEAR_ALL_PORTFOLIOS:
            return { entries: {}, prices: {}, closing: {}, isLoading: true }
        default:
            return state
    }
}

export default portfolioReducer
