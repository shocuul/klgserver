angular.module('KLGServerApp',['ngSails','app-templates','ui.router','ngMessages','ui.bootstrap','ngFileUpload'])
  .run(function($rootScope,$state,Auth,CurrentUser, ServerService){
    console.log("¿Bienvenido a KLS que haces por aqui?");
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
    if(toState.name=="server.dashboard"){
      var serverExist = ServerService.checkifExist(toParams.idServer);
      console.log(serverExist)
      if(serverExist == null || serverExist == undefined){
        event.preventDefault();
        $state.go('user.dashboard');
      }
    }
    if(!Auth.authorize(toState.data.access)){
      event.preventDefault();
      $state.go('anon.login');
    }
    $rootScope.currentUser = CurrentUser.user();
  });

});

angular.module('KLGServerApp')
  .config(['$sailsProvider', function($sailsProvider){
    $sailsProvider.url = '/';
  }]);

// var app = angular.module('KLGServerApp', ['ngMaterial', 'ngSails']);
//
// app.controller('AppCtrl', ['$scope', '$sails', '$http', '$filter', '$interval', '$mdSidenav', '$mdDialog', function ($scope, $sails, $http, $filter, $interval, $mdSidenav, $mdDialog) {
//
//     $scope.toggleSidenav = function (menuId) {
//         $mdSidenav(menuId).toggle();
//     };
//
//     $scope.deletePost = function (postId) {
//
//         if (typeof postId === 'number') {
//
//             var req = {
//                 method: 'POST',
//                 url: '/posts/destroy?id=' + postId
//             };
//
//             $http(req);
//
//         }
//
//     };
//
//     $scope.determinateValue = 0;
//
//     $scope.$on('$destroy', function () {
//
//         $interval.cancel(postsLoading);
//
//     });
//
//     $scope.demo = {
//         topDirections: ['left', 'up'],
//         bottomDirections: ['down', 'right'],
//         availableModes: ['md-fling', 'md-scale'],
//         selectedMode: 'md-fling',
//         availableDirections: ['up', 'down', 'left', 'right'],
//         selectedDirection: 'down'
//     };
//
//     $scope.posts = [];
//
//     $scope.showAdvanced = function (ev) {
//         $mdDialog.show({
//             controller: DialogController,
//             templateUrl: '/templates/createNewPost.html',
//             parent: angular.element(document.body),
//             targetEvent: ev
//         })
//             .then(function (answer) {
//             $scope.alert = 'You said the information was "' + answer + '".';
//         }, function () {
//             $scope.alert = 'You cancelled the dialog.';
//         });
//     };
//
//     (function () {
//
//         $sails.get("/posts")
//             .success(function (data, status, headers, jwr) {
//
//             $scope.posts = data;
//             $scope.determinateValue = 100;
//
//         })
//             .error(function (data, status, headers, jwr) {
//
//             throw new Error(data);
//
//         });
//
//         $sails.on("posts", function (message) {
//
//             if (message.verb == "destroyed") {
//
//                 var index = $filter('getIndex')($scope.posts, parseInt(message.id, 10));
//                 $scope.posts.splice(index, 1);
//
//             } else if (message.verb == "created") {
//                 $scope.posts.push(message.data);
//             }
//
//         });
//
//     }());
//
// }]);
//
// function DialogController($scope, $mdDialog, $http) {
//
//     $scope.colors = ["green", "gray", "yellow", "blue", "purple", "red"];
//
//     $scope.createPost = function (newPost) {
//
//         var req = {
//             method: 'POST',
//             url: '/posts/create',
//             data: newPost
//         };
//
//         $http(req)
//             .success(function (data) {
//             $mdDialog.cancel();
//         })
//             .error(function (data) {
//             console.log(data);
//         });
//
//     };
//
//     $scope.hide = function () {
//         $mdDialog.hide();
//     };
//     $scope.cancel = function () {
//         $mdDialog.cancel();
//     };
//     $scope.answer = function (answer) {
//         $mdDialog.hide(answer);
//     };
// }
//
// app.filter('getIndex', function () {
//     return function (input, id) {
//         var i = 0,
//             len = input.length;
//         for (; i < len; i++) {
//             if (+input[i].id == +id) {
//                 return i;
//             }
//         }
//         return null;
//     };
// });
