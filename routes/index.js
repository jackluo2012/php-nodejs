
/*
 * GET home page.
 */
 //var schedule = require('node-schedule');
var Notice = require('../models/notice')
,crypto = require('crypto')
,settings = require('../config/settings')
,Curl = require('../models/curl')
,Crontab = require('../models/crontab')
,Logs = require('../models/logs')
,Notice = require('../models/notice');
var http=require("http");  
var querystring=require("querystring");  
module.exports = function(app){
	app.get("/",function(req, res){
	//console.log(Date.now());
	//*
	var logs = {
			id:1,
			serverid:2,
			status:1
		};
		Logs.Save(logs,function(){
			console.log('log success!!!');
		}); 
	console.log(logs);
	res.end();
	return ;
	var datetime=5000;
	var info={
		callback:aa,
		serverid:2,
		noticeid:4,
		_startTime:datetime,
	};
	Crontab.Insert(info,function(list){});
		res.end();
	});
	app.get('/rest/api',function(req,res){
		console.log('hello world');

		var contents=querystring.stringify({  
		  username:'userbak',
		  password:'user*^@12!bak',
		  server_id:'1',
		  submit:'true'
		});  
		var options={  
		    host:"cy.com",  
		    path:"/admin/account/login",  
		    method:"post",  
		    headers:{  
		        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",  
		        "Content-Length":contents.length,         
		        "Accept":"application/json, text/javascript, */*; q=0.01",  
		        "Accept-Language":"zh-cn",  
		        "Cache-Control":"no-cache",  
		        "Connection":"Keep-Alive",    
		        "Host":"cy.com",  
		        "Referer":"http://cy.com/index",  
		        "User-Agent":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; BOIE9;ZHCN)",  
		        "X-Requested-With":"XMLHttpRequest"  
		    }  
		};  
		  console.log(options);
		var req=http.request(options,function(res){  
		    res.setEncoding("utf8");  
		    console.log(res.statusCode);
		    console.log(res.headers.location);
		    res.on("data",function(data){  
		        console.log(data);  
		    });  
		});  
		  
		  
		req.write(contents);  
		req.end();  
		
	//	res.send({"status":1});
	});
	app.post('/rest/api',function(req,res){
//		var crontab = new Crontab();
//		crontab.start();
		//*		
		var id = req.body.id,//notice id 
			serverid=req.body.serverid, //server id
			countdown=req.body.countdown, //time 
			ans_key = req.body.ans_key; //key
		var hask_key = hask_key=id+serverid+countdown+settings.hash_key;
		var md5 = crypto.createHash('md5');
		var hash = md5.update(hask_key).digest('hex');
		if( hash != ans_key){
			res.send({"status":-1});	
		}else{
//*			
			Notice.Remove({id:id,serverid:serverid}, function (err) {
				if(err) {
					res.send({status:-1});
				}
				console.log('delete is ok !');
			});
			//*/
			//save
			var notice = {
				id:id,
				serverid:serverid,
				countdown:countdown,
			}
			Notice.Save(notice,function (err,notice) {
				 if (err) {
				 	res.send({status:-1});
				 }else{
					Crontab.Insert(notice,Curl.SendNotice);
					res.send({status:1});
				 }
			});
		}
		//*/	
	});

};
