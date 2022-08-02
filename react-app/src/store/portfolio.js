const LOAD_PORTFOLIO = 'portfolio/loadPortfolio'
const LOAD_ASSET_PRICES = 'portfolio/loadAssetPrices'
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

export const getPortfolio = (current_balance) => async (dispatch) => {
    const response = await fetch('/api/portfolio/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(current_balance)
    })

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

export const clearAllPortFolios = () => async (dispatch) => {
    dispatch(clearPortfolios())
    return {}
}

const initialState = { entries: {}, prices: {}, isLoading: true }

const portfolioReducer = ( state = initialState, action ) => {
    let newState
    switch (action.type) {
        case LOAD_PORTFOLIO:
            newState = { ...state, entries: { ...state.entries }, prices: { ...state.prices } }
            action.portfolio.forEach((priceData, i) => newState.entries[i] = priceData)
            return newState
        case LOAD_ASSET_PRICES:
            newState = { ...state, entries: {...state.entries }, prices: { ...state.prices } }
            newState.prices = assetPrices
            return newState
        case CLEAR_ALL_PORTFOLIOS:
            return { entries: {}, prices: {}, isLoading: true }
        default:
            return state
    }
}

export default portfolioReducer
