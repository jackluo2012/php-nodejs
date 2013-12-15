var mongodb = require('./mongodb');
var logsSchema = mongodb.Schema({
		id:Number,
		serverid:Number,
		status:String,
		date:{ type: Date, default: Date.now}
	});
var Logs = function(){},
	LogsDao = mongodb.model('logs',logsSchema);
Logs.Save = function(logs,callback){
	var logs = new LogsDao({
				id:logs.noticeid,
				serverid:logs.serverid,
				status:logs.status
			});
	logs.save(function (err,notice) {
		if (err) {
		 	callback(err);
		}
		callback(err,notice);
	});
}
module.exports = Logs;

