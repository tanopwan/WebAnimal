import $ from 'jquery';
import promise from 'es6-promise';
import * as Actions from '../redux/actions'
import { store } from '../redux/store.js'

var Promise = promise.Promise;
var resourceUrl = "http://localhost:3000/api/user/";

// userObject.status
// - NONE : init & or has not asked for permission
// - AUTH : FB is authorized but not log in (fbId, accessToken)
// - LOGGED_IN : FB Graph to get username & Server already verify Token (username, lastLogin)
// - UNAUTH : User not authorized WebAnimal App

let onGetFBLoginStatus = (res, onAuth, onUnAuth, onLogin, showLogin, showWarningModal) => {
    return (dispatch) => {
        if( res.status === "connected" ) {
            //res.authResponse{accessToken: "...", userID: "1199019910116181", expiresIn: 6744, signedRequest: "..."
            var accessToken = res.authResponse.accessToken;
            dispatch(onAuth(res.authResponse.userID, accessToken));

            FB.api('/me', function(response) {
                console.log( "Received FB login status...Logged in - Retrieved FB Profile from /me API: " + JSON.stringify(response) );
                var userObject = {
                    fbId: response.id,
                    username: response.name
                }
                console.log( "Receiving WebAnimal login status..." );
                userLogin(userObject, accessToken).then(function(res) {
                    console.log( "Received WebAnimal login status... - " + JSON.stringify(res) );
                    //res: {code: 0, message: "user.js - updateUserOnLogin success", object: {fbId, username, userId, lastLogin}}
                    if (res.code == 0 && res.object) {
                        // Log in
                        var userId = res.object.userId;
                        var lastLogin = res.object.lastLogin;
                        dispatch(onLogin(Object.assign({}, res.object, {accessToken, userId, lastLogin})));
                    }
                    else {
                        dispatch(Actions.onLogout());
                        dispatch(Actions.setError(res));
                        dispatch(Actions.showWarningModal("Server Error", "ไม่สามารถ Log in กับ server ได้ไม่พบ user ในฐานข้อมูล"));
                    }
                }, function(res) {
                    // {readyState: 4, responseText: "Unauthorized", status: 401, statusText: "Unauthorized"}
                    if (res.status == 401) {
                        // Unauthorized
                        // res {readyState: 4, responseText: "Unauthorized", status: 401, statusText: "Unauthorized"}
                        dispatch(onUnAuth());
                        dispatch(showWarningModal("Unauthorized", "ไม่สามารถ Log in กับ server ได้ AccessToken ไม่ถูกต้อง"));
                    }
                    //{readyState: 4, responseText: "{"code":1001,"message":"Invalid parameters"}", responseJSON: Object, status: 400, statusText: "Bad Request"}
                    else if (res.status == 400) {
                        dispatch(onUnAuth());
                        dispatch(showWarningModal("Unauthorized", "ไม่สามารถ Log in กับ server ได้, " + res.responseText));
                    }
                })
            })
        }
        else if (res.status === 'not_authorized') {
            console.log('User is not authorized to WebAnimal App');
            dispatch(showLogin());
        } else {    // 'unknown'
            console.log('User is not logged into Facebook');
            dispatch(showLogin());
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
        FB.login( function(res) {
            store.dispatch(onGetFBLoginStatus(res, Actions.onAuth, Actions.onUnAuth, Actions.onLogin, Actions.showLogin, Actions.showWarningModal));
        }, {scope: 'email'} );
        // TODO: what to do when failed
    },
    onGetFBLoginStatus,
    userLoginStatus,
	userLogin,
    userLogout,
    updateUser
};
