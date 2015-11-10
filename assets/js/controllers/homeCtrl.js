angular.module('KLGServerApp')
  .controller('HomeController', function($scope){
    $scope.nombre = "Jose David"
    $scope.serversMinecraft = [
      {
        name:'Minecraft 0.5',
        image:'images/minecraftServerBack.jpg',
        ram:'256MB',
        players:'5',
        price: '$2.5'
      },
      {
        name:'Minecraft 1',
        image:'images/minecraftServerBack.jpg',
        ram:'512MB',
        players:'25',
        price: '$5'
      },
      {
        name:'Minecraft 1.5',
        image:'images/minecraftServerBack.jpg',
        ram:'754MB',
        players:'35',
        price: '$10'
      },
      {
        name:'Minecraft 2',
        image:'images/minecraftServerBack.jpg',
        ram:'1GB',
        players:'50',
        price: '$20'
      },
      {
        name:'Minecraft 2.5',
        image:'images/minecraftServerBack.jpg',
        ram:'1.5GB',
        players:'75',
        price: '$30'
      }
    ]
	  $scope.image = [
		  '/images/csgoBanner.jpg',
		  '/images/minecraftBanner.jpg',
		  '/images/cs16Banner.jpg'
	  ];
  });
