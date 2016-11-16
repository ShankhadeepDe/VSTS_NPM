var path ='/DefaultCollection/_apis/projects?api-version=2.0';
var https = require('https');

module.exports.callProjectApi = function(options){
 
     var apiOptions = {
            //host: options.host,
            host: options.args.VSTSInstance,
            //  port: 443,
            path: path,
            // authentication headers
            headers: {
                'Authorization': 'Basic ' + new Buffer(options.User.Username + ':' + options.User.PAT).toString('base64')
            }
        };


        //this is the call
       
         https.get(apiOptions, function (res) {
            var body = "";
            res.on('data', function (data) {
                body += data;
            });
            res.on('end', function () {
                //here we have the full response, html or json object
                var result = JSON.parse(body);
                result.value.forEach(function(item){
                    console.log(item.name);
                });
            });
            res.on('error', function (e) {
                console.log("Got error: " + e.message);
            });
        });  

};
 





        