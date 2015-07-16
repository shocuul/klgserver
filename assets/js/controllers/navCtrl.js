angular.module('KLGServerApp')
  .controller('NavCtrl', function($scope, Auth, CurrentUser){
    $scope.isCollapsed = true;
    $scope.auth = Auth;
    $scope.currentUser = CurrentUser.user;

    $scope.logout = function(){
      Auth.logout();
    }
  });
