//function for check if admin user exist if not create new with config data
var fs = require('fs');
var steamcmdDir;
var csgoDir;
var Promise = require('promise');
var checkForAdminUser = function(){
  var deferred = new Promise(function(resolve, reject){
    User.findOne({admin:true}).exec(function(err, record){
      sails.log(record);
      if(record){
        sails.log('Admin User Found' + record.email);
        resolve();
      }else{
        sails.log.info('------------------------------');
        sails.log.info('No admin user found, creating one...');
        User.create({name: sails.config.server.name, email: sails.config.server.email, password: sails.config.server.password,admin:true}).exec(function(err,user){
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

var installSteamCmd = function(){
  var deferred = new Promise(function(resolve, reject){
    var shell = require('shelljs');
    shell.cd(steamcmdDir);
    if (!test('-f', steamcmdDir + 'steamcmd.sh')){
      // Steamcmd no instalado
      shell.exec('wget http://media.steampowered.com/installer/steamcmd_linux.tar.gz');
      sails.log("Archivo Existe");
      shell.exec('tar -xvzf steamcmd_linux.tar.gz');
      shell.rm('steamcmd_linux.tar.gz');
      shell.exec('./steamcmd.sh +quit');
      resolve();
    }else{
      // Steam Instalado
      resolve();
    };
  })
  return deferred;
}

var installCsgo = function(){
  var deferred = new Promise(function(resolve, reject){
    var shell = require('shelljs');
    shell.cd(steamcmdDir);
    shell.exec('./steamcmd.sh +login anonymous +force_install_dir '+ csgoDir +' +app_update 740 +quit');
    resolve();
  })
  return deferred;
}

var prepareDirs = function(){
  var folders = __filename.split('/');
  folders.shift();
  var pivot = 2;
  folders.splice(pivot,folders.length);
  folders = '/' + folders.join('/');
  // Create Default Installation Folders
  steamcmdDir = folders + sails.config.server.steamCmdDir;
  csgoDir = folders + sails.config.server.csgoBaseDir;
  //Create directories
  mkdir('-p', steamcmdDir, csgoDir);
  ValuesManager.saveValue('steamcmd',steamcmdDir);
  ValuesManager.saveValue('csgoDir',csgoDir);
  sails.log(steamcmdDir);
  sails.log(csgoDir);
  installSteamCmd().then(function(){
    installCsgo();
  });
}

function returnVar (varName){
  if(varName == 'steam'){
    return steamcmdDir;
  }
  if(varName == 'csgo'){
    return csgoDir;
  }
}

module.exports = {
  checkForAdminUser : checkForAdminUser,
  checkForRequiredValues : checkForRequiredValues,
  prepareDirs : prepareDirs,
  steamcmdDir: returnVar('steam'),
  csgoDir:returnVar('csgo')
}
