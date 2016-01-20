(function(angular){
	"use strict";
	angular.module('KLSAdmin')
	.service('UserService',['$sails',service]);
	function service($sails){
		var users = users || [];
		return {
			getAll:all
		}
		
		function all(){
			return $sails.get('/user').then(function(response){
				users = response.data;
				return users;
			},function(response){
				console.log("Error getting users")
			})
		}
	}
})(angular);