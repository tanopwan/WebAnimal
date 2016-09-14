import conn from './common/mysql.js'
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
			return reject("Query One Not found");
		});
	});
}

const Case = {
	getCases: (limit) => {
		let queryString = "SELECT c.*, u.email, u.mobile, u.lineId, u.verifyId FROM webanimal.Case c, webanimal.User u where c.userId=u.userId limit " + limit;
		return query(queryString);
	},
	getCase: (caseId) => {
		let queryString = "SELECT c.*, u.email, u.mobile, u.lineId, u.verifyId FROM webanimal.Case c, webanimal.User u where c.caseId='" + caseId + "' and c.userId=u.userId";
		return queryOne(queryString);
	},
	getComments: (caseId, limit) => {
		let queryString = "SELECT co.commentId, co.comment, co.created, u.username, u.fbId, up.path as imagePath " +
		"FROM webanimal.Comment co INNER JOIN webanimal.User u " +
		"ON (co.userId=u.userId) LEFT OUTER JOIN  webanimal.Upload up " +
		"ON (co.uploadId=up.uploadId) WHERE co.caseId='" + caseId + "' ORDER BY co.created DESC limit " + limit;
		return query(queryString);
	},
	createCase: (userId, caseName, description, animalType, animalName, imagePath) => {
		let caseId = shortid.generate();
		//INSERT INTO `webanimal`.`Case` (`caseId`, `userId`, `lock`, `caseName`, `imagePath`, `description`, `animalType`, `animalName`) VALUES ('111', 'rkrn0-0D', '0', 'a', 'b', 'c', 'd', 'e');
		let queryString = "INSERT INTO webanimal.Case (caseId, userId, lockStatus, caseName, imagePath, description, animalType, animalName) "
							+ "VALUES ('" + caseId + "', '" + userId + "', '0', '" + caseName + "', '" + imagePath + "', '" + description
							+ "', '" + animalType + "', '" + animalName + "')";
		return query(queryString);
	},
	addComment: (userId, caseId, comment, uploadId) => {
		let commentId = shortid.generate();
		if (uploadId) {
			let queryString = "INSERT INTO webanimal.Comment (commentId, caseId, userId, comment, uploadId) "
								+ "VALUES ('" + commentId + "', '" + caseId + "', '" + userId + "', '" + comment + "', '" + uploadId + "')";
			return query(queryString);
		}
		else {
			let queryString = "INSERT INTO webanimal.Comment (commentId, caseId, userId, comment) "
								+ "VALUES ('" + commentId + "', '" + caseId + "', '" + userId + "', '" + comment + "')";
			return query(queryString);
		}
	}
}

export default Case;
