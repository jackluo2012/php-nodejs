var listlink = {}
,Crontab = {};
module.exports=Crontab;
//insert;
Crontab.Insert = function(cron,callFunc,callback){
//	console.log(cron.countdown);
	var CronIndex = 'crontab_'+cron.serverid+'_'+cron.id;
	Crontab.Remove(cron.serverid,cron.id); //remove 
	listlink[CronIndex] = setTimeout(function(){
				                	callFunc(cron.serverid,cron.id)
						},cron.countdown);
}
Crontab.Remove = function(serverid,noticeid){
	var CronIndex = 'crontab_'+serverid+'_'+noticeid;
	if(listlink[CronIndex]){
		clearTimeout(listlink[CronIndex]);
	}
};
