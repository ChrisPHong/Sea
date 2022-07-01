const LOAD_TRANSACTIONS = 'transaction/loadTransactions';
const BUY_STOCK = 'transactions/BUY_STOCK';
// const SELL_STOCK = 'transactions/SELL_STOCK';

// get all transactions
export const loadTransactions = (transactions) => {
    return {
        type: LOAD_TRANSACTIONS,
        transactions
    }
}

// post
export const buyStock = (transaction) => ({
    type: BUY_STOCK,
    transaction
})

// // delete
// export const sellStock = (transaction) => ({
//     type: SELL_STOCK,
//     payload: transaction
// })

// thunk - get all transactions
export const getAllTransactions = () => async (dispatch) => {
    const response = await fetch('/api/transactions/')

    const transactions = await response.json()
    // console.log('THUNKKK----', transactions)
    dispatch(loadTransactions(transactions))
}

export const getTransactions = (userId) => async (dispatch) => {
    const response = await fetch('/api/transactions/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId})
    })

    if (response.ok) {
        // console.log('RESPONSEEEEEEEE', response)
        const transactions = await response.json()
        // console.log('storeeeeeee', transactions)
        dispatch(loadTransactions(transactions))
    }
}

// thunk - buy/sell stock ??
export const stockTransaction = (data) => async (dispatch) => {
    const res = await fetch(`/api/transactions/update`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const transactionInfo = await res.json()
        dispatch(buyStock(transactionInfo))
    }
}


const initialState = { entries: {}, isLoading: true }

const transactionReducer = ( state = initialState, action ) => {
    let newState;
    switch (action.type) {
        case LOAD_TRANSACTIONS:
            // console.log('ACTION-----', action.transactions)
            // return {
            //     ...state,
            //     entries: action.transactions
            // }
            newState = { ...state, entries: {...state.entries} }
            action.transactions.forEach(transaction => {newState.entries[transaction.id] = transaction})
            return newState
        case BUY_STOCK:
            console.log('BUY STOCK ACTION-----', action.transaction)
            newState = {
                ...state, entries: {
                    ...state.entries,
                    [action.transaction.id]: action.transaction
                }
            }
            return newState;
        default:
            return state
    }
}

export default transactionReducer
