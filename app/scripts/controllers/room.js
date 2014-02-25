app.controller('RoomCtrl', ['$scope', '$location', '$routeParams', 'SocketSrv', 'PLAIN_URL',
    function($scope, $location, $routeParams, SocketSrv, PLAIN_URL) {

        var socket = SocketSrv.getSocket();

        $scope.glued = true;

        $scope.roomName = $routeParams.roomId;

        $scope.ops = [];

        var kick = /^\/kick\s.+$/;

        if (socket) {

            socket.emit('joinroom', {
                room: $scope.roomName,
                pass: ''
            }, function(success, errorMessage) {});

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

        }

        $scope.sendMessage = function() {
            if (socket) {
                var parameterIndex = $scope.usermessage.indexOf(' ') + 1;
                thevictim = $scope.usermessage.substring(parameterIndex, $scope.usermessage.length);

                if (kick.test($scope.usermessage)) {
                    socket.emit('kick', {
                        room: $scope.roomName,
                        user: thevictim
                    }, function(sucess, err) {
                        if (success) {
                            $scope.successText = 'You kicked ' + thevictim;
                            $scope.showSuccess = true;
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
