import $ from 'jquery';
import promise from 'es6-promise';

var resourceUrl = "http://localhost:3000/api/case/";
var Promise = promise.Promise;

module.exports = {
	getCases: function(filters) {
        var urlParams = resourceUrl;
        if (filters) {
            var animalTypes = filters.animalTypes;
            if (animalTypes) {
                var animalTypesParam = "?";
                animalTypes.map(function(animalType) {
                    if (animalTypesParam != "?") {
                        animalTypesParam = animalTypesParam + "&";
                    }
                    animalTypesParam = animalTypesParam + "animal_types=" + animalType;
                });
                urlParams = urlParams + animalTypesParam;
            }
        }

        return new Promise(function (resolve, reject) {
            if (typeof(window) != 'undefined') {
                $.ajax({
                    url: urlParams,
                    method: "GET",
                    dataType: "json",
                    success: resolve,
                    error: reject
                });
            }
            else {
                // If it is server side rendering, it will not have window object.
                // This will prevent the error in console - Tanopwan
                resolve();
            }
        });
	},

    getCase: function(case_id) {
        var urlParams = resourceUrl + case_id;

        return new Promise(function (resolve, reject) {
            if (typeof(window) != 'undefined') {
                $.ajax({
                    url: urlParams,
                    method: "GET",
                    dataType: "json",
                    success: resolve,
                    error: reject
                });
            }
            else {
                // If it is server side rendering, it will not have window object.
                // This will prevent the error in console - Tanopwan
                resolve();
            }
        });
    },

    getComments: (caseId, limit) => {

        var urlParams = resourceUrl + caseId + '/comment?limit=' + limit;

        return new Promise(function (resolve, reject) {
            if (typeof(window) != 'undefined') {
                $.ajax({
                    url: urlParams,
                    method: "GET",
                    dataType: "json",
                    success: resolve,
                    error: reject
                });
            }
            else {
                // If it is server side rendering, it will not have window object.
                // This will prevent the error in console - Tanopwan
                resolve();
            }
        });
    },

    createCase: (accessToken, userId, caseName, description, animalType, animalName, imagePath) => {
        var jsonData = {
            userId, caseName, description, animalType, animalName, imagePath
        }

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl,
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
    addComment: (accessToken, userId, caseId, comment, uploadId) => {

        var jsonData = {
            userId, caseId, comment, uploadId
        }

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl + "comment",
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
