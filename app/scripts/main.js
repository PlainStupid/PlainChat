var app = angular.module('PlainChat', ['ngRoute']);

app.constant('PLAIN_URL','http://localhost:8080');

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
    .when('/lobby',
    {
        templateUrl: 'views/lobby.html',
        controller: 'LobbyCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
