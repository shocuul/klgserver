angular.module('KLGServerApp')
  .controller('LoginCtrl',function($scope,$state,Auth){
  $scope.errors = [];

  $scope.login = function(){
    $scope.errors = [];
    Auth.login($scope.user).success(function(result){
      $state.go('user.dashboard');
    }).error(function(err){
      $scope.errors.push(err);
    });
  }
});
