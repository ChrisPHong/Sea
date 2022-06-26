const LOAD_TRANSACTION = 'transaction/loadTransaction'

export const loadTransaction = (transaction) => {
    return {
        type: LOAD_TRANSACTION,
        transaction
    }
}

export const getTransaction = () => async (dispatch) => {
    const response = await fetch('/api/get_transactions')

    if (response.ok) {
        const transaction = await response.json()
        dispatch(loadTransaction(transaction))
    }
}
