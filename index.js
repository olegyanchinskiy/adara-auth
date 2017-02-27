const mysql = require('mysql'),
	bluebird = require('bluebird');


module.exports = (configurations, email, password) => {
	const promise = new Promise();
	const connection = mysql.createConnection({
		host: configurations.host,
		user: configurations.user,
		password: configurations.password
	});

	connection.connect();

	connection.query('"SELECT * from ' + configurations.table + ' where email=' + email + '"', (err, member)=> {
		console.log('member found', member);
		if(err){
			return promise.reject(err);
		}
		if(member && member.password){
			return promise.resolve(member.password);
		} else {
			return promise.reject(new Error('wrong password'));
		}
	});
};


