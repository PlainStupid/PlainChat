app.controller('LobbyCtrl', ['$scope', 'SocketSrv','$location', function($scope, SocketSrv, $location) {

  $scope.lobbyUser = SocketSrv.getNickName(); //getting the user andd socket
  var socket = SocketSrv.getSocket();
  $scope.errormsg = '';

  socket.emit('rooms');
  socket.on('roomlist',function(data){ //call the server for a room list
    $scope.roomlist = data;
    $scope.$apply();
  });

  $scope.joinRoom = function(theRoom){  //needs work
    if(socket) {

      socket.emit('joinroom', { room: theRoom, pass: '' }, function(success, errorMessage) {});

      if(success)
      {
        $location.path('/room/{{room.theRoom}}');
      }
      else if(errorMessage)
      {
        $scope.errormsg = errorMessage;
      }
    }
  };
  $scope.createRoom = function() {  //also needs work :)
    if(socket) {
        socket.emit('joinroom', { room: $scope.roomName, pass: '' }, function(success, errorMessage) {});
        if(success)
        {
          $location.path('/room/{{room.theRoom}}');
        }
        else if(errorMessage)
        {
          $scope.errormsg = errorMessage;
        }
      }
  };

}]);
