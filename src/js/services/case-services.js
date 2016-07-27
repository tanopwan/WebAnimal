import $ from 'jquery';
import promise from 'es6-promise';

var resourceUrl = "http://localhost:3000/api/case/";
var Promise = promise.Promise;

function postAjaxUrl (url, formData, accessToken) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            headers: {
                "access_token": accessToken
            },
            data: formData,
            contentType: false,
            processData: false,
            type: "POST",
            dataType: "json",
            success: resolve,
            error: function(data, textStatus, jqXHR) {
                console.log(data);
                console.log(jqXHR);
                resolve(data);
            },
        });
    });
}

function postCase (formTarget, userId) {
    var formData = new FormData();
    formData.append('userId', userId);
    formData.append('createdDate', new Date());
    for(var i=0; i < formTarget.length; i++){
        var element = formTarget[i];
        if (element.type != "submit") {
            if (element.type == "file") {
                //console.log("Append " + element.name + "=" + element.value);
                if (element.files && element.files.length == 1) {
                    formData.append(element.name, element.files[0]);
                    console.log("value: " + element.value);
                    console.log(element.files[0]);
                }
            }
            else if (element.type == "text" || element.type == "select-one" || element.type == "textarea") {
                //console.log("Append " + element.name + "=" + element.value);
                if (element.name == "caseName" && element.value == "") {
                    var response_template = {code: 400, message: "caseName cannot be empty", action: "case-services", object: {}};
                    return Promise.resolve(response_template);
                }
                else if (element.name == "comment" && element.value == "") {
                    var response_template = {code: 400, message: "comment cannot be empty", action: "case-services", object: {fields: ["comment"]}};
                    return Promise.resolve(response_template);
                }

                formData.append(element.name, element.value);
            }
            else {
                console.log("Warning: case-services.js[saveNewCase] unhandle element type! [" + element.type + "]");
            }
        }
    }
    return {formData: formData};
}

module.exports = {
	getCases: function(filters) {
        console.log('case-services.js - getCases');
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
    updateCase: (accessToken, caseId, caseName, description, animalType, caseStatus, caseDate, profilePicture) => {
        if (!accessToken) {
            var response_template = {code: 400, message: "accessToken cannot be empty", action: "[case-services]updateCase", object: {fields: ["accessToken"]}};
            return Promise.resolve(response_template);
        }

        if (!caseId) {
            var response_template = {code: 400, message: "caseId cannot be empty", action: "[case-services]updateCase", object: {fields: ["caseId"]}};
            return Promise.resolve(response_template);
        }

        if (!caseName) {
            var response_template = {code: 400, message: "caseName cannot be empty", action: "[case-services]updateCase", object: {fields: ["caseName"]}};
            return Promise.resolve(response_template);
        }

        var formData = new FormData();
        formData.append('case_id', caseId);
        formData.append('caseName', caseName);
        formData.append('description', description);
        formData.append('animalType', animalType);
        formData.append('caseStatus', caseStatus);
        formData.append('caseDate', caseDate);
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }
        return null;
    },

    addComment: (comment, comment_picture, userId, caseId) => {
        if (!comment) {
            var response_template = {code: 400, message: "comment cannot be empty", action: "[case-services]addComment", object: {fields: ["comment"]}};
            return Promise.resolve(response_template);
        }

        if (!userId) {
            var response_template = {code: 400, message: "userId cannot be empty", action: "[case-services]addComment", object: {fields: ["userId"]}};
            return Promise.resolve(response_template);
        }

        if (!caseId) {
            var response_template = {code: 400, message: "caseId cannot be empty", action: "[case-services]addComment", object: {fields: ["caseId"]}};
            return Promise.resolve(response_template);
        }

        var formData = new FormData();
        formData.append('user', userId);
        formData.append('case', caseId);
        formData.append('createdDate', new Date());
        formData.append('comment', comment);
        if (comment_picture) {
            formData.append('comment_picture', comment_picture);
        }
        return postAjaxUrl('/api/case/comment', formData);

    }
};
