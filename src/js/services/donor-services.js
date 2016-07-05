import $ from 'jquery';
import promise from 'es6-promise';

var Promise = promise.Promise;

var resourceUrl = "http://localhost:3000/api/donor/";
var Promise = promise.Promise;

const postAjaxUrl = (url, formData, accessToken) => {
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
            success: function(data, textStatus, jqXHR) {
                //console.log(data);
                //console.log(jqXHR);
            },
            error: function(data, textStatus, jqXHR) {
                console.log(data);
                console.log(jqXHR);
                resolve(data);
            },
        });
    });
}

module.exports = {
    addNewDonor: (accessToken, userId, donorName, description, animalType, donorStatus, profilePicture) => {
        if (!accessToken) {
            var response_template = {code: 400, message: "accessToken cannot be empty", action: "[donor-services]addNewDonor", object: {fields: ["accessToken"]}};
            return Promise.resolve(response_template);
        }

        if (!userId) {
            var response_template = {code: 400, message: "userId cannot be empty", action: "[donor-services]addNewDonor", object: {fields: ["userId"]}};
            return Promise.resolve(response_template);
        }

        if (!donorName) {
            var response_template = {code: 400, message: "donorName cannot be empty", action: "[donor-services]addNewDonor", object: {fields: ["donorName"]}};
            return Promise.resolve(response_template);
        }

        var formData = new FormData();
        formData.append('user', userId);
        formData.append('donorName', donorName);
        formData.append('description', description);
        formData.append('animalType', animalType);
        formData.append('donorStatus', donorStatus);
        formData.append('createdDate', new Date());
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);    
        }

        return postAjaxUrl('/api/donor/', formData, accessToken);
    }
}
