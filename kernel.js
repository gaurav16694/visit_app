var CronJob = require('cron').CronJob;
var process_csv = require('./script/process_csv.js');
var self = {
	InitiateCron:function()	{
		const job =  new CronJob('0 * * * *', function() {
		 	process_csv.UploadContent();
		}, null, true);
	}
};

module.exports= self;
