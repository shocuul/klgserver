angular.module('KLGServerApp')
  .controller('ServerPanelCtrl',function($scope,$sails,$http,CurrentUser, server){
    //console.log("Iniciado");
    $scope.server = server
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
    var currentServer = currentServer || {};
    return{
      getServerInfo:function(idServer){
        return $sails.get('/server/'+idServer).then(function(response){
          currentServer = response.data;
          return currentServer
        },function(err){
          console.log(err);
        })
      }
    }
  });
