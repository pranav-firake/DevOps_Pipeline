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
app.use(function(req, res, next)
{
  console.log(req.method, req.url);
  var port = 80
  var server

console.log("Something went wrong:", alert);
  if(Math.random() > 0.6 || alert === true)
  {
    count = ipDataStable.length;
    var ran = Math.floor(Math.random() * (count))
    server = ipDataStable[ran]
       
}
  else
  {
    count = ipDataNew.length;
    var ran = Math.floor(Math.random() * (count))
    server = ipDataNew[ran]
          console.log("CanaryServer: ", ipDataNew);
        
}
  console.log("Traffic is redirecting to new instance : http://"+server+":"+port);
  proxy.web( req, res, {target: 'http://'+server+":"+port } );


});

var refreshId = setInterval(function()
        {
        
          try
          {
            console.log("App is running at", 'http://'+ipDataNew[0]+":80");
            request('http://'+ipDataNew[0]+":80/api/appStatus",{timeout: 1500}, function (error, res, body) {

              
                if( res == undefined || res.statusCode != 200)
                {
                  alert = true;
                  console.log("Error! An alert is issued! ");
                  clearInterval(refreshId);
              }
            })
          }
          catch(e)
          {
            console.log("Alert: Given service has some issues ");
            alert = true;
          }

      }, 2500);
 var server = app.listen(3000, function () {

 var host = server.address().address
   var port = server.address().port
   var array = fs.readFileSync('/home/vagrant/stableInstance').toString().split("\n");
  
   for(i=0;i<array.length;i++){
    if(array[i] !=""){
     ipDataStable.push(array[i])
        }
   }

 array = fs.readFileSync('/home/vagrant/canaryInstance').toString().split("\n");
 
   for(i=0;i<array.length;i++){
    if(array[i] !=""){
     ipDataNew.push(array[i])
        }
   }
 })