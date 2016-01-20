(function(angular){
  "use strict";
  /**
   * @name LoginCtrl
   * @desc Login Controller
   * @ngInject */  
  function LoginCtrl($state,Auth){
    var vm = this;
    vm.errors = [];
    vm.login = login;
    
    
    function login(){
      vm.errors = [];
      Auth.login(vm.user).success(function(result){
        $state.go('user.dashboard');
      }).error(function(err){
        vm.errors.push(err);
      })
    }
  }
  
  angular.module('KaosLatinServer').controller('LoginCtrl',LoginCtrl);
  
})(angular);
