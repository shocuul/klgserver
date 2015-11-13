angular.module('KLGServerApp')
	.factory('Servers',function($http,CurrentUser){
		var currentUser = CurrentUser.user;
		var UserServers = servers || [];
		return{
			getAll: function(){
				return $http.get('/user/'+currentUser().id+'/servers').then(function(servers){
					UserServers = servers;
					return servers
				});
			},
			create: function(newServer){
				return $http.post('/user/'+currentUser().id+'/server',newServer);
			},
			remove: function(server){
				return $http.delete('/user/'+currentUser().id+'/server/'+server.id);
			}
		}
	})
