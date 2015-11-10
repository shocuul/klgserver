angular.module('KLGServerApp')
  .controller('HomeController', function($scope){
    $scope.nombre = "Jose David"
	  $scope.image = [
		  '/images/csgoBanner.jpg',
		  '/images/minecraftBanner.jpg',
		  '/images/cs16Banner.jpg'
	  ];
  });
