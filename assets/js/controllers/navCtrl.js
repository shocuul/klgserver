angular.module('KLGServerApp')
  .controller('NavCtrl', function($scope, Auth, CurrentUser, $state){
    $scope.isCollapsed = true;
    $scope.auth = Auth;
    $scope.currentUser = CurrentUser.user;

    $scope.logout = function(){
      $state.go('anon.login');
      Auth.logout();
    }
  });
