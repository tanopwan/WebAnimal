import $ from 'jquery';
import promise from 'es6-promise';
import * as Actions from '../redux/actions'

var Promise = promise.Promise;
var resourceUrl = "http://localhost:3000/api/upload/";

module.exports = {
    uploadSingleFile: function(accessToken, userId, file) {
        var formData = new FormData();
        formData.append('userId', userId);
        formData.append('upload-file', file);

        return new Promise(function (resolve, reject) {
        $.ajax({
            url: resourceUrl,
                headers: {
                    "access_token": accessToken
                },
                method: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: resolve,
                error: reject
            });
        });
    }
};
