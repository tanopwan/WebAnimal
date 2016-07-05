import { combineReducers } from 'redux'
import { SET_ERROR, RESET_ERROR, ON_LOGIN, ErrorTypes } from './actions'
import { SHOW_MODAL, HIDE_MODAL } from './actions'
import { SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL } from './actions'

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

const modal = (state = { hasModal: false, title: "", body: "" }, action) => {
	switch (action.type) {
		case 'SHOW_MODAL':
			return Object.assign({}, state, {
				hasModal: true,
		        title: action.title,
		        body: action.body
		    });
		case 'HIDE_MODAL':
			return Object.assign({}, state, {
				hasModal: false,
				title: "",
				body: ""
			});
		default:
			return state
	}
}

const login = (state = { hasModal: true }, action) => {
	switch (action.type) {
		case 'SHOW_LOGIN_MODAL':
			return Object.assign({}, state, { hasModal: true });
		case 'HIDE_LOGIN_MODAL':
			return Object.assign({}, state, { hasModal: false });
		default:
			return state
	}
}

const webAnimalApp = combineReducers({
 	errorObject: combineReducers({
 		mainError,
 		formError
 	}),
 	modal,
 	login,
 	userObject
})

export default webAnimalApp