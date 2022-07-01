import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import transactionReducer from './transaction';
import stockReducer from './stock';
import watchlistReducer from './watchlist';
import searchReducer from './searchbar';
import newsReducer from './news';
import portfolioReducer from './portfolio';

const rootReducer = combineReducers({
  session,
  transaction: transactionReducer,
  stock: stockReducer,
  watchlist: watchlistReducer,
  search: searchReducer,
  news: newsReducer,
  portfolio: portfolioReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
