var mongodb=require('./db');

var Notice = function(notice){
	this.id=Number(notice.id);
	this.serverid=Number(notice.serverid);
	this.datetime=notice.datetime;
}
module.exports = Notice;
Notice.prototype.save=function(callback){
		var notice = {
			id:this.id,
			serverid:this.serverid,
			datetime:this.datetime
		};
		var date=new Date();
		var time={
			date:date,
			year:date.getFullYear(),
			month:date.getFullYear()+'-'+(date.getMonth()+1),
			day:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" "+date.getHours()+":"+date.getMinutes()
		}
		notice.time=time;
		mongodb.open(function(err,db){
			if(err){
				return callback(err);
			}
			db.collection('notice',function(err,collection){
				if(err){
					mongodb.close();
					return callback(err);
				}
				collection.insert(notice,{safe:true},function(err,result){
					mongodb.close();
					callback(err,notice);
				});
			});
		})
}
Notice.getById = function(notice,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(errr);
		}
		db.collection('notice',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.find({id:Number(notice.id)},{serverid:Number(notice.serverid)}).toArray(function(err,items){
				if(err) throw err;
				mongodb.close();
				return callback(err,items);
			});
		});
	});
}
Notice.deleteById = function(notice,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(errr);
		}
		db.collection('notice',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.find({id:Number(notice.id)},{serverid:Number(notice.serverid)}).toArray(function(err,items){
				if(err){
					mongodb.close();
					return callback(err);
				}
				if(items.length>0){	
					collection.remove({_id:items[0]._id},function(err,items){
						if(err) throw err;
						mongodb.close();
						return callback(err,items);						
					});
				}else{
					return callback(err,null);
				}
			});
		});
	});
}