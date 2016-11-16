var Client = require('node-rest-client').Client;
 
var client = new Client();
 
// set content-type header and data as json in args parameter 
var args = {
    data: {
                    "name": "VSTS_NodeTest",
                    "description": "NPM for VSTS access",
                    "capabilities": {
                        "versioncontrol": {
                        "sourceControlType": "Git"
                        },
                        "processTemplate": {
                        "templateTypeId": "6b724908-ef14-45cf-84f8-768b5384da45"
                        }
                    }
                },
    headers: { "Content-Type": "application/json",
               'Authorization': 'Basic ' + new Buffer('shankhadeepde@hotmail.com' + ':' + 'c74nu7libexdbpb6va6v4dk7cvavgrurm5letf45tlt6b7dv6h4a').toString('base64'), }
};
 
client.post("https://shankha.visualstudio.com/DefaultCollection/_apis/projects?api-version=2.0", args, function (data, response) {
    // parsed response body as js object 
    console.log(JSON.parse(data));

    console.log("----------------------------------------------------------------------------------------------------------");
    // raw response 
    //console.log(response);
});