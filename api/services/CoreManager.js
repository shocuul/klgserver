//function for check if admin user exist if not create new with config data
var checkForAdminUser = function(){
  var Promise = require('promise');
  var deferred = new Promise(function(resolve, reject){
    User.findOne({admin:true}).exec(function(err, record){
      if(record){
        sails.log('Admin User Found' + record.email);
        resolve();
      }else{
        sails.log.info('------------------------------');
        sails.log.info('No admin user found, creating one...');
        User.create({name: sails.config.server.name, email: sails.config.server.email, password: sails.config.server.password}).exec(function(err,user){
          if(err){
            sails.log(err);
            reject(err);
          }
          if(user){
            sails.log.info('Admin user created. ' + user.email);
            resolve();
          }
        })
      }
    },function(err){
      sails.log(err);
      reject(err);
    })
  });
  return deferred;
}

var checkForRequiredValues = function(){
  Options.find().exec(function(err, options){
    sails.log(options.length);
    sails.log(options[0]);

  })
}


module.exports = {
  checkForAdminUser : checkForAdminUser,
  checkForRequiredValues : checkForRequiredValues
}
