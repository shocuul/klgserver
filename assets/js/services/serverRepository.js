angular.module('KLGServerApp')
	.factory('ServerService',function($http,CurrentUser,$sails, $filter){
		var currentUser = CurrentUser.user;
		var UserServers = UserServers || [];
		(function(){

		})
		return{
			getAll: function(){
				return $sails.get('/user/'+currentUser().id+'/servers').then(function(response){
					// return $sails.get('/server/').then(function(response){
					UserServers = response.data;
					console.log(response.data);
					 $sails.on("server", function (message) {
						 console.log(message);
					 	if(message.verb == "destroyed"){
							 var index = $filter('getIndex')(UserServers, parseInt(message.id,10));
							 UserServers.splice(index, 1);
							 console.log(UserServers);
						 }else if(message.verb == "created"){
							 // temporal fix to add dont owner server to list
							 if(message.data.owner == currentUser().id){
								 UserServers.push(message.data);
							 }
						 }else if(message.verb == "updated"){
							 var index = $filter('getIndex')(UserServers, parseInt(message.id,10));
							 UserServers.splice(index,1,message.data);
						 }
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
	})
	.filter('getIndex', function(){
		return function(input, id){
			var i = 0,
				len = input.length;
			for(; i < len; i++){
				if(+input[i].id == +id){
					return i;
				}
			}
			return null;
		}
	});
