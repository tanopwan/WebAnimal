import $ from 'jquery';
import promise from 'es6-promise';

var Promise = promise.Promise;

var resourceUrl = "http://localhost:3000/api/user/";
var Promise = promise.Promise;

module.exports = {
    facebookLogin: function() {
        FB.login(); // Already subscribe in FacebookController.jsx
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