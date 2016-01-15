(function(angular){
	"use strict";
	angular.module('KLSAdmin')
	.constant('AccessLevels',{
		anon:0,
		user:1
	})
	.factory('Auth',['$http','LocalService','AccessLevels',factory]);
	
	function factory($http, LocalService, AccessLevels){
		
		var currentUser = null;
		
		var service = {
			authorize:authorize,
			isAuthenticated:isAuthenticated,
			login:login,
			logout:logout,
			register:register,
			currentUser:currentUser
		}
		return service;
		/* Factory Functions */
		function authorize(access){
			if(access == AccessLevels.user){
				return this.isAuthenticated();
			}else{
				return true;
			}
		}
		
		function isAuthenticated(){
			return LocalService.get('auth_token');
		}
		
		function login(credentials){
			var login = $http.post('/auth/authenticate',credentials);
			login.success(function(result){
				LocalService.set('auth_token',JSON.stringify(result));
				currentUser = angular.fromJson(LocalService.get('auth_token')).user;
			});
			return login;
		}
		
		function logout(){
			LocalService.unset('auth_token');
			currentUser = null;
		}
		function register(formData){
			LocalService.unset('auth_token');
			var register = $http.post('/auth/register',formData);
			register.success(function(result){
				LocalService.set('auth_token',JSON.stringify(result));
			});
			return register;
		}
		
	} 
	
})(angular);