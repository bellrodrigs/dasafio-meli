import {createStore, combineReducers} from 'redux'

import cart from './cartReducer'

const combineReducer = combineReducers({
  cart
})

const store = createStore(combineReducer)

export default store;

