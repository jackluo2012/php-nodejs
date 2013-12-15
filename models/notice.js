var mongodb = require('./mongodb');
var noticeSchema = mongodb.Schema({
		id:Number,
		serverid:Number,
		countdown:Number,
		date:{ type: Date, default: Date.now}
	});
var noticesDao = mongodb.model('notices',noticeSchema);	
var Notice =function(){};	
module.exports = Notice;
Notice.Save = function(notice,callback){
	var notice = new noticesDao({
				id:notice.id,
				serverid:notice.serverid,
				countdown:notice.countdown,
				callback:callback
			});
	notice.save(function (err,notice) {
		if (err) {
		 	callback(err);
		}
		callback(err,notice);
	});
}
Notice.Get = function(notice,callback){
	noticesDao.find(notice,function(err,docs){
		if(err){
			callback(err);
		}
		callback(err,docs);
	});
}
Notice.Remove = function(notice, callback) {
	noticesDao.remove(notice,function (err) {
			if(err){ 
				callback(err);
			}
			callback(null);
	});
};

