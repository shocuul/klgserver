(function(angular){
  "use strict";
  /**
   * @name NavCtrl
   * @desc Navigation
   * @ngInject
   */
  function NavCtrl(Auth, CurrentUser, $state, $rootScope){
    var vm = this;
   
    vm.logout = logout;
    vm.auth = Auth;
    
    $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,formParams){
      vm.currentUser = CurrentUser.user();
    });
    function logout(){
      $state.go('anon.login');
      Auth.logout();
    }
    
  }
  
  angular.module('KaosLatinServer').controller('NavCtrl', NavCtrl);
})(angular);