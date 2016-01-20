(function(angular){
  "use strict";
  angular.module('KaosLatinServer').config(['$stateProvider','$urlRouterProvider','AccessLevels',configureStates]);
  function configureStates($stateProvider,$urlRouterProvider,AccessLevels){
    $stateProvider
      .state('anon',{
        abstract: true,
        template:'<ui-view/>',
        data:{
          access: AccessLevels.anon
        }
    })
    .state('anon.home',{
      url:'/',
      templateUrl:'Home/home.html',
      controller:'HomeController',
      controllerAs:'vm'
    })
    .state('anon.login',{
      url:'/login',
      templateUrl:'Auth/login.html',
      controller: 'LoginCtrl',
      controllerAs:'vm'
    })
    .state('anon.register',{
      url:'/register',
      templateUrl:'Auth/register.html',
      controller:'RegisterCtrl',
      controllerAs:'vm'
    });

    $stateProvider
      .state('user',{
        abstract:true,
        template:'<ui-view/>',
        data:{
          access: AccessLevels.user
        }
      })
      .state('user.dashboard',{
        url:'/dashboard',
        templateUrl:'User/dashboard.html',
        controller:'DashboardCtrl',
        controllerAs:'vm',
        resolve:{
        servers:function(ServerService){
             return ServerService.getAll();
           }
        }
      });

    $stateProvider
      .state('server',{
        abstract:true,
        template:'<ui-view/>',
        data:{
          access: AccessLevels.user
        }
      })
      .state('server.dashboard',{
        url:'/server/:idServer',
        templateUrl:'ServerPanel/panel.html',
        controller:'ServerPanelCtrl',
        controllerAs:'vm',
        resolve:{
          selectServer:function($stateParams, ServerControl){
            return ServerControl.getServerInfo($stateParams.idServer);
          }
        }
      });

    $urlRouterProvider.otherwise('/');
}
  
  
})(angular);
