import { combineReducers } from 'redux'
import { ErrorTypes } from './actions'

const mainError = (state = {hasError: false, message: {}}, action) => {
	//console.log("update state mainError");
	if (action.type === 'SET_ERROR') {
	    switch(action.sub_type) {
	        case ErrorTypes.ERR_MAIN :
	            return Object.assign({}, state, { hasError: true, message: action.error });
	        default:
	            return state;
	    }
	}
	else if (action.type === 'RESET_ERROR') {
		switch(action.sub_type) {
			case ErrorTypes.ERR_MAIN :
				return Object.assign({}, state, { hasError: false, message: {} });
			default:
				return state;
		}
	}
	return state;
}

const formError = (state = {}, action) => {
	if (action.type === 'SET_ERROR') {
		switch(action.sub_type) {
			case ErrorTypes.ERR_FORM_INVALID :
				return Object.assign({}, state, {[action.error.field]: action.error.message});
			default:
				return state;
		}
	}
	else if  (action.type === 'RESET_ERROR') {
		switch(action.sub_type) {
			case ErrorTypes.ERR_FORM_INVALID :
				return {};
			default:
				return state;
		}
	}
	return state;
}

const userObject = (state = {status: 'NONE'}, action) => {
	switch(action.type) {
		case 'ON_LOGIN' :
			return Object.assign({}, state, action.user, { status: 'LOGGED_IN' });
		case 'ON_LOGOUT' :
			return Object.assign({}, { fbId: state.fbId, username: state.username, accessToken: state.accessToken }, { status: 'LOGGED_OUT' });
		case 'ON_UNAUTH' :
			return Object.assign({}, { status: 'UNAUTH' });
		case 'ON_AUTH' :
			return Object.assign({}, { fbId: action.fbId, username: action.username, accessToken: action.accessToken }, { status: 'AUTH' });
		case 'ON_UPDATE_USER' :
			return Object.assign({}, state, action.user );
		default:
			return state;
	}
}

const modal = (state = { hasModal: false, title: "", body: "", imagePath: "" }, action) => {
	switch (action.type) {
		case 'SHOW_MODAL':
			return Object.assign({}, state, {
				hasModal: true,
		        title: action.title,
		        body: action.body,
		        style: action.style
		    });
		case 'SHOW_MODAL_IMAGE':
			return Object.assign({}, state, {
				hasModal: true,
		        title: action.title,
		        imagePath: action.imagePath,
		        style: action.style
		    });
		case 'HIDE_MODAL':
			return Object.assign({}, state, {
				hasModal: false,
				title: "",
				body: "",
				imagePath: "",
				style: ""
			});
		default:
			return state
	}
}

const login = (state = { hasModal: false }, action) => {
	switch (action.type) {
		case 'SHOW_LOGIN_MODAL':
			return Object.assign({}, state, { hasModal: true });
		case 'HIDE_LOGIN_MODAL':
			return Object.assign({}, state, { hasModal: false });
		default:
			return state
	}
}

const host = (state = 'http://localhost:3000', action) => {
	return state;
}

const action = (state = {view: {}, comments: []}, action) => {
	switch (action.type) {
		case 'ON_VIEW_CASE':
			return Object.assign({}, state, { view: action.caseObject } );
		case 'ON_VIEW_COMMENT':
			return Object.assign({}, state, { comments: action.objects } );
		default:
			return state
	}
}

const webAnimalApp = combineReducers({
	host,
	action,
 	modal,
 	login,
 	userObject,
 	errorObject: combineReducers({
 		mainError,
 		formError
 	})
})

export default webAnimalApp
