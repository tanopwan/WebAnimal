import $ from 'jquery';
import promise from 'es6-promise';
import * as Actions from '../redux/actions'
import { store } from '../redux/store.js'
import { fbModule } from 'facebook-module-es6';

var Promise = promise.Promise;
var resourceUrl = "http://localhost:3000/api/user/";

// userObject.status
// - NONE : init & or has not asked for permission
// - AUTH : FB is authorized but not log in (fbId, accessToken)
// - LOGGED_IN : FB Graph to get username & Server already verify Token (username, lastLogin)
// - UNAUTH : User not authorized WebAnimal App or not login to FB

let doServerLogin = () => {
    return (dispatch, getState) => {
        let userObject = {
            fbId: getState().userObject.fbId,
            username: getState().userObject.username,
        }
        userLogin(userObject, getState().userObject.accessToken).then(function(res) {
            console.log( "doServerLogin - Received WebAnimal login status... - " + JSON.stringify(res) );
            //res: {code: 0, message: "user.js - updateUserOnLogin success", object: {fbId, username, userId, lastLogin}}
            if (res.code == 0 && res.object) {
                // Log in
                var userId = res.object.userId;
                var lastLogin = res.object.lastLogin;
                dispatch(Actions.onLogin(res.object));
            }
            else {
                dispatch(Actions.onLogout());
                dispatch(Actions.setError(res));
                dispatch(Actions.showWarningModal("Server Error", "ไม่สามารถ Log in กับ server ได้"));
            }
        }, function(res) {
            if (res.status == 401) {
                // {readyState: 4, responseText: "Unauthorized", status: 401, statusText: "Unauthorized"}
                dispatch(Actions.onUnAuth());
                dispatch(Actions.showWarningModal("Unauthorized", "ไม่สามารถ Log in กับ server ได้ AccessToken ไม่ถูกต้อง"));
            }
            else if (res.status == 400) {
                //{readyState: 4, responseText: "{"code":1001,"message":"Invalid parameters"}", responseJSON: Object, status: 400, statusText: "Bad Request"}
                dispatch(Actions.onUnAuth());
                dispatch(Actions.showWarningModal("Unauthorized", "ไม่สามารถ Log in กับ server ได้, " + res.responseText));
            }
            else {
                // 500
                dispatch(Actions.setError(res));
                dispatch(Actions.showWarningModal("Unauthorized", res));
            }
        });
    }
}

let checkLoginStatus = () => {
    return (dispatch, getState) => {
        let userObject = {
            fbId: getState().userObject.fbId,
            username: getState().userObject.username,
        }
        userLoginStatus(userObject, getState().userObject.accessToken).then(function(res) {
            console.log( "checkLoginStatus - Received WebAnimal login status... - " + JSON.stringify(res) );
            //res: {code: 0, message: "user.js - updateUserOnLogin success", object: {fbId, username, userId, lastLogin}}
            if (res.code == 0 && res.object) {
                // Log in
                var userId = res.object.userId;
                var lastLogin = res.object.lastLogin;
                dispatch(Actions.onLogin(res.object));
            }
            else {
                // Not Log in
                dispatch(Actions.onLogout());
            }
        }, function(res) {
            if (res.status == 401) {
                // {readyState: 4, responseText: "Unauthorized", status: 401, statusText: "Unauthorized"}
                dispatch(Actions.onUnAuth());
                dispatch(Actions.showWarningModal("Unauthorized", "ไม่สามารถ Log in กับ server ได้ AccessToken ไม่ถูกต้อง"));
            }
            else if (res.status == 400) {
                //{readyState: 4, responseText: "{"code":1001,"message":"Invalid parameters"}", responseJSON: Object, status: 400, statusText: "Bad Request"}
                dispatch(Actions.onUnAuth());
                dispatch(Actions.showWarningModal("Unauthorized", "ไม่สามารถ Log in กับ server ได้, " + res.responseText));
            }
            else {
                // 500
                dispatch(Actions.setError(res));
                dispatch(Actions.showWarningModal("Unauthorized", res));
            }
        });
    }
}

let onGetFBLoginStatus = (res, onFBAuthSuccess) => {
    return (dispatch) => {
        if( res.status === "connected" ) {
            //res.authResponse{accessToken: "...", userID: "1199019910116181", expiresIn: 6744, signedRequest: "..."
            let accessToken = res.authResponse.accessToken;
            FB.api('/me', function(response) {
                console.log( "Received FB login status...Logged in - Retrieved FB Profile from /me API: " + JSON.stringify(response) );
                dispatch(Actions.onAuth(res.authResponse.userID, accessToken, response.name));
                dispatch(onFBAuthSuccess());
            })
        }
        else if (res.status === 'not_authorized') {
            console.log('User is not authorized our WebAnimal App');
            dispatch(Actions.onUnAuth());
            dispatch(Actions.showLogin());
        } else {    // 'unknown'
            console.log('User is not logged into Facebook');
            dispatch(Actions.onUnAuth());
            dispatch(Actions.showLogin());
        }
    }
}

let userLoginStatus = function(jsonData, accessToken) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: resourceUrl + "login/status",
            headers: {
                "access_token": accessToken
            },
            data: JSON.stringify(jsonData),
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            success: resolve,
            error: reject
        });
    });
}

let userLogin = (jsonData, accessToken) => {
    return new Promise(function (resolve, reject) {
        $.ajax({
        url: resourceUrl + "login",
            headers: {
                "access_token": accessToken
            },
            data: JSON.stringify(jsonData),
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            success: resolve,
            error: reject
        });
    });
}

let updateUser = function(jsonData, accessToken) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: resourceUrl + "update",
            headers: {
                "access_token": accessToken
            },
            data: JSON.stringify(jsonData),
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            success: resolve,
            error: reject
        });
    });
}

let userLogout = function(jsonData, accessToken) {
    return new Promise(function (resolve, reject) {
        console.log("user-services.js - userLogout");
        $.ajax({
            url: resourceUrl + "logout",
            headers: {
                "access_token": accessToken
            },
            data: JSON.stringify(jsonData),
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            success: resolve,
            error: reject
        });
    });
}

module.exports = {
    facebookLogin: function(dispatch) {
        return (dispatch, getState) => {
            if (getState().userObject.accessToken != null) {
                dispatch(doServerLogin());
            }
            else {
                fbModule.login( function(res) {
                    store.dispatch(onGetFBLoginStatus(res, doServerLogin));
                }, {scope: 'email'} );
                // TODO: what to do when failed
            }
        }
    },
    onGetFBLoginStatus,
    doServerLogin,
    checkLoginStatus,
    userLoginStatus,
	userLogin,
    userLogout,
    updateUser
};
