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

const queryOne = (queryString) => {
	return new Promise(function (resolve, reject) {
		conn.query(queryString, function(err, result){
			if(err)
				return reject(err);

			if (result.length == 1) {
				return resolve(result[0]);
			}
			return reject("Not found");
		});
	});
}

const Case = {
	getCases: (limit) => {
		var queryString = "SELECT * FROM webanimal.Case limit " + limit;
		return query(queryString);
	},
	getCase: (caseId) => {
		var queryString = "SELECT c.*, u.username, u.fbId, u.email, u.mobile, u.lineId, u.verifyId FROM webanimal.Case c, webanimal.User u where c.caseId='" + caseId + "' and c.userId=u.userId";
		return queryOne(queryString);
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
