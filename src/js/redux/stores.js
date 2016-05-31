import { createStore } from 'redux'
import webAnimalApp from './reducers'

export let store = createStore(webAnimalApp);

