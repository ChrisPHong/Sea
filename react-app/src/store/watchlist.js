const LOAD_WATCHLIST = 'watchlist/LOAD'
const POST_WATCHLIST = 'watchlist/POST'
const DELETE_WATCHLIST = 'watchlist/DELETE'

export const loadWatchlist = (watchlists) => {
    return {
        type: LOAD_WATCHLIST,
        watchlists
    }
}

export const postList = (watchlist) => {
    return {
        type: POST_WATCHLIST,
        watchlist
    }
}

export const deleteList = (watchlistId) => {
    return {
        type: DELETE_WATCHLIST,
        watchlistId
    }
}


export const getWatchlists = () => async (dispatch) => {
    const response = await fetch('/api/watchlists/', {
        method: 'GET',
    })
    if (response.ok) {
        const watchlists = await response.json()
        dispatch(loadWatchlist(watchlists))
    }

}
export const postWatchlists = (payload) => async (dispatch) => {
    const response = await fetch('/api/watchlists/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const watchlists = await response.json()
        dispatch(postList(watchlists))
    }

}

export const deleteWatchList = (watchlistId) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${watchlistId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteList(watchlistId));

        return data
    }
}

const initialState = { entries: {}, isLoading: true }


const watchlistReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_WATCHLIST:
            newState = { ...state, entries: { ...state.entries } }
            action.watchlists.forEach(watchlist => { newState.entries[watchlist.id] = watchlist })
            return newState
        case POST_WATCHLIST:

            newState = {
                ...state, entries: {
                    ...state.entries,
                    [action.watchlist.id]: action.watchlist
                }
            }
            return newState

        case DELETE_WATCHLIST:

            newState = {...state}
            delete newState.entries[action.watchlistId]
            return newState


        default:
            return state
    }
}

export default watchlistReducer
