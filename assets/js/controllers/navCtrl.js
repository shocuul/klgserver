angular.module('KLGServerApp')
  .controller('NavCtrl', function($scope, Auth, CurrentUser, $state, $rootScope){
    $scope.auth = Auth;
    $scope.logout = function(){
      $state.go('anon.login');
      Auth.logout();
    }
  });
