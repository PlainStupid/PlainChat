app.controller('LobbyCtrl', ['$scope', 'SocketSrv', function($scope, SocketSrv) {

  $scope.lobbyUser = SocketSrv.getNickName();
  //var socket = SocketSrv.getSocket();

  //TODO: get the list of rooms from server

}]);
