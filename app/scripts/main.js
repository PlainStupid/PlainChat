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

	$scope.mymessage = "";
	$scope.username = "";

	var socket = io.connect('http://localhost:8080');

	$scope.connect = function(){
		if(socket)
		{
			socket.emit("adduser", $scope.username, function(available){
				if(available)
				{
					window.alert("available");
				}
				else
				{
					window.alert("not available");
				}
			});	
		}	
	};
}]);
