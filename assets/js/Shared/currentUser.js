(function(angular){
  "use strict";
  angular.module('kls.services').factory('CurrentUser',['LocalService',factory]);
  
  function factory(){
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
