import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import webAnimalApp from './reducers'

// Singleton instance
export let store = createStore(webAnimalApp, applyMiddleware(thunk));
