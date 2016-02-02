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
//option_name steamcmdDir , cs16 BaseDir ,
var defaultValues = {
  dir_minacraft_spigot: ''
}
var checkForRequiredValues = function(){
  Options.find().exec(function(err, options){
    sails.log(options.length);
    sails.log(options[0]);

  })
}

var prepareDirs = function(){
  var folders = __filename.split('/');
  folders.shift();
  var pivot = 0;
  for (var i = 0; i < folders.length; i++) {
    if (folders[i] == "home") {
      pivot = i;
    }
  }
  pivot = pivot + 2;
  folders.splice(pivot,folders.length);
  folders = '/' + folders.join('/');
  sails.log(folders);
}


module.exports = {
  checkForAdminUser : checkForAdminUser,
  checkForRequiredValues : checkForRequiredValues,
  prepareDirs : prepareDirs
}
