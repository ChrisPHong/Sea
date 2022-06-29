// const LOAD_TRANSACTIONS = 'transaction/loadTransactions'

// export const loadTransactions = (transactions) => {
//     return {
//         type: LOAD_TRANSACTIONS,
//         transactions
//     }
// }

// export const getTransactions = (userId) => async (dispatch) => {
//     const response = await fetch('/api/transactions/', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({userId})
//     })

//     if (response.ok) {
//         const transactions = await response.json()
//         dispatch(loadTransactions(transactions))
//     }
// }

// const initialState = { entries: {}, isLoading: true }

// const transactionReducer = ( state = initialState, action ) => {
//     let newState
//     switch (action.type) {
//         case LOAD_TRANSACTIONS:
//             newState = { ...state, entries: {...state.entries} }
//             action.transactions.forEach(transaction => {newState.entries[transaction.id] = transaction})
//             return newState

//         default:
//             return state
//     }
// }

// export default transactionReducer
