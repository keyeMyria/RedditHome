import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer, initialState } from '../reducers';

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;