app.controller('RoomCtrl', ['$scope', '$location', '$routeParams', 'SocketSrv', 'PLAIN_URL',
    function($scope, $location, $routeParams, SocketSrv, PLAIN_URL) {

        var socket = SocketSrv.getSocket();

        $scope.currentUser = SocketSrv.getNickName();

        $scope.glued = true;

        $scope.roomName = $routeParams.roomId;

        $scope.ops = [];

        var ban = /^\/ban\s.+$/;
        var kick = /^\/kick\s.+$/;
        var partroom = /^\/partroom$/;

        if (socket) {

            socket.emit('joinroom', {
                room: $scope.roomName,
                pass: ''
            }, function(success, errorMessage) {
                if (!success) {
                    if (errorMessage === 'banned')
                    {
                        alert('Your are banned from this room');
                    }
                    $location.path('/lobby');
                    $scope.$apply();
                }
            });

            socket.on('updatechat', function(roomname, messageHistory) {
                $scope.roomMessages = messageHistory;
                $scope.$apply();
            });

            socket.on('updateusers', function(room, users, ops) {
                console.log('Updating users');
                if (room === $scope.roomName) {
                    $scope.users = users;
                    $scope.ops = ops;
                    $scope.$apply();
                }
            });

            socket.on('kicked', function(room, kicked, kicker) {
                if (kicked === SocketSrv.getNickName()) {
                    alert('You have been kicked');
                    $location.path('/lobby');
                    $scope.$apply();
                }
            });

            socket.on('banned', function(room, banned, banner) {
                if (banned === SocketSrv.getNickName()) {
                    alert('You have been banned');
                    $location.path('/lobby');
                    SocketSrv.setSocket(socket);
                    $scope.$apply();
                }
            });

        }

        $scope.sendMessage = function() {
            if (socket) {
                var parameterIndex = $scope.usermessage.indexOf(' ') + 1;
                thevictim = $scope.usermessage.substring(parameterIndex, $scope.usermessage.length);

                if (kick.test($scope.usermessage)) {
                    socket.emit('kick', {
                        room: $scope.roomName,
                        user: thevictim
                    }, function(success) {
                        if (success) {
                            $scope.successText = 'You kicked ' + thevictim;
                            $scope.showSuccess = true;
                            $scope.$apply();
                        }
                    });

                } else if (partroom.test($scope.usermessage)) {
                    socket.emit('partroom', $scope.roomName);
                    $location.path('/lobby');

                } else if (ban.test($scope.usermessage)) {
                    socket.emit('ban', {
                        room: $scope.roomName,
                        user: thevictim
                    }, function(success) {
                        if (success) {
                            //alert("Success");
                            $scope.successText = 'You banned ' + thevictim;
                            $scope.showSuccess = true;
                            $scope.$apply();
                        }
                    });
                } else {
                    socket.emit('sendmsg', {
                        roomName: $scope.roomName,
                        msg: $scope.usermessage
                    });
                }

                //$scope.successText = $scope.usermessage;
                //$scope.showSuccess = true;
                $scope.usermessage = '';
            }

        };

        $scope.switchBool = function(value) {
            $scope[value] = !$scope[value];
        };
    }
]);
