var prompt = require("prompt");
var colors = require("colors/safe");
var request = require('request');
var https = require('https');
var querystring = require('querystring');
var qs = require('qs');
// 
// Setting these properties customizes the prompt. 
// 
//prompt.message = colors.rainbow("Question!");
prompt.message = "";
prompt.delimiter = colors.grey(":");

prompt.start();

prompt.get([
    {properties: {
        email: {
                description: colors.grey("Enter your email")
              }
       }
    },
    {properties: {
            PAT: {
                hidden:true,
                description: colors.grey("Enter your PAT")
            }
        }
    }], function (err, result) {
        console.log(colors.cyan("VSTS instance name : shankha"));
        console.log(colors.cyan("User : " + result.email));
        
        /*    request('http://localhost:50311/api/Product/3', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body); // Print the google web page.
                }
            });
        */
        var options = {
            host: 'shankha.visualstudio.com',
            //  port: 443,
            path: '/DefaultCollection/_apis/projects?api-version=2.0',
            // authentication headers
            headers: {
                'Authorization': 'Basic ' + new Buffer(result.email + ':' + result.PAT).toString('base64')
            }
        };
        //this is the call
       
         https.get(options, function (res) {
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
    
 
/*
        //Create a team project
        var data = qs.stringify({
                    "name": "VSTS_NPM",
                    "description": "NPM for VSTS access",
                    "capabilities": {
                        "versioncontrol": {
                        "sourceControlType": "Git"
                        },
                        "processTemplate": {
                        "templateTypeId": "6b724908-ef14-45cf-84f8-768b5384da45"
                        }
                    }
                });
        var postOptions = {
            host: 'shankha.visualstudio.com',
            //  port: 443,
            path: '/DefaultCollection/_apis/projects?api-version=2.0',
            // authentication headers
            //method type
            method:'POST',
            headers: {
                'Authorization': 'Basic ' + new Buffer(result.email + ':' + result.PAT).toString('base64'),
                'Content-Type':'application/x-www-form-urlencoded',
                'Content-Length':Buffer.byteLength(data)
            },
            
        };
        console.log("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _");
        var req = https.request(postOptions, function(res) {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        var body = "";
        res.on('data', function(d) {
            body+=d;
        });        
        res.on('end', function () {
                //here we have the full response, html or json object
                var result = JSON.parse(body);
                console.log("Response: ",result);
            });

        req.on('error', function(error) {
        console.error(error);
        });       
       });
 */      
    });