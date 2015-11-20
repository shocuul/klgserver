angular.module('KLGServerApp')
  .config(function($stateProvider,$urlRouterProvider,AccessLevels){
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
      templateUrl:'home.html',
      controller:'HomeController'
    })
    .state('anon.login',{
      url:'/login',
      templateUrl:'auth/login.html',
      controller: 'LoginCtrl'
    })
    .state('anon.register',{
      url:'/register',
      templateUrl:'auth/register.html',
      controller:'RegisterCtrl'
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
        templateUrl:'user/dashboard.html',
        controller:'DashboardCtrl',
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
        templateUrl:'server/panel.html',
        controller:'ServerPanelCtrl',
        resolve:{
          selectServer:function($stateParams, ServerControl){
            return ServerControl.getServerInfo($stateParams.idServer);
          }
        }
      });

    $urlRouterProvider.otherwise('/');
});
