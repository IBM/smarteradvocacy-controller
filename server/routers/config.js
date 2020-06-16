const express = require('express');
const request = require('request');
const { updateConfig } = require('../services/updateConfig');
const multer = require('multer');
const path = require('path');

module.exports = (app) => {
  const router = express.Router();

  const root = path.join(__dirname, '../../');
  const uploadPath = path.join(root, 'uploads');
  const upload = multer({ dest: uploadPath });
  // set upload settings
  //var configUpload = upload.fields([{ name: 'noticesCSV', maxCount: 1 }, { name: 'ibmJavaVersion', maxcount: 1}]);
  var configData = upload.fields([{ name: 'campaign', maxCount: 1 }]);

  router.get('/', function (req, res, next) {

    var username = 'nikadmin';
    var password = 'nikadmin';
    var urlToCall="http://" + username + ':' + password + "@datastore-default.apps.riffled.os.fyre.ibm.com/advocacy/A-smart-adv-control-config"

    function doCall(urlToCall, callback) {
      console.log("START: doCall")
      console.log("-- urlToCall = "+urlToCall)
      request({
        method: "GET",
        url: urlToCall, 
        Accept: "application/json",
        json: true,
        }, function (error, response, configJson) {
          //console.log("-- configJson = "+configJson);
          //console.log("-- response = "+response);
          console.log("ENDED: doCall")
          return callback(configJson)
      });
    }

    doCall(urlToCall, function(response){
      //console.log(response);
      var displayHtml="<HTML><font face=\"verdana\"><h1>Smarter Advocacy Control Config:</h1><form method=\"post\" enctype=\"multipart/form-data\"><table border=\"0\" cellpadding=\"3\">"
      var inputId="";
      for (var campaignNumber in response.campaigns) {
        var campaign = response.campaigns[campaignNumber].campaign; //console.log(campaign);
        inputId = "campaign"+parseInt(campaignNumber);
        inputId = "campaign";
        displayHtml=displayHtml+"<tr><td align=\"right\"><b>campaign </b></td><td><input id=\""+inputId+"\" size=\"120\" type=\"text\" value=\""+campaign+"\"/></td></tr>"
        for (var getDataNumber in response.campaigns[campaignNumber].getDatas) {
          var getDataType = response.campaigns[campaignNumber].getDatas[getDataNumber].getDataType;
          inputId = parseInt(campaignNumber)+"-getData"+parseInt(getDataNumber)
          displayHtml=displayHtml+"<tr><td><b><small>get-data Type</small></b> </td><td><input id=\""+inputId+"\" size=\"120\" type=\"text\" value=\""+getDataType+"\"/></td></tr>"
          var power = response.campaigns[campaignNumber].getDatas[getDataNumber].power;
          inputId = parseInt(campaignNumber)+"-getData"+parseInt(getDataNumber)+"-power"
          displayHtml=displayHtml+"<tr><td align=\"right\"><small>power .. </small></td><td><input id=\""+inputId+"\" size=\"120\" type=\"text\" value=\""+power+"\"/></td></tr>"
          var runMode = response.campaigns[campaignNumber].getDatas[getDataNumber].runMode;
          inputId = parseInt(campaignNumber)+"-getData"+parseInt(getDataNumber)+"-runMode"
          displayHtml=displayHtml+"<tr><td align=\"right\"><small>runMode .. </small></td><td><input id=\""+inputId+"\" size=\"120\" type=\"text\" value=\""+runMode+"\"/></td></tr>"
          var nodeSchedule = response.campaigns[campaignNumber].getDatas[getDataNumber].nodeSchedule;
          inputId = parseInt(campaignNumber)+"-getData"+parseInt(getDataNumber)+"-nodeSchedule"
          displayHtml=displayHtml+"<tr><td align=\"right\"><small>nodeSchedule .. </small></td><td><input id=\""+inputId+"\" size=\"120\" type=\"text\" value=\""+nodeSchedule+"\"/></td></tr>"
          var uri = response.campaigns[campaignNumber].getDatas[getDataNumber].uri;
          inputId = parseInt(campaignNumber)+"-getData"+parseInt(getDataNumber)+"-uri"
          displayHtml=displayHtml+"<tr><td align=\"right\"><small>uri .. </small></td><td><input id=\""+inputId+"\" size=\"120\" type=\"text\" value=\""+uri+"\"/></td></tr>"
          if ( response.campaigns[campaignNumber].getDatas[getDataNumber].getDataType === "EclipsePluginMarketplaceMetrics" ) {
            var uriHash = response.campaigns[campaignNumber].getDatas[getDataNumber].uriHash;
            inputId = parseInt(campaignNumber)+"-getData"+parseInt(getDataNumber)+"-uriHash"
            displayHtml=displayHtml+"<tr><td align=\"right\"><small>uriHash .. </small></td><td><input id=\""+inputId+"\" size=\"120\" type=\"text\" value=\""+uriHash+"\"/></td></tr>"
            var testUri = "http://smart-adv-get-data-default.apps.riffled.os.fyre.ibm.com/get-data?campaign="+campaign+"&getDataType="+getDataType+"&uri="+uri+"&uriHash="+uriHash
            displayHtml=displayHtml+"<tr><td></td><td  align=\"right\"><small><a href=\""+testUri+"\" target=\"_blank\">test NOW</a></small></br></br></td></tr>"
          }
          if ( response.campaigns[campaignNumber].getDatas[getDataNumber].getDataType === "VSCodePluginMarketplaceMetrics" ) {
            var parm1Key = response.campaigns[campaignNumber].getDatas[getDataNumber].parm1Key;
            inputId = parseInt(campaignNumber)+"-getData"+parseInt(getDataNumber)+"-parm1Key"
            displayHtml=displayHtml+"<tr><td align=\"right\"><small>parm1Key .. </small></td><td><input id=\""+inputId+"\" size=\"120\" type=\"text\" value=\""+parm1Key+"\"/></td></tr>"
            var parm1Value = response.campaigns[campaignNumber].getDatas[getDataNumber].parm1Value;
            inputId = parseInt(campaignNumber)+"-getData"+parseInt(getDataNumber)+"-parm1Value"
            displayHtml=displayHtml+"<tr><td align=\"right\"><small>parm1Value .. </small></td><td><input id=\""+inputId+"\" size=\"120\" type=\"text\" value=\""+parm1Value+"\"/></td></tr>"
          }
        }
      }
      //<input id=\"displayJson\" style=\"height:800px;font-size:14pt;\" type=\"text\" name=\"config\" value=\""+response+"\"/><br /><input type=\"submit\" name=\"SubmitButton\" value=\"Go\"/></form>"
      displayHtml = displayHtml+"<tr><td></td><td align=\"right\"><input type=\"submit\" name=\"SubmitButton\" value=\"SAVE updates\"/></td></tr></form></table></font></html>"
      res.send(displayHtml);
    });



    const stringToReturn = "Hey there, this is codewind saying hi and thanks for using me"

  // get config from DB
  //var newValue = "10";
    //document.getElementById("displayJson").value = docJson;

  });

  router.post('/', configData, updateConfig)

  app.use('/config', router);
}