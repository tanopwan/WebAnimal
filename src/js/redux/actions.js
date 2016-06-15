/*
 * action types
 */

export const SET_ERROR = 'SET_ERROR'
export const RESET_ERROR = 'RESET_ERROR'
export const ON_LOGIN = 'ON_LOGIN'

/*
 * other constants
 */

export const ErrorTypes = {
	ERR_MAIN: 'ERR_MAIN',
	ERR_FORM_INVALID: 'ERR_FORM_INVALID'
}


/*
 * action creators
 */

export const setError = (type, error) => {
 	return { type: SET_ERROR, sub_type: type, error }
}

export const resetError = (type) => {
 	return { type: RESET_ERROR, sub_type: type }
}

export const onLogin = (user) => {
	return { type: ON_LOGIN, user }
}

