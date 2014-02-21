app.factory('SocketSrv', [ function() {
	var nickname = ''	;
	var socketConection;
	return {
		setSocket: function(socketIn) {
			socketConection = socketIn;
		},
		setNickName: function(nicknameIn) {
			nickname = nicknameIn;
		},
		getNickName: function() {
			return nickname;
		},
		getSocket: function() {
			return socketConection;
		}
	};
}]);
