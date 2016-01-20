(function(angular){
  "use strict";
  /**
   * @name NavCtrl
   * @desc Navigation
   * @ngInject
   */
  function NavCtrl(Auth, CurrentUser, $state, $rootScope){
    var vm = this;
    vm.auth = Auth;
    vm.logout = logout;
    
    function logout(){
      $state.go('anon.login');
      Auth.logout();
    }
    
  }
  
  angular.module('KaosLatinServer').controller('NavCtrl', NavCtrl);
})(angular);