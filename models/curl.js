var http = require('http')
,url = require('url')
,querystring = require('querystring')
,settings = require('../config/settings')
,Notice = require('../models/notice')
,Logs = require('../models/logs');
var Curl = {}
module.exports  = Curl;
Curl.Post = function post(path,cookies,body,callback) {
	var options = url.parse(path);
	options['headers']  = {  
	        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",  
	        "Accept":"application/json, text/javascript, */*; q=0.01",  
	        "Accept-Language":"zh-cn",  
	        "Cache-Control":"no-cache",  
	        "Connection":"Keep-Alive",    
	        "User-Agent":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; BOIE9;ZHCN)",  
	        "X-Requested-With":"XMLHttpRequest"  
	    }
	if(cookies) options.headers['Cookie'] = cookies;

	options.method = 'POST';
    if(!body)options.method = 'GET';
    if(body){
        body = querystring.stringify(body);
        options.headers['Content-Length'] = Buffer.byteLength(body);
    }
    var req=http.request(options,function(res){  
	    res.setEncoding("utf8");  
	    return callback(res);

	});  
	if(body){
    	req.write(body);  
    }
	req.end();  
}
Curl.Get = function (path,cookies,contents,callback){
	Curl.Post(path,cookies,contents,callback);
}
Curl.Login = function(serverid,callback){
	var contents={  
		  username:settings.remote.username,
  		  password:settings.remote.password,
  		  server_id:serverid,
  		  submit:'true'
  	};
	Curl.Post(settings.remote.login_path,contents,function(res){
		if(res.statusCode == 302 && res.headers.location=='/admin/index'){
			callback({status:1});
			console.log('login success !!!');		
		}else{
			callback({status:1});
			console.log('login error !!!');		
		}
	});
};
Curl.SendNotice = function (serverid,noticeid){
	var contents={  
		  username:settings.remote.username,
  		  password:settings.remote.password,
  		  server_id:serverid,
  		  submit:'true'
  	};
	Curl.Post(settings.remote.login_path,null,contents,function(res){
		if(res.statusCode == 302 && res.headers.location=='/admin/index'){
			//
			var cookies = null;
			if(res.headers['set-cookie']){
				var cookies = res.headers['set-cookie'];
			}
			var contents = {
				noticeid:noticeid,
				send_notice_key:settings.remote.send_notice_key
			}
			//console.log(cookies);	
			Curl.Get(settings.remote.send_notice_path,cookies,contents, function(res){
				res.on("data",function(data){
					var data = 	eval("(" + data +")"); //covie
					console.log(data);  
					console.log(data.status);  
						//success
		        	if(data.status==1){
		        		//remove	
		        		Notice.Remove({id:noticeid,serverid:serverid},function(){});	
		        	}
		        	var logs = {
						id:noticeid,
						serverid:serverid,
						status:data.status
					};
					console.log(data.status);
					console.log(logs);
					Logs.Save(logs,function(){
						console.log('log success!!!');
					}); 
		    	});
			});
//			callback({status:1});
//			console.log('login success !!!');		
		}else{
//			callback({status:-1});
//			console.log('login error !!!');		
		}
	});
};



