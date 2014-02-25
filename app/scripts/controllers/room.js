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
        var op = /^\/op\s.+$/;
        var deop = /^\/deop\s.+$/;
        var unban = /^\/unban\s.+$/;
        var settopic = /^\/settopic\s.+$/;
        var privatemsg = /^\/privatemsg\s\S.+\s.+$/;

        if (socket) {

            socket.emit('joinroom', {
                room: $scope.roomName,
                pass: ''
            }, function(success, errorMessage) {
                if (!success) {
                    if (errorMessage === 'banned') {
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

            socket.on('updatetopic', function(room, topic, username) {
                if (room === $scope.roomName) {
                    $scope.roomTopic = topic;
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

            socket.on('recv_privatemsg', function(user, message) {
                alert('Private message from ' + user + ': ' + message);
            })

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
                        } else {
                            $scope.errorText = 'There was an error kicking the user. Maby you arent an op';
                            $scope.showError = true;
                            $scope.$apply();
                        }
                    });

                } else if (partroom.test($scope.usermessage)) {
                    socket.emit('partroom', $scope.roomName);
                    $location.path('/lobby');

                } else if (op.test($scope.usermessage)) {
                    socket.emit('op', {
                        room: $scope.roomName,
                        user: thevictim
                    }, function(success) {
                        if (success) {
                            $scope.successText = hevictim + ' is now an op';
                            $scope.showSuccess = true;
                            $scope.$apply();
                        } else {
                            $scope.errorText = 'There was an error trying to make someone an op. Maby you arent an op';
                            $scope.showError = true;
                            $scope.$apply();
                        }
                    });
                } else if (deop.test($scope.usermessage)) {
                    socket.emit('deop', {
                        room: $scope.roomName,
                        user: thevictim
                    }, function(success) {
                        if (success) {
                            $scope.successText = 'You deoped ' + thevictim;
                            $scope.showSuccess = true;
                            $scope.$apply();
                        } else {
                            $scope.errorText = 'There was an error deoping the user. Maby you arent an op';
                            $scope.showError = true;
                            $scope.$apply();
                        }
                    });
                } else if (ban.test($scope.usermessage)) {
                    socket.emit('ban', {
                        room: $scope.roomName,
                        user: thevictim
                    }, function(success) {
                        if (success) {
                            $scope.successText = 'You banned ' + thevictim;
                            $scope.showSuccess = true;
                            $scope.$apply();
                        } else {
                            $scope.errorText = 'There was an error banning the user. Maby you arent an op';
                            $scope.showError = true;
                            $scope.$apply();
                        }
                    });
                } else if (unban.test($scope.usermessage)) {
                    socket.emit('unban', {
                        room: $scope.roomName,
                        user: thevictim
                    }, function(success) {
                        if (success) {
                            $scope.successText = 'You unbanned ' + thevictim;
                            $scope.showSuccess = true;
                            $scope.$apply();
                        } else {
                            $scope.errorText = 'There was an error unbanning the user. Maby you arent an op';
                            $scope.showError = true;
                            $scope.$apply();
                        }
                    });
                } else if (settopic.test($scope.usermessage)) {
                    socket.emit('settopic', {
                        room: $scope.roomName,
                        topic: thevictim
                    }, function(success) {
                        if (success) {
                            $scope.successText = 'You changed the topic successfully';
                            $scope.showSuccess = true;
                            $scope.$apply();
                        } else {
                            $scope.errorText = 'There was an error changing the topic. Maby you arent an op';
                            $scope.showError = true;
                            $scope.$apply();
                        }
                    });
                } else if (privatemsg.test($scope.usermessage)) {
                    var nextIndex = thevictim.indexOf(' ') + 1;
                    var nnn = thevictim.indexOf(' ');
                    theNick = thevictim.substring(0, nnn)
                    theMessages = thevictim.substring(nextIndex, thevictim.length);
                    socket.emit('privatemsg', {
                        message: theMessages,
                        nick:theNick
                    }, function(success) {
                        if (success) {
                            $scope.successText = 'You successfully sent the private message';
                            $scope.showSuccess = true;
                            $scope.$apply();
                        } else {
                            $scope.errorText = 'There was an error sending private message.';
                            $scope.showError = true;
                            $scope.$apply();
                        }
                    })
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
