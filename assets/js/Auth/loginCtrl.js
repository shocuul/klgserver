(function(angular){
  "use strict";
  angular.module('kls.controllers',[]).controller('LoginCtrl',['$state','Auth',controller]);
  
  function controller($state,Auth){
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
})(angular);
