import { legacy_createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
