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
			return resolve({});
		});
	});
}

const User = {
	createUser: () => {
		let userId = shortid.generate();
		let queryString = "INSERT INTO User (id) VALUES ('" + userId + "')";
		return new Promise(function (resolve, reject) {
			conn.query(queryString, function(err, result){
				if(err)
					return reject(err);

				return resolve({id: userId});
			});
		});
	},
	createFBRecord: (fbId, username) => {
        let queryString = "INSERT INTO FBUser (id, fbId, username, lastLogin) VALUES ('" +
            shortid.generate() + "', '" + fbId + "', '" + username + "', NOW());";
        return query(queryString);
    },
	createFBUser: (userId, fbId, username) => {
        let queryString = "INSERT INTO FBUser (id, fbId, username, lastLogin, userId) VALUES ('" +
            shortid.generate() + "', '" + fbId + "', '" + username + "', NOW(), '" + userId + "');";
        return query(queryString);
    },
	getFbId: (fbId) => {
        let queryString = "SELECT * FROM FBUser WHERE fbId='" + fbId + "'";
		return queryOne(queryString);
    },
	getUserByFbId: (fbId) => {
		let queryString = "SELECT * FROM User u, FBUser fbu WHERE fbu.fbId='" + fbId + "' AND u.id=fbu.userId";
		return query(queryString);
	},
	deleteFBRecord: (userId) => {
        let queryString = "DELETE FROM FBUser WHERE userId='" + userId + "'";
        return query(queryString);
    },
	deleteUser: (userId) => {
        let queryString = "DELETE FROM User WHERE id='" + userId + "'";
        return query(queryString);
    },
	updateFBUserOnLogin: (fbId) => {
		var queryString = "UPDATE FBUser SET lastLogin=NOW() where fbId='" + fbId + "'";
		return query(queryString);
	},
	updateUserOnLogin: (userId) => {
		var queryString = "UPDATE FBUser f JOIN User u ON f.userId=u.id SET f.lastLogin=NOW() where userId='" + userId + "'";
		return query(queryString);
	},
	updateUserOnLogout: (userId) => {
		var queryString = "UPDATE FBUser f JOIN User u ON f.userId=u.id SET f.lastLogin=NULL where userId='" + userId + "'";
		return query(queryString);
	},
	validateFBUserSession: (fbId) => {
		return new Promise(function (resolve, reject) {
			var queryString = "SELECT * FROM User u, FBUser fbu WHERE fbu.fbId='" + fbId + "' AND u.id=fbu.userId";
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
