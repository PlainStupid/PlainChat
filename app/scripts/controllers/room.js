app.controller('RoomCtrl', ['$scope', '$location', 'SocketSrv', 'PLAIN_URL',
function($scope, $location, $routeParams, SocketSrv, PLAIN_URL) {

    var socket = SocketService.getSocket();
    $scope.roomName = $routeParams.roomName;
    //$scope.roomName = 'Næsroom';

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

    if (socket) {

        socket.emit('joinroom', {
            room: $scope.roomName
        }, function(success, err));

        $scope.roomMessages = $scope.messageHistory;

        socket.on("updateusers", function(room, users) {
                if (room === $scope.roomName) {
                    $scope.users = users;
                }
            });
    });
/*

        nick : socket.username,
        timestamp :  new Date(),
        message : data.msg.substring(0, 200)
        }*/
}]);
