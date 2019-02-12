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
   
  
   
   
   
 });