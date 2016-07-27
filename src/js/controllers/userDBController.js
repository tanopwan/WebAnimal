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

const User = {
	getUserByFbId: (fbId) => {
		var queryString = "SELECT * FROM User WHERE fbId='" + fbId + "'";
		return query(queryString);
	},
	updateUserOnLogin: (fbId, username) => {
		//INSERT INTO User (userId, fbId, username, lastLogin) VALUES ('test', '1199019910116181', 'Tanopwan', NOW()) ON DUPLICATE KEY UPDATE userId=VALUES(userId), fbID=VALUES(fbId), username=VALUES(username), lastLogin=VALUES(lastLogin)
		var queryString = "INSERT INTO User (userId, fbId, username, lastLogin) VALUES ('" +
			shortid.generate() + "', '" +
			fbId + "', '" +
			username +
			"', NOW()) ON DUPLICATE KEY UPDATE userId=userId, fbId=VALUES(fbId), username=VALUES(username), lastLogin=VALUES(lastLogin)";

		return query(queryString);
	},
	updateUserOnLogout: (userId) => {
		var queryString = "UPDATE User SET lastLogin=NULL where userId='" + userId + "'";
		return query(queryString);
	},
	validateFBUserSession: (fbId) => {
		return new Promise(function (resolve, reject) {
			var queryString = "SELECT * FROM User WHERE fbId='" + fbId + "'";
			conn.query(queryString, function(err, result){
				if(err)
					return reject(err);

				var user = result[0];
				// Can check session expire later here
				if (user && user.lastLogin) {
					//console.log("userDBController.js - User is already logged in with user " + JSON.stringify(user));
					return resolve(user);
				}

				console.log("userDBController.js - User is not logged in");
				return reject();
			});
		});
	},
	updateUserByUserId: (userId, email, mobile, lineId) => {
		//UPDATE `webanimal`.`User` SET `email`='tanopwan@gmail.com1', `mobile`='08011111111', `lineId`='tanopwan1' WHERE `userId`='rkrn0-0D';
		var queryString = "UPDATE User SET email='" + email + "', lineId='" + lineId + "', mobile='" + mobile + "' WHERE userId='" + userId + "'";
		return query(queryString);
	}
}

export default User;
