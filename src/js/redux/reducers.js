import { combineReducers } from 'redux'
import { SET_ERROR, RESET_ERROR, ON_LOGIN, ErrorTypes } from './actions'

const mainError = (state = {hasError: false, message: {}}, action) => {
	//console.log("update state mainError");
	if (action.type === SET_ERROR) {
	    switch(action.sub_type) {
	        case ErrorTypes.ERR_MAIN :
	            return Object.assign({}, state, { hasError: true, message: action.error });
	        default:
	            return state;
	    }
	}
	else if (action.type === RESET_ERROR) {
		switch(action.sub_type) {
			case ErrorTypes.ERR_MAIN :
				return Object.assign({}, state, { hasError: false, message: {} });
			default:
				return state;
		}
	}
	return state;
}

const formError = (state = {message: {}}, action) => {
	if (action.type === SET_ERROR) {
		switch(action.sub_type) {
			case ErrorTypes.ERR_FORM_INVALID :
				return Object.assign({}, state, { message: action.error });
			default:
				return state;
		}
	}
	else if  (action.type === RESET_ERROR) {
		switch(action.sub_type) {
			case ErrorTypes.ERR_FORM_INVALID :
				return Object.assign({}, state, { message: {} });
			default:
				return state;
		}
	}
	return state;
}

const userObject = (state = {}, action) => {
	switch(action.type) {
		case ON_LOGIN :
			return Object.assign({}, state, action.user);
		default:
			return state;
	}
}

const webAnimalApp = combineReducers({
 	errorObject: combineReducers({
 		mainError,
 		formError
 	}),
 	userObject
})

export default webAnimalApp