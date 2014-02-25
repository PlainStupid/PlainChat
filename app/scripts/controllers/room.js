app.controller('RoomCtrl', ['$scope', '$location', '$routeParams', 'SocketSrv', 'PLAIN_URL',
    function($scope, $location, $routeParams, SocketSrv, PLAIN_URL) {

        var socket = SocketSrv.getSocket();
        //$scope.roomName = $routeParams.roomName;
        /*$scope.roomName = 'Næsroom';

        $scope.messageHistory = [{
            nick: 'Ragnar',
            timestamp: '1288323623006',
            message: 'Flott skilaboð'
        }, {
            nick: 'Kristinn',
            timestamp: '1288323628888',
            message: 'Flott skilaboð'
        }, {
            nick: 'Ragnar',
            timestamp: '1288343323006',
            message: 'Flott skilaboð'
        }, {
            nick: 'Jesús',
            timestamp: '1288523623006',
            message: 'Flott skilaboð'
        }];

        $scope.uss = [{
            username: 'ragnar'
        }, {
            username: 'kiddi'
        }];

        $scope.users = $scope.uss;

        $scope.roomMessages = $scope.messageHistory;

        */

        //$scope.users = '';
        //
        $scope.glued = true;

        $scope.roomName = $routeParams.roomId;

        $scope.ops = [];

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

                socket.emit('sendmsg', {
                    roomName: $scope.roomName,
                    msg: $scope.usermessage
                });

                $scope.successText = $scope.usermessage;
                $scope.showSuccess = true;
                $scope.usermessage = '';
            }

        };

        $scope.switchBool = function(value) {
            $scope[value] = !$scope[value];
        };

        /*

    if (socket) {

        socket.emit('joinroom', {
            room: $scope.roomName
        }, function(success, err));

        $scope.roomMessages = $scope.messageHistory;

        socket.on('updateusers', function(room, users) {
                if (room === $scope.roomName) {
                    $scope.users = users;
                }
            });
    });*/
        /*

        nick : socket.username,
        timestamp :  new Date(),
        message : data.msg.substring(0, 200)
        }*/
    }
]);
