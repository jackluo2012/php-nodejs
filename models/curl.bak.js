var http = require('http')
,url = require('url')
,querystring = require('querystring')
,settings = require('../config/settings');
var Curl = {}
module.exports  = Curl;
Curl.Post = function post(url,body,callback) {
		var userAgend = 'Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13';
		var PostHead = {'User-Agent' : userAgend , 'Content-Type' : 'application/x-www-form-urlencoded'};
 		
 		var args = url.parse(url);
	    console.log(args);
	    var options = args;
	    if(headers)options.headers = headers;
	    options.method = 'POST';
	    if(!body)options.method = 'GET';
	    if(body){
	        body = querystring.stringify(body);
	        options.headers['Content-Length'] = Buffer.byteLength(body);
	    }
/*
		if(contents){ 
			options.method = "post";
			body = querystring.stringify(contents);
			options.headers['Content-Length'] = Buffer.byteLength(body);
		}else{
			options.method = "get";
		}
*/
		//*
		var req = http.request(options, function(res) {
	        if(res.statusCode!=200){
	              callback(res);
	              return;
	        }
	        var body = new Buffer(1024*10);
	        var size = 0;
	        res.on('data', function (chunk) {
	            size+=chunk.length;
	            if(size>body.length){//每次扩展10kb
	                var ex = Math.ceil(size/(1024*10));
	                var tmp = new Buffer(ex * 1024*10);
	                body.copy(tmp);
	                body = tmp;
	            }
	            chunk.copy(body,size - chunk.length);
	        });
	        res.on('end', function () {
	            res.data = new Buffer(size);
	            body.copy(res.data);
	            res.body = res.data.toString();
	            callback(res);
	        });
	    }).on('error', function(e) {
	      console.log("Got error: " + e.message);
	    });
		//*/
		/*
		var req=http.request(options,function(res){  
		    res.setEncoding("utf8");  
		    callback(res);
		}).on('error', function(e) {
			callback(e);
    		console.log("Got error: " + e.message);
    	});
    	//*/ 
		if(body){
        	req.write(body);
    	}
		req.end();  
}
Curl.Get = function (path,contents,callback){
//	console.log('Get request!!');
	Curl.Post(path,contents,callback);
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
Curl.SendNotice = function (serverid,callback){
	Curl.Get('',null,function(res){
	});
	/*
	Curl.Login(serverid,function(resoult){
		console.log(resoult);
		if(resoult.status){
			//send data info
			Curl.Get(settings.remote.send_notice_path,null,function(res){
				res.on("data",function(data){  
		        	console.log(data);  
	    		});
	    	});	
    	}
	});
	*/
};



