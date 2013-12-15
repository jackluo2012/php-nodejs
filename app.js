
/**
 * Module dependencies.
 */

var express = require('express')
,routes = require('./routes')
,http = require('http')
,path = require('path')
,Crontab = require('./models/crontab')
,Curl = require('./models/curl')
,Notice = require('./models/notice');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
routes(app);
//*
var callFunc = function(i,j){
	console.log(i);
	console.log(j);
}
//*/
//init
Notice.Get({id:1},function(err,docs){
	if(!err){
		if(docs.length>0){
			for(var i in docs){
				var notice = docs[i];
			//	console.log(docs[i]);
				Crontab.Insert(notice,Curl.SendNotice);
			}
		}
	}
});

/*
setTimeout(function(){console.log('5')},5000);
setTimeout(function(){console.log('15')},15000);
setTimeout(function(){console.log('3')},6000);
setTimeout(function(){console.log('5')},4000);
*/
