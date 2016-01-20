(function(angular){
	"use strict";
	angular.module('KLSAdmin')
	.constant('AccessLevels',{
		anon:0,
		user:1
	})
	.factory('Auth',['$http','LocalService','AccessLevels',factory])
	.factory('AuthInterceptor',['$q','$injector', authInterceptor])
	.config(pushInterceptor);
	
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
				if(result.user.admin){
					LocalService.set('auth_token',JSON.stringify(result));
					currentUser = angular.fromJson(LocalService.get('auth_token')).user;
				}
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
	
	function authInterceptor($q,$injector){
    var LocalService = $injector.get('LocalService');
    var interceptor = {
      request: request,
      responseError: responseError
    }
    return interceptor;
    /* Auth Interceptor Functions */
    function request(config){
      var token;
      if(LocalService.get('auth_token')){
        token = angular.fromJson(LocalService.get('auth_token')).token;
      }
      if(token){
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
    
    function responseError(response){
      if(response.status === 401 || response.status === 403){
        LocalService.unset('auth_token');
        $injector.get('$state').go('anon.login');
      }
      return $q.reject(response);
    }
  }
  
  function pushInterceptor($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
  } 
	
})(angular);