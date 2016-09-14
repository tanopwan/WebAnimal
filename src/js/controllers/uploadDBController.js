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

const Upload = {
	create: (userId, imagePath) => {
		var uploadId = shortid.generate();
		var queryString = "INSERT INTO Upload (`uploadId`, `userId`, `path`) "
							+ "VALUES ('" + uploadId + "', '" + userId + "', '" + imagePath + "')";
		return new Promise(function (resolve, reject) {
			conn.query(queryString, function(err, result){
				if(err)
					return reject(err);

				return resolve(uploadId);
			});
		});
	}
}

export default Upload;
