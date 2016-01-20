(function(angular){
	"use strict";
	angular.module('KLSAdmin').
	service('ServerService',['$sails',service]);
	function service($sails){
		var servers = servers || [];
		return {
			getAll:all
		}
		
		function all(){
			return $sails.get('/server').then(function(response){
				servers = response.data;
				return servers;
			},function(response){
				console.log("Error on getting servers service");
			})
		}
	}
})(angular);