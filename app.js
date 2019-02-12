/**
 * Custom AngularJS App File
 * for populating and creating
 * form fields dynamically
 **/
 
 var app = angular.module("dynamicFieldsPlugin", []);
 
 app.controller("dynamicFields", function($scope) {

   $scope.newchoice= {};

   
   $scope.choices = [{id: '1', name: 'choice1'}, {id: 'c2', name: 'choice2'}, {id: 'che3', name: 'choice3'}];

   
   $scope.addNewChoice = function() {
     $scope.choices.push({ 
      id: $scope.newchoice.id,
      name: $scope.newchoice.name});

   }


    var ip= "0.1.1.0/2"
   
    //var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/ 
    var reg=/^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([12]?\d|3[0-2]))?$/    
    $scope.newchoice.id=(reg.test(ip));     
        
  
   
   
   
 });