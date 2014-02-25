app.controller('LoginCtrl', ['$scope', '$location', 'SocketSrv', 'PLAIN_URL',
    function($scope, $location, SocketSrv, PLAIN_URL) {

        $scope.unavailable = '';

        var socket = io.connect(PLAIN_URL);

        $scope.keyPress = function($event) {
            if ($event.keyCode === 13) {
                $scope.connect();
            }
        };

        //^/kick\s[a-zA-X0-9]+$

        $scope.connect = function() {
            if (socket) {
                $scope.username = $scope.username.replace(/\s+/g, '-');

                socket.emit('adduser', $scope.username, function(available) {
                    if (available) {
                        SocketSrv.setSocket(socket);
                        SocketSrv.setNickName($scope.username);

                        $location.path('/lobby');
                    } else {
                        $scope.unavailable = 'Sorry, this username is unavailable';
                    }
                    $scope.$apply();
                });

            }
        };
    }
]);
