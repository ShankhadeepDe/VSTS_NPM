var inquirer = require('inquirer');
var colors = require("colors/safe");
var project = require('./Project.js');
var https = require('https');

console.log(colors.yellow('Welcome to VSTS setup'));

var generalQuestions = [{
    type: 'input',
    name: 'VSTSInstance',
    message: "Please provide a VSTST instance name:",
    filter: function (val) {
      return val.toLowerCase()+'.visualstudio.com';
    }
  },
  {
    type: 'list',
    name: 'APIName',
    message: 'What module do you want to work on',
    choices: ['Project', 'Repository', 'Build'],
    filter: function (val) {
      return val.toLowerCase();
    }
  }];

 var projectQuestions = [
  {
    type: 'list',
    name: 'APIAction',
    message: 'What do you want to do',
    choices: [
                {name : 'Get list of Projects',value : 'GET'},
                {name: 'Create a Project', value : 'CREATE'},
                {name: 'Delete a project', value :'DELETE'}
            ]    
  },
  {
      type: 'input',
      name: 'Username',
      message: 'Enter your email'
  },
  {
      type: 'password',
      name: 'PAT',
      message: 'Enter your PAT',
      hidden:true
  }
  ];

  inquirer.prompt(generalQuestions).then(function (answers) {
   var apiName = JSON.parse(JSON.stringify(answers,null, '  ')).APIName;
   var vstsInstance = JSON.parse(JSON.stringify(answers,null, '  ')).VSTSInstance;
   if(apiName=='project'){
       inquirer.prompt(projectQuestions).then(function (projectAnswers) {
          var options = JSON.parse(JSON.stringify(projectAnswers, null, '  '));
          var projectApiOptions = {};
              projectApiOptions.User = {Username : options.Username,PAT : options.PAT};
              projectApiOptions.args = {VSTSInstance : vstsInstance, action : options.APIAction};
          console.log(projectApiOptions);
          project.callProjectApi(projectApiOptions);
       });
   }

});


