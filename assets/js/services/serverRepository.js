angular.module('KLGServerApp')
	.factory('ServerService',function($http,CurrentUser,$sails){
		var currentUser = CurrentUser.user;
		var UserServers = UserServers || [];
		(function(){
			$sails.on("server", function (message) {
				console.log("Estoy en el on");
				console.log(message);
			});
		})
		return{
			getAll: function(){
				return $http.get('/user/'+currentUser().id+'/servers').then(function(response){
					UserServers = response.data;
					//console.log(response.data);
					return UserServers
				});
			},
			create: function(newServer){
				return $http.post('/user/'+currentUser().id+'/servers',newServer);
			},
			remove: function(server){
				return $http.delete('/user/'+currentUser().id+'/servers/'+server.id);
			}
		}
	});
