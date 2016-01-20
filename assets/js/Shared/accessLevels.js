(function(angular){
  "use strict";
  angular.module('kls.services',[])
    .constant('AccessLevels',{
    anon:0,
    user:1
  });
})(angular);

