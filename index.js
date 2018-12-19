var fs = require('fs');
var  alert =require('alert-node'); 
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlJSONParser = bodyParser.urlencoded({ extended: false });
app.post("/", urlJSONParser, function(req, res) {
  var i = 0;
  var jsonCountFilterArr =[];

  var jsonFileData = JSON.stringify(req.body)
  .replace(/\\n/g, "")
  .replace(/\\r/g, "")
  .replace(/\\t/g, "")
  .replace(/\\/g, "");

// JSON.stringify wil always return with extra "" and {} with we need to remove those to parse as JSON.
jsonFileData = JSON.parse(jsonFileData.replace(/("{|}")/gi, "").replace(/:""/gi, ""));

    //Filter by Count
    for(i = 0;i < jsonFileData.payload.length;i++){	
      var jsonObject1 = jsonFileData.payload[i];
      if(jsonObject1.count>0){
        var LogoArray = Object.keys(jsonObject1.logos);
        var thumbNail = "";
        var imageSize=0;
        for (var j = 0; j < LogoArray.length; j++) {
          var lkey = LogoArray[j];
          var lvalue = jsonObject1.logos[lkey];
          thumbNail = lvalue.url;
          imageSize=lvalue.size;
        }
        jsonCountFilterArr.push({
          name: jsonObject1.name,
          count:jsonObject1.count,
          thumbnail:thumbNail,
          size:imageSize
      })
    jsonCountFilterData = jsonCountFilterArr;
    }
    }

 //Filter by Size of the image of the url
 var a=0;
 var finalJson=[];
   for(a = 0; a < jsonCountFilterData.length; a++){
      var jsonObject2 = jsonCountFilterData[a];
      var fileSize = parseInt(jsonObject2.size.split("x")[0]);
      if (fileSize >= 64 || fileSize <= 128) {
        finalJson.push({
          name: jsonObject2.name,
          count:jsonObject2.count,
          thumbnail:jsonObject2.thumbnail,
      })
      }
   }
   var concateJsonData = { 'Response': finalJson };
   res.send(JSON.stringify(concateJsonData));
})
app.listen(8000)
