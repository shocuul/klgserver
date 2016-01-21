(function(angular){
  "use strict";
  /**
   * @name CUrrentUser
   * @desc return the current user 
   * @ngInject
   */
  function CurrentUser(LocalService){
    return {
      user : user
    }
    function user(){
      if(LocalService.get('auth_token')){
        return angular.fromJson(LocalService.get('auth_token')).user;
      }else{
        return {};
      }
    }
  }
  
  angular.module('KaosLatinServer')
    .factory('CurrentUser',CurrentUser);
  
})(angular);
/*directive('showDuringResolve', function($rootScope){
  return {
    link: function(scope,element){
      element.css({display:'none'});

      var unregister = $rootScope.$on('$routeChangeStart',function(){
        element.css({display:'block'});
      });
      scope.$on('$destroy',unregister);
    }
  }
})*/
