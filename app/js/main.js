var app = angular.module("Client", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "views/login.html",
      	controller: "LoginCtrl"
	})
	.otherwise({ redirectTo: "/" });
});
app.controller("LoginCtrl", function($scope) {
	$scope.message = "login";

});