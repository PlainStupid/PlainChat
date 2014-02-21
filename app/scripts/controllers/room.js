app.controller('RoomCtrl', ['$scope', '$location', 'SocketSrv', 'PLAIN_URL',
    function($scope, $location, SocketSrv, PLAIN_URL) {

        //$scope.roomName = $routeParams.roomName;
        $scope.roomName = 'Næsroom';

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

        $scope.roomMessages = $scope.messageHistory;
        $scope.users = ['Ragnar', 'Kristinn', 'Jesús', 'Allah', 'Búdda', 'Holy'];
        /*

        nick : socket.username,
        timestamp :  new Date(),
        message : data.msg.substring(0, 200)
        var socket = SocketSrv.getSocket();

        if (socket) {

            socket.emit('joinroom', {
                room: $scope.roomName
            }, function(success, err));

            socket.on('updateusers', function(room, users) {
                //if (room === $scope.roomName) {
                // FIXME
                $scope.users = ['Ragnar', 'Kristinn', 'Jesús', 'Allah', 'Búdda', 'Holy'];
                //}
            });
        }*/
    }
]);
