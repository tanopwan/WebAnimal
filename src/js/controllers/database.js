var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/webanimal';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('[DB] Connection established to ', url);
});

var user_schema = mongoose.Schema({ fbId: 'string', username: 'string' });
var case_schema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	caseName: 'string',
	animalType: 'string',
	animalName: 'string',
	caseStatus: 'string',
	createdDate: 'string',
	caseDate: 'string',
	description: 'string',
	imagePath: 'string'
});
var case_comment_schema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' },
	comment: 'string',
	createdDate: 'string'
});
var bill_schema = mongoose.Schema({
	case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' },
	imagePath: 'string',
	description: 'string',
	createdDate: 'string'
});

var User = mongoose.model('User', user_schema);
var Case = mongoose.model('Case', case_schema);

module.exports.User = User;
module.exports.Case = Case;