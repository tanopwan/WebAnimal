import $ from 'jquery';
import promise from 'es6-promise';

var Promise = promise.Promise;

var resourceUrl = "http://localhost:3000/api/case/";
var Promise = promise.Promise;

function postAjaxUrl (url, formData) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            data: formData,
            contentType: false,
            processData: false,
            type: "POST",
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
                //console.log(data);
                //console.log(jqXHR);
            },
            error: function(data, textStatus, jqXHR) {
                console.log(data);
                console.log(jqXHR);
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
            $.ajax({
                url: urlParams,
                method: "GET",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
	},

    getCase: function(case_id) {
        var urlParams = resourceUrl + case_id;

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: urlParams,
                method: "GET",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
    },

    saveNewCase: function(formTarget, userId) {
        var result = postCase(formTarget, userId);
        if (result.formData) {
            console.log("result.formData");
            return postAjaxUrl ('/api/case/addNewCase', result.formData);
        }
        return result;
    },

    updateCase: function(formTarget, userId, case_id) {
        var result = postCase(formTarget, userId);
        result.formData.append('case_id', case_id);
        return postAjaxUrl ('/api/case/updateCase', result.formData);
    },

    addComment: (comment, comment_picture, userId, caseId) => {
        var formData = new FormData();
        formData.append('user', userId);
        formData.append('case', caseId);
        formData.append('createdDate', new Date());
        formData.append('comment', comment);
        formData.append('comment_picture', comment_picture);
        return postAjaxUrl('/api/case/comment', formData);
        
    }
};