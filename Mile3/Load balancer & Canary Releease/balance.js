var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var httpProxy = require('http-proxy');
var request = require("request");
var app = express()
var ipDataStable = []
var ipDataNew = []
var count

var options = {};
var proxy   = httpProxy.createProxyServer(options);

var alert = false;


///////////// WEB ROUTES

// Add hook to make it easier to get all visited URLS.
app.use(function(req, res, next)
{
  console.log(req.method, req.url);
  var port = 80
  var server

console.log("Something went wrong: ", alert);
  if(Math.random() > 0.5 || alert === true)
  {
    count = ipDataStable.length;
    var ran = Math.floor(Math.random() * (count))
    server = ipDataStable[ran]
          console.log("IPDataStable: ", ipDataStable);
  
}
  else
  {
    count = ipDataNew.length;
    var ran = Math.floor(Math.random() * (count))
    server = ipDataNew[ran]
          console.log("IPDataNew: ", ipDataNew);
         // console.log("Ran = ", ran);
          //console.log("Count = ", count);

}
  console.log("Redirecting traffic to: http://"+server+":"+port);
  proxy.web( req, res, {target: 'http://'+server+":"+port } );


});



var refreshId = setInterval(function()
        {
        
          try
          {
            console.log("Application is listening", 'http://'+ipDataNew[0]+":80");
            request('http://'+ipDataNew[0]+":80/api/appStatus",{timeout: 1500}, function (error, res, body) {

             
                if( res == undefined || res.statusCode != 200)
                {
                  alert = true;
                  console.log("Error encountered! Issuing alert.");
                  clearInterval(refreshId);
              }
            })
          }
          catch(e)
          {
            console.log("Alert:There is an issue in the service.");
            alert = true;
          }

      }, 2500);
// HTTP SERVER
 var server = app.listen(3000, function () {

 var host = server.address().address
   var port = server.address().port
   var array = fs.readFileSync('/home/vagrant/canaryInstance').toString().split("\n");
   console.log(array)
   for(i=0;i<array.length;i++){
    if(array[i] !=""){
     ipDataStable.push(array[i])
        }
   }

 array = fs.readFileSync('/home/vagrant/stableInstance').toString().split("\n");
   console.log(array)
   for(i=0;i<array.length;i++){
    if(array[i] !=""){
     ipDataNew.push(array[i])
        }
   }

 console.log('Example app listening at http://%s:%s', host, port)

 })