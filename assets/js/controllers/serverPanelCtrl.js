angular.module('KLGServerApp')
  .controller('ServerPanelCtrl',function($scope,$sails,$http,CurrentUser){
    //console.log("Iniciado");
    $scope.imagenFondo = ""
    var userId = CurrentUser.user().id;
    console.log(userId);
    $scope.create = function(){
      console.log("enter");
      var req = {
                 method: 'POST',
                 url: '/server/new'
             };

             $http(req)
                 .success(function (data) {
                 console.log(data);
             })
                 .error(function (data) {
                 console.log(data);
             });
    }
  }).factory('ServerControl',function($sails){
    return{
      
    }
  });
