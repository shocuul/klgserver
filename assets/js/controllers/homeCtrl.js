angular.module('KLGServerApp')
  .controller('HomeController', function($scope){
    
	  $scope.image = {
		  csgo:'/images/csgoBanner.jpg',
		  minecraft:'/images/minecraftBanner.jpg',
		  cs16:'/images/cs16Banner.jpg'
	  };
  });
