(function(angular){
  "use strict";
  
  
  
  function routes($stateProvider,$urlRouterProvider,AccessLevels){
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
      });
      

    $stateProvider
      .state('server',{
        abstract:true,
        template:'<ui-view/>',
        data:{
          access: AccessLevels.user
        }
      });
      

    $urlRouterProvider.otherwise('/');
}

angular.module('KaosLatinServer').config(routes);
  
  
})(angular);
