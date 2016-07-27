import conn from './mysql.js'
import shortid from 'shortid'
import promise from 'es6-promise';

const query = (queryString) => {
	return new Promise(function (resolve, reject) {
		conn.query(queryString, function(err, result){
			if(err)
				return reject(err);

			return resolve(result);
		});
	});
}

const Case = {
	getCases: (limit) => {
		var queryString = "SELECT * FROM webanimal.Case limit " + limit;
		return query(queryString);
	},
	getCase: (caseId) => {
		var queryString = "SELECT * FROM webanimal.Case where caseId='" + caseId + "'";
		return query(queryString);
	},
	createCase: (userId, caseName, description, animalType, animalName, imagePath) => {
		var caseId = shortid.generate();
		//INSERT INTO `webanimal`.`Case` (`caseId`, `userId`, `lock`, `caseName`, `imagePath`, `description`, `animalType`, `animalName`) VALUES ('111', 'rkrn0-0D', '0', 'a', 'b', 'c', 'd', 'e');
		var queryString = "INSERT INTO webanimal.Case (caseId, userId, lockStatus, caseName, imagePath, description, animalType, animalName) "
							+ "VALUES ('" + caseId + "', '" + userId + "', '0', '" + caseName + "', '" + imagePath + "', '" + description
							+ "', '" + animalType + "', '" + animalName + "')";
		console.log(queryString);
		return query(queryString);
	}
}

export default Case;
