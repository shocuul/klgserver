(function(angular){
	"use strict";
	
	/**
     * @name ServerService
     * @ngInject
     */
	function ServerService(CurrentUser,$sails,$filter){

		var currentUser = CurrentUser.user,
			UserServers = UserServers || [];
	
		var service = {
			getAll : getAll,
			create: create,
			remove: remove,
			checkIfExist: checkIfExist
		}
		return service;
	
		function getAll(){
			return $sails.get('/user/'+currentUser().id+'/servers').then(function(response){
						// return $sails.get('/server/').then(function(response){
						UserServers = response.data;
						console.log(response.data);
						$sails.on("server",function(message){
							if(message.verb == "destroyed"){
								var index = $filter('getIndex')(UserServers, parseInt(message.id,10));
								UserServers.splice(index, 1);
							}else if(message.verb == "created"){
								// temporal fix to add dont owner server to list
								if(message.data.owner == currentUser().id){
									UserServers.push(message.data);
								}
							}else if(message.verb == "updated"){
								var index = $filter('getIndex')(UserServers, parseInt(message.id,10));
								var server = UserServers[index];
								server.ready = message.data.ready;
								UserServers.splice(index,1,server);
							}
						});
	
	
						return UserServers;
					},function(response){
						console.log("Error en getAll Server Service");
			});
		}
		
		function create(newServer){
			return $http.post('/user/'+currentUser().id+'/servers',newServer);
		}
		
		function remove(server){
			return $http.delete('/user/'+currentUser().id+'/servers/'+server.id);
		}
		
		function checkIfExist(idServer){
			return $filter('getIndex')(UserServers, parseInt(idServer,10));
		}
	}
	
	function getIndex(){
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
	}
    
    angular.module('KaosLatinServer')
    .factory('ServerService',ServerService)
    .filter('getIndex',getIndex);
	
})(angular);