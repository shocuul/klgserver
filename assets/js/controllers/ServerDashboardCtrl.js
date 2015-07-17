angular.module('KLGServerApp')
  .controller('ServerDashboardCtrl',function($scope,$sails,$http){
    //console.log("Iniciado");
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
  });
