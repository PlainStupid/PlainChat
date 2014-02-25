app.controller('LobbyCtrl', ['$scope', '$routeParams', 'SocketSrv', '$location',
    function($scope, $routeParams, SocketSrv, $location) {

        $scope.lobbyUser = SocketSrv.getNickName(); //getting the user andd socket
        var socket = SocketSrv.getSocket();
        $scope.errormsg = '';

        socket.emit('rooms');
        socket.on('roomlist', function(data) { //call the server for a room list
            $scope.roomlist = data;
            $scope.$apply();
        });

        $scope.joinRoom = function(data) { //needs work
            if (socket) {
                $location.path('/room/' + data);
            }
        };

        $scope.createRoom = function() { //also needs work :)
            if (socket) {
                $location.path('/room/' + $scope.newName);
            }
        };


        $scope.sendMessage = function() {
            $scope.successText = $scope.theName;
            $scope.showSuccess = true;
        };

        $scope.switchBool = function(value) {
            $scope[value] = !$scope[value];
        };
    }
]);
