(function(angular){
  "use strict";
  angular.module('kls.controllers',[]).controller('RegisterCtrl',['$state','Auth',controller]);
  
  function controller($state,Auth){
    var vm = this;
    vm.errors = [];
    vm.register = register;
    
    function register(){
      Auth.register(vm.user).then(function(){
        $state.go('anon.home');
      }),function(err){
        vm.errors.push(err);
      }
    }
  }
})(angular);
