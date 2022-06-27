const LOAD_WATCHLIST = 'watchlist/LOAD'
const POST_WATCHLIST = 'watchlist/POST'

export const loadWatchlist = (watchlists) => {
    return {
        type: LOAD_WATCHLIST,
        watchlists
    }
}

export const postWatchlist = (watchlist) => {
    return {
        type: POST_WATCHLIST,
        watchlist
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
export const postWatchlists = (watchlist) => async (dispatch) => {
    const response = await fetch('/api/watchlists/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ watchlist })
    })
    if (response.ok) {
        const watchlists = await response.json()
        console.log('<<<<<<<<<<<<<< in Post Watchlist Thunk >>>>>>>>>>>>>>>>>>>>', watchlists)
        dispatch(postWatchlist(watchlists))
    }

}

const initialState = { entries: {}, isLoading: true }


const watchlistReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_WATCHLIST:
            newState = { ...state, entries: { ...state.entries } }
            console.log(action, '<<<<< IN ACTION >>>>>')
            action.watchlists.forEach(watchlist => { newState.entries[watchlist.id] = watchlist })
            return newState
        case POST_WATCHLIST:
            if (!state[action.watchlist.id]) {
                const newState = {} = {
                    ...state,
                    [action.watchlist.id]: action.watchlist
                }
                return newState
            }

        default:
            return state
    }
}

export default watchlistReducer
