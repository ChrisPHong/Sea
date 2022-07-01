const LOAD_PORTFOLIO = 'portfolio/loadPortfolio'

export const loadPortfolio = (portfolio) => {
    return {
        type: LOAD_PORTFOLIO,
        portfolio
    }
}

export const getPortfolio = (userId) => async (dispatch) => {
    const response = await fetch('/api/portfolio/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userId)
    })

    if (response.ok) {
        const portfolio = await response.json()
        dispatch(loadPortfolio(portfolio))
    }
}

const initialState = { entries: {}, isLoading: true }

const portfolioReducer = ( state = initialState, action ) => {
    let newState
    switch (action.type) {
        case LOAD_PORTFOLIO:
            newState = { ...state, entries: {...state.entries} }
            action.portfolio.forEach((priceData, i) => newState.entries[i] = priceData)
            return newState
        default:
            return state
    }
}

export default portfolioReducer
