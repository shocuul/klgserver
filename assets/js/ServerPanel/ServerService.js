(function(angular){
	"use strict";
	
	function ServerControl($sails){
		var currentServer = currentServer || {};
		var service = {
			getServerInfo:getServerInfo,
			startServer:startServer,
			getTree:getTree,
			getResource:getResource,
			writeResource:writeResource
		}
		return service;
		
		/* Factory Functions */
		
		function getServerInfo(idServer){
			return $sails.get('/server/'+idServer).then(function(response){
          		currentServer = response.data;
          		return currentServer
        	},function(err){
          
        	})
		}
		
		function startServer(){
			return $sails.post('/server/'+currentServer.id+'/start').then(function(response){
          
        	})
		}
		
		function getTree(){
			if(idResource != undefined){
				var data = {
					id: idResource
				}
			}else{
				var data = {}
			}
			return $sails.post('/server/'+currentServer.id+'/tree',data).then(function(response){
			return response.data;
			})
		}
		
		function getResource(){
			var data = {
          		resource: idResource
        	}
       		return $sails.post('/server/'+currentServer.id+'/resource',data).then(function(response){
          		return response.data;
        	})
		}
		
		function writeResource(operation,idResource,content){
			var data = {
          		operation:operation,
          		resource: idResource,
          		content: content
        	}
        	return $sails.post('/server/'+currentServer.id+'/write',data).then(function(response){
          		return response;
        	})
		}
	}
    
     angular.module('KaosLatinServer')
     .factory('ServerControl',ServerControl);
})(angular);