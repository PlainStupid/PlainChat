
app.controller("LoginCtrl", ["$scope", function($scope) {

  $scope.mymessage = "";
  $scope.username = "";

  var socket = io.connect('http://localhost:8080');

  $scope.connect = function(){
    if(socket)
    {
      socket.emit("adduser", $scope.username, function(available){
        if(available)
        {
          window.alert("available");
        }
        else
        {
          window.alert("not available");
        }
      });
    }
  };
}]);
