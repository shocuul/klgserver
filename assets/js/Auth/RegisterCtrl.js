(function(angular){
  "use strict";
  
  function RegisterCtrl($state,Auth){
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
  
  angular.module('KaosLatinServer').controller('RegisterCtrl',RegisterCtrl);
})(angular);
