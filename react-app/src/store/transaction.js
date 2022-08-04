const LOAD_TRANSACTIONS = 'transaction/loadTransactions';
const BUY_STOCK = 'transactions/BUY_STOCK';
const LOAD_BOUGHT_TRANSACTIONS = 'transaction/loadBoughtTransactions'
const ADD_MONEY = 'transactions/ADD_MONEY'
const CLEAR_ALL_TRANSACTIONS = 'transactions/CLEAR_ALL_TRANSACTIONS'
const EDIT_TRANSACTION = 'transactions/EDIT_TRANSACTION'

// get all transactions
export const loadTransactions = (transactions) => {
    return {
        type: LOAD_TRANSACTIONS,
        transactions
    }
}

export const editTransaction = (transaction) => {
    return {
        type: EDIT_TRANSACTION,
        transaction
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

export const loadBoughtTransactions = (transactions) => {
    return {
        type: LOAD_BOUGHT_TRANSACTIONS,
        transactions
    }
}

export const clearTransactions = (transactions) => {
    return {
        type: CLEAR_ALL_TRANSACTIONS,
        transactions
    }
}
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

export const getBoughtTransactions = (userId) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${userId}/bought_transactions`)
    const transactions = await response.json()
    dispatch(loadBoughtTransactions(transactions))
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

export const updateTransaction = (payload) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${payload.company_id}/update`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const transaction = await response.json()
        dispatch(editTransaction(transaction))
    }
}


// thunk - buy/sell stock ??
export const stockTransaction = (data) => async (dispatch) => {
    const res = await fetch(`/api/transactions/post`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    if(!res.ok){
        const error = await res.json()
        return error
    }
    if (res.ok) {
        const transactionInfo = await res.json()
        dispatch(buyStock(transactionInfo))
    }
}

export const addMoneyToCurrentBalance = (balance) => async (dispatch) => {
    const response = await fetch(`/api/transactions/add`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(balance)
    })
    // console.log(response)

    if (response.ok) {
        const balance = await response.json()
        // console.log(balance)
        dispatch(updateCurrentBalance(balance))
    }
}
export const clearAllTransactions = () => async (dispatch) => {
    dispatch(clearTransactions())
    return {}
}

const initialState = { entries: {}, boughtTrans: {}, isLoading: true }

const transactionReducer = ( state = initialState, action ) => {
    let newState;
    switch (action.type) {
        case LOAD_TRANSACTIONS:
            newState = { ...state, entries: {...state.entries} }
            action.transactions.forEach(transaction => {newState.entries[transaction.id] = transaction})
            return newState
        case LOAD_BOUGHT_TRANSACTIONS:
            newState = { ...state, entries: { ...state.entries }, boughtTrans: { } }
            newState.boughtTrans = action.transactions
            return newState
        case BUY_STOCK:
            newState = {...state, entries: {...state.entries }, boughtTrans: { ...state.boughtTrans } }
            newState.boughtTrans[action.transaction.id] = action.transaction
            return newState;
        case EDIT_TRANSACTION:
            newState = { ...state, entries: { ...state.entries }, boughtTrans: { ...state.boughtTrans } }
            newState.boughtTrans[action.transaction.id] = action.transaction
            return newState
        case ADD_MONEY:
            newState = {
                ...state, [action.userBalance.user.id]: action.transaction
            }
            return state
        case CLEAR_ALL_TRANSACTIONS:
            return { entries: {}, boughtTrans: {}, isLoading: true }
        default:
            return state
    }
}

export default transactionReducer
