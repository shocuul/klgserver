angular.module('KLGServerApp')
  .controller('RegisterCtrl',function($scope,$state, Auth){
    $scope.errors = [];
    $scope.register = function(){
      console.log("Click on register")
      Auth.register($scope.user).then(function(){
        $state.go('anon.home');
      }),function(err){
        console.log("error");
        $scope.errors.push(err);
      };
    }
  });
