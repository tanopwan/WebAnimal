/*
 * action types
 */

export const SET_ERROR = 'SET_ERROR'
export const RESET_ERROR = 'RESET_ERROR'
export const SHOW_MODAL = 'SHOW_MODAL'
export const SHOW_MODAL_IMAGE = 'SHOW_MODAL_IMAGE'
export const HIDE_MODAL = 'HIDE_MODAL'
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL'
export const HIDE_LOGIN_MODAL = 'HIDE_LOGIN_MODAL'
export const ON_LOGIN = 'ON_LOGIN'
export const ON_LOGOUT = 'ON_LOGOUT'
export const ON_UNAUTH = 'ON_UNAUTH'
export const ON_AUTH = 'ON_AUTH'
export const ON_UPDATE_USER = 'ON_UPDATE_USER'
export const VIEW_CASE = 'VIEW_CASE'
export const ON_VIEW_CASE = 'ON_VIEW_CASE'
export const ON_VIEW_COMMENT = 'ON_VIEW_COMMENT'

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

export const setFormError = (field, message) => {
	return { type: SET_ERROR, sub_type: ErrorTypes.ERR_FORM_INVALID, error: {field, message} }
}
export const setError = (type, error) => {
 	return { type: SET_ERROR, sub_type: type, error }
}

export const showWarningModal = (title, body) => {
	return { type: SHOW_MODAL, title, body, style: "warning"}
}

export const showSuccessModal = (title, body) => {
	return { type: SHOW_MODAL, title, body, style: "success"}
}

export const showPictureModal = (title, imagePath) => {
	return { type: SHOW_MODAL_IMAGE, title, imagePath, style: "info"}
}

export const hideModal = () => {
	return { type: HIDE_MODAL }
}

export const showLogin = (title, body) => {
	return { type: SHOW_LOGIN_MODAL, title, body}
}

export const hideLogin = () => {
	return { type: HIDE_LOGIN_MODAL }
}

export const resetError = (type) => {
 	return { type: RESET_ERROR, sub_type: type }
}

export const onLogin = (user) => {
	return { type: ON_LOGIN, user }
}

export const onLogout = () => {
	return { type: ON_LOGOUT }
}

export const onAuth = (fbId, accessToken, username) => {
	return { type: ON_AUTH, fbId, accessToken, username }
}

export const onUnAuth = () => {
	return { type: ON_UNAUTH }
}

export const onUpdateUser = (user) => {
	return { type: ON_UPDATE_USER, user }
}

export const viewCase = (caseId) => {
	return { type: VIEW_CASE, caseId }
}

export const onViewCase = (caseObject) => {
	return { type: ON_VIEW_CASE, caseObject }
}

export const onViewComment = (objects) => {
	return { type: ON_VIEW_COMMENT, objects }
}
