import $ from 'jquery';
import promise from 'es6-promise';

var Promise = promise.Promise;

var resourceUrl = "http://localhost:3000/api/user/";

module.exports = {
	addUser: function(jsonData) {

		var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl,
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