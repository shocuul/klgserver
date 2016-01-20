(function(angular){
    
    /**
     * @name Auth Factory
     * @desc Authentification Provider
     * @ngInject
     */
    function Auth ($http,LocalService,AccessLevels){
        var currentUser = {};
        var service = {
            authorize: authorize,
            isAutenticated: isAuthenticated,
            login: login,
            logout:logout,
            register:register,
            currentUser:currentUser
        }
        return service;
        /* Auth Factory Functions */
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
            currentUser = {};
        }
        
        function register(){
            LocalService.unset('auth_token');
            var register = $http.post('/auth/register', formData);
            register.success(function(result){
                LocalService.set('auth_token',JSON.stringify(result));
            });
            return register;
        }
    }
    /**
     * @name Auth Interceptor
     * @desc Interceptor to push the token to Header request
     * @ngInject
     */
    function AuthInterceptor($q,$injector){
        var LocalService = $injector.get('LocalService');
        var interceptor = {
            request: request,
            responseError: responseError
        }
        return interceptor;
        
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
    /**
     * @name pushInterceptor
     * @desc Push the interceptor to the http Provider
     * @ngInject
     */
    function pushInterceptor($httpProvider){
        $httpProvider.interceptors.push('AuthInterceptor');
    }
    /**
     * Angular Injection
     */
    angular
        .module('KaosLatinServer')
        .factory('Auth',Auth)
        .factory('AuthInterceptor',AuthInterceptor)
        .config(pushInterceptor);
})(angular);
