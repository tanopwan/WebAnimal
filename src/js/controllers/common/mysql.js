import mysql from 'mysql';

var conn = new mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'dontforget',
    database : 'WebAnimal'
});

conn.connect(function(err){
	if(err){
    	console.log('Error connecting to Db');
    	console.log(err);
    	return;
  	}
  	console.log('MySQL connection established');
});

export default conn;
