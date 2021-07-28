import rootReducer from './reducers/rootReducer';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(initialState: any) {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}
