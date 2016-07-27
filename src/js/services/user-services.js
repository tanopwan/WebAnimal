import $ from 'jquery';
import promise from 'es6-promise';
import * as Actions from '../redux/actions'

var Promise = promise.Promise;
var resourceUrl = "http://localhost:3000/api/user/";

// userObject.status
// - NONE : init & or has not asked for permission
// - AUTH : FB is authorized but not log in (fbId, accessToken)
// - LOGGED_IN : FB Graph to get username & Server already verify Token (username, lastLogin)
// - UNAUTH : User not authorized WebAnimal App

const userLogin = (jsonData, accessToken) => {
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

module.exports = {
    // To Login and Authorized App with Facebook
    facebookLogin: function(dispatch) {
        FB.login( function(res) {
            console.log("user-services.js - FB.login()");
            if( res.status === "connected" ) {

                var accessToken = res.authResponse.accessToken;
                FB.api('/me', function(response) {
                    console.log( "Retrieved FB Profile from /me API: " + JSON.stringify(response) );
                    var userObject = {
                        fbId: response.id,
                        username: response.name
                    }
                    userLogin(userObject, accessToken).then(function(res) {
                        if (res.code == 0) {
                            var user = Object.assign(res.object, {accessToken: accessToken})
                            dispatch(Actions.onLogin(user));
                        }
                        else {
                            dispatch(Actions.onLogout());
                            dispatch(Actions.setError(res));
                            dispatch(Actions.showWarningModal("Server Error", "ไม่สามารถ Log in กับ server ได้ไม่พบ user ในฐานข้อมูล"));
                        }
                    }, function(res) {
                        if (res.status == 401) {
                            // Unauthorized
                            // res {readyState: 4, responseText: "Unauthorized", status: 401, statusText: "Unauthorized"}
                            dispatch(Actions.onUnAuth());
                            dispatch(Actions.showWarningModal("Unauthorized", "ไม่สามารถ Log in กับ server ได้ AccessToken ไม่ถูกต้อง"));
                        }
                    })
                })
            }
            else if (res.status === 'not_authorized') {
                console.log('User is not authorized to WebAnimal App');
                dispatch(Actions.showLogin());
            } else {
                console.log('User is not logged into Facebook');
                dispatch(Actions.showLogin());
            }
        }, {scope: 'email'} ); // Already subscribe in FacebookController.jsx
        // TODO: what to do when failed
    },
    userLoginStatus: function(jsonData, accessToken) {
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
    },
	userLogin,
    userLogout: function(jsonData, accessToken) {
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
    },
    updateUser: function(jsonData, accessToken) {
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
};