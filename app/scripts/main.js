var app = angular.module('PlainChat', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
    .when('/room',
    {
        templateUrl: 'views/room.html',
	    controller: 'RoomCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
