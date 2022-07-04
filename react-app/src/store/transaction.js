const LOAD_TRANSACTIONS = 'transaction/loadTransactions';
const BUY_STOCK = 'transactions/BUY_STOCK';
const ADD_MONEY = 'transactions/ADD_MONEY'
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
// update Balance
export const updateCurrentBalance = (userBalance) => ({
    type: ADD_MONEY,
    userBalance
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

export const addMoneyToCurrentBalance = (balance) => async (dispatch) => {
    const response = await fetch(`/api/transactions/add`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(balance)
    })
    console.log(response)

    if (response.ok) {
        const balance = await response.json()
        console.log(balance)
        dispatch(updateCurrentBalance(balance))
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
            newState = {
                ...state, entries: {
                    ...state.entries,
                    [action.transaction.id]: action.transaction
                }
            }
            return newState;
        case ADD_MONEY:
            console.log(' <<<<<<<<< WITHIN THE ADD_MONEY REDUCER >>>>', action)
            newState = {
                ...state, [action.id]: action.transaction
            }
            return state
        default:
            return state
    }
}

export default transactionReducer
