(function(angular){
  "use strict";
  angular.module('kls.controllers',[]).controller('NavCtrl',['Auth','CurrentUser','$state','$rootScope', controller]);
  function controller(Auth, CurrentUser, $state, $rootScope){
    var vm = this;
    vm.auth = Auth;
    vm.logout = logout;
    
    function logout(){
      $state.go('anon.login');
      Auth.logout();
    }
    
  }
})(angular);