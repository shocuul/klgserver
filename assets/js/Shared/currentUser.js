angular.module('KLGServerApp')
  .factory('CurrentUser',function(LocalService){
  return{
    user: function(){
      if(LocalService.get('auth_token')){
        return angular.fromJson(LocalService.get('auth_token')).user;
      }else{
        return {};
      }
    }
  }
}).directive('showDuringResolve', function($rootScope){
  return {
    link: function(scope,element){
      element.css({display:'none'});

      var unregister = $rootScope.$on('$routeChangeStart',function(){
        element.css({display:'block'});
      });
      scope.$on('$destroy',unregister);
    }
  }
})
