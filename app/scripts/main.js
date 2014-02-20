var app = angular.module("Client", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "views/login.html",
      	controller: "LoginCtrl"
	})
	.otherwise({ redirectTo: "/" });
});
/*
app.controller("LoginCtrl", ["$scope", "SocketService", function($scope, SocketService) {
	
	$scope.message = "test";
	
	var socket = io.connect('http://localhost:8080');

	$scope.connect = function() {
		socket.emit("adduser", $scope.username, function(available){
			if(available)
			{
				window.alert("available");
			}
		}

	}

}]);*/


app.controller("LoginCtrl", ["$scope", function($scope) {

	$scope.mymessage = "wat";
	
	var socket = io.connect('http://localhost:8080');
	window.alert("available");
/*
	$scope.connect = function() {
		socket.emit("adduser", $scope.username, function(available){
			if(available)
			{
				window.alert("available");
			}
		}*/

}]);
