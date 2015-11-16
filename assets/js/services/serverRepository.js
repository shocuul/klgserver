angular.module('KLGServerApp')
	.factory('ServerService',function($http,CurrentUser,$sails){
		var currentUser = CurrentUser.user;
		var UserServers = UserServers || [];
		(function(){

		})
		return{
			getAll: function(){
				return $sails.get('/user/'+currentUser().id+'/servers').then(function(response){
					// return $sails.get('/server/').then(function(response){
					UserServers = response.data;
					 $sails.on("server", function (message) {
					 	console.log("Estoy en el getAll");
					 	console.log(message);
					});


					return UserServers;
				},function(response){
					console.log("Error en getAll Server Service");
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
