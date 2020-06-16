require('appmetrics-dash').attach();

const appName = require('./../package').name;
const http = require('http');
const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');
const path = require('path');

const logger = log4js.getLogger(appName);
logger.level = process.env.LOG_LEVEL || 'info'
const app = express();
const server = http.createServer(app);

app.use(log4js.connectLogger(logger, { level: logger.level }));
//require('./services/index')(app);
require('./routers/index')(app, server);


console.log('App started!');

var schedule = require('node-schedule');
 
// start offering: CODEWIND ** hourly //
// get plugin eclipse
var j = schedule.scheduleJob('01 * * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=Codewind&getDataType=EclipsePluginMarketplaceMetrics&uri=https://marketplace.eclipse.org/content/codewind&uriHash=group-metrics-tab', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// get plugin JetBrains ** daily 03:00
var j = schedule.scheduleJob('02 03 * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=Codewind&getDataType=JetBrainsPluginMarketplaceMetrics&uri=https://plugins.jetbrains.com/plugin/13839-codewind', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// get plugin vscode 
var j = schedule.scheduleJob('03 * * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=Codewind&getDataType=VSCodePluginMarketplaceMetrics&uri=https://marketplace.visualstudio.com/items&parm1Key=itemName&parm1Value=IBM.codewind', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// get plugin vscode-java-profiler
var j = schedule.scheduleJob('04 * * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=Codewind&getDataType=VSCodePluginMarketplaceMetrics&uri=https://marketplace.visualstudio.com/items&parm1Key=itemName&parm1Value=IBM.codewind-java-profiler', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// get plugin vscode-node-profiler
var j = schedule.scheduleJob('05 * * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=Codewind&getDataType=VSCodePluginMarketplaceMetrics&uri=https://marketplace.visualstudio.com/items&parm1Key=itemName&parm1Value=IBM.codewind-node-profiler', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// get plugin vscode-open-api-tools
var j = schedule.scheduleJob('06 * * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=Codewind&getDataType=VSCodePluginMarketplaceMetrics&uri=https://marketplace.visualstudio.com/items&parm1Key=itemName&parm1Value=IBM.codewind-openapi-tools', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// report installs
var j = schedule.scheduleJob('10 * * * *', function(){
  var request = require('request'); request('http://smart-adv-build-report-install-metrics-default.apps.riffled.os.fyre.ibm.com/build-report?runMode=production', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// get Git repo
// var j = schedule.scheduleJob('28 * * * *', function(){
//   var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=Codewind&getDataType=GithubRepoApi&githubUserAgent=SmarterAdvocacyGetDataService&uri=https://api.github.com/repos/eclipse/codewind', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
// });
// get Twitter
var j = schedule.scheduleJob('30 * * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=Codewind&getDataType=TwitterUserData&TwitterScreenName=EclipseCodewind', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// report Twitter
var j = schedule.scheduleJob('35 * * * *', function(){
  var request = require('request'); request('http://build-report-default.apps.riffled.os.fyre.ibm.com/build-report?campaign=Codewind&reportType=TwitterUserData&runMode=production', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// get YouTube
var j = schedule.scheduleJob('32 23 * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=Codewind&getDataType=YouTubeChannel&uri=https://www.youtube.com/channel/UCnKCVK6RFDyHFqUmXlAhCHQ/videos', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// report YouTube
var j = schedule.scheduleJob('40 23 * * *', function(){
  var request = require('request'); request('http://build-report-default.apps.riffled.os.fyre.ibm.com/build-report?campaign=Codewind&reportType=YouTubeChannel&runMode=production', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// ended offering: CODEWIND //






//////////////////////////////////
// start kabanero - daily at 22:00
///// get Twitter
var j = schedule.scheduleJob('42 22 * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=Kabanero&getDataType=TwitterUserData&TwitterScreenName=KabaneroIO', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
///// report Twitter
var j = schedule.scheduleJob('44 22 * * *', function(){
  var request = require('request'); request('http://build-report-default.apps.riffled.os.fyre.ibm.com/build-report?campaign=Kabanero&reportType=TwitterUserData&runMode=production', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
///// get YouTube
var j = schedule.scheduleJob('46 22 * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=Kabanero&getDataType=YouTubeChannel&uri=https://www.youtube.com/channel/UCQJvARj2MAizFIodwUgQfAA/videos', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
///// report YouTube
var j = schedule.scheduleJob('48 22 * * *', function(){
  var request = require('request'); request('http://build-report-default.apps.riffled.os.fyre.ibm.com/build-report?campaign=Kabanero&reportType=YouTubeChannel&runMode=production', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// ended kabanero - daily at 22:00






////////////////////////////////////////
// started open liberty and WAS - daily at 21:00
// get VScode
var j = schedule.scheduleJob('41 21 * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=OpenLiberty&getDataType=TwitterUserData&TwitterScreenName=OpenLibertyIO', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// get Twitter
var j = schedule.scheduleJob('43 21 * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=OpenLiberty&getDataType=&uri=https://marketplace.visualstudio.com/items&parm1Key=itemName&parm1Value=MicroProfile-Community.mp-starter-vscode-ext', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// report Twitter
var j = schedule.scheduleJob('45 21 * * *', function(){
  var request = require('request'); request('http://build-report-default.apps.riffled.os.fyre.ibm.com/build-report?campaign=OpenLiberty&reportType=TwitterUserData&runMode=production', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// get YouTube     (WAS Dev, not Open Liberty)
var j = schedule.scheduleJob('47 21 * * *', function(){
  var request = require('request'); request('http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?runMode=production&campaign=WAS&getDataType=YouTubeChannel&uri=https://www.youtube.com/user/WASdev/videos', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// report YouTube     (WAS Dev, not Open Liberty)
var j = schedule.scheduleJob('49 21 * * *', function(){
  var request = require('request'); request('http://build-report-default.apps.riffled.os.fyre.ibm.com/build-report?campaign=WAS&reportType=YouTubeChannel&runMode=production', function (error, response, body) {console.log('error:', error); console.log('statusCode:', response && response.statusCode); console.log('body:', body); });
});
// ended open liberty and WAS - daily at 21:00





const port = process.env.PORT || localConfig.port;
server.listen(port, function(){
  logger.info(`node listening on http://localhost:${port}`);
});

app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

app.use(function (err, req, res, next) {
	res.sendFile(path.join(__dirname, '../public', '500.html'));
});

module.exports = server;