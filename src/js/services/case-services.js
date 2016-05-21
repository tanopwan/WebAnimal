import $ from 'jquery';
import promise from 'es6-promise';

var Promise = promise.Promise;

var resourceUrl = "http://localhost:3000/api/case/";
var Promise = promise.Promise;

module.exports = {
	getCases: function(filters) {
        var animalTypes = filters.animalTypes;
        var animalTypesParam = "?";
        var urlParams = resourceUrl;
        if (animalTypes) {
            animalTypes.map(function(animalType) {
                if (animalTypesParam != "?") {
                    animalTypesParam = animalTypesParam + "&";
                }
                animalTypesParam = animalTypesParam + "animal_types=" + animalType;
            });
            urlParams = urlParams + animalTypesParam;
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
    }
};