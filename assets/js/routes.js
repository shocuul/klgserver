app.config(function($stateProvider,$urlRouterProvider,AccessLevels){
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
      templateUrl:'home.html'
    })
    .state('anon.login'{
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
        controller:'DashboardCtrl'
      });

    $urlRouterProvider.otherwise('/');
});
