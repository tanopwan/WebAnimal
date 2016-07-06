import $ from 'jquery';
import promise from 'es6-promise';

var Promise = promise.Promise;

var resourceUrl = "http://localhost:3000/api/user/";
var Promise = promise.Promise;

// userObject.status
// - NONE : init
// - LOGGED_OUT : FB is authorized but not log in
// - LOGGED_IN : Server already verify Token
// - UNAUTH : User not authorized WebAnimal App

module.exports = {
    // To Login and Authorized App with Facebook
    facebookLogin: function() {
        FB.login( function(res) {
            
        }, {scope: 'email'} ); // Already subscribe in FacebookController.jsx
        // TODO: what to do when failed
    },
	userLogin: function(jsonData, accessToken) {
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
	},
    saveUser: function(jsonData) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl ,
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