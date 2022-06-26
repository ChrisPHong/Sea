const LOAD_TRANSACTIONS = 'transaction/loadTransactions'

export const loadTransactions = (transactions) => {
    return {
        type: LOAD_TRANSACTIONS,
        transactions
    }
}

export const getTransactions = () => async (dispatch) => {
    const response = await fetch('/api/get_transactions')

    if (response.ok) {
        const transaction = await response.json()
        dispatch(loadTransactions(transaction))
    }
}

const initialState = { entries: {}, isLoading: true }

const transactionReducer = ( state = initialState, action ) => {
    let newState = {}
    switch (action.type) {
        case LOAD_TRANSACTIONS:
            newState = { ...state, entries: {...state.entries} }
            action.transactions.forEach(transaction => (newState.entries[transaction.id] = transaction))
            return newState

        default:
            return state
    }
}

export default transactionReducer
