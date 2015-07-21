angular.module('KLGServerApp')
	.factory('Servers',function($http,CurrentUser){
		var currentUser = CurrentUser.user;
		return{
			getAll: function(){
				return $http.get('/user/'+currentUser().id+'/server');
			},
			create: function(server){
				return $http.post('/user/'+currentUser().id+'/server',{name:'ServerPrueba',game:'minecraft'});
			},
			remove: function(server){
				return $http.delete('/user/'+currentUser().id+'/server/'+server.id);
			}
		}
	})