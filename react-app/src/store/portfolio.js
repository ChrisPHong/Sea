const LOAD_PORTFOLIO = 'portfolio/loadPortfolio'
const LOAD_ASSET_PRICES = 'portfolio/loadAssetPrices'

export const loadPortfolio = (portfolio) => {
    return {
        type: LOAD_PORTFOLIO,
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

export const getPortfolio = (payload) => async (dispatch) => {
    const response = await fetch('/api/portfolio/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const portfolio = await response.json()
        dispatch(loadPortfolio(portfolio))
    }
}

export const getAssetPrices = (company_id) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${company_id}/prices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company_id)
    })

    if (response.ok) {
        const prices = await response.json()
        dispatch(loadAssetPrices(prices))
    }
}

const initialState = { entries: {}, prices: {}, isLoading: true }

const portfolioReducer = ( state = initialState, action ) => {
    let newState
    switch (action.type) {
        case LOAD_PORTFOLIO:
            newState = { ...state, entries: {...state.entries} }
            action.portfolio.forEach((priceData, i) => newState.entries[i] = priceData)
            return newState
        case LOAD_ASSET_PRICES:
            newState = { ...state, entries: { }, prices: { } }
            newState.prices = assetPrices
            return newState
        default:
            return state
    }
}

export default portfolioReducer
