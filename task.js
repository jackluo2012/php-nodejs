/*var schedule = require('node-schedule');
//var date = new Date();
var rule = 	new schedule.RecurrenceRule();
rule.year = 2013;
rule.month = 12;
rule.date = 3;
rule.hour = 21;
rule.minute = 17;
var j = schedule.scheduleJob(rule, function(){
	console.log('The world is going to end today.');
});*/

var schedule = require('node-schedule');
var date = new Date(2013, 12, 03, 21, 27, 0);
var j = schedule.scheduleJob(date, function(){
    console.log('The world is going to end today.');
});
