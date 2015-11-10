angular.module('KLGServerApp')
  .controller('HomeController', function($scope){
    $scope.serversCS16 = [
      {
        name:'Counter Strike 1.6 Bronze',
        image:'images/cs16ServerBack.jpg',
        ram:'1GB',
        players:'8',
        price:'$10'
      },
      {
        name:'Counter Strike 1.6 Bronze',
        image:'images/cs16ServerBack.jpg',
        ram:'2GB',
        players:'16',
        price:'$25'
      },
      {
        name:'Counter Strike 1.6 Bronze',
        image:'images/cs16ServerBack.jpg',
        ram:'3GB',
        players:'26',
        price:'$30'
      },
      {
        name:'Counter Strike 1.6 Bronze',
        image:'images/cs16ServerBack.jpg',
        ram:'4GB',
        players:'32',
        price:'$40'
      }
    ]
    $scope.serversCSGO = [
      {
        name:'Counter Strike GO1',
        image:'images/csgoServerBack.jpg',
        ram:'1GB',
        players:'8',
        price:'$10'
      },
      {
        name:'Counter Strike GO2',
        image:'images/csgoServerBack.jpg',
        ram:'2GB',
        players:'16',
        price:'$20'
      },
      {
        name:'Counter Strike GO3',
        image:'images/csgoServerBack.jpg',
        ram:'4GB',
        players:'24',
        price:'$30'
      },
      {
        name:'Counter Strike GO4',
        image:'images/csgoServerBack.jpg',
        ram:'8GB',
        players:'36',
        price:'$40'
      },
      {
        name:'Counter Strike GO5',
        image:'images/csgoServerBack.jpg',
        ram:'16GB',
        players:'48',
        price:'$50'
      }
    ]
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
