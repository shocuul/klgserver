/**
* Server.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
  	name:{
  		type:'string'
  	},
  	game:{
  		type:'string',
  		enum:['minecraft','cs16','csgo'],
  		required:true
  	},
    port:{
      type:'integer'
    },
    ready:{
      type:'boolean',
      defaultsTo:false
    },
    base_dir:{
      type:'string'
    },
    num_player:{
      type:'integer',
      required:true
    },
    configuration:{
      type:'json'
    },
    //Asosiations
    owner:{
  		model:'user'
  	},
    logs:{
      collection:'serverlog',
      via:'by'
    },
    startServer:function(){
      var shell = require('shelljs');
      shell.cd(this.base_dir);
      shell.exec('screen -AmdS '+this.name+' ./'+this.configuration.daemon_game+' +ip '+sails.config.server.ip+' +port '+this.configuration.port+' +maxplayers '+this.max_player+' +map '+this.configuration.map+' '+this.configuration.extraParams+'',{async:true});
    }
  },
  afterUpdate:function(record, cb){
    sails.log(record)
    if(record.owner == null){
      sails.log("Entro a record.owner == null");
      Server.destroy(record.id).exec(function(err, record){
        if(err){cb(err);}else { cb(); }
      });
    }else{
      cb();
    }
  },
  //Antes de crear un servidor
  beforeCreate:function(values, cb){
    switch(values.game){
      case 'cs16':
        break;
      case 'csgo':
        break;
      default:
        sails.log.error('Algo salio mal en beforeCreate de Servers');
        break;
    }
    cb();
  },
  beforeDestroy:function(values, cb){
    sails.log(values.where.id)
    Server.findOne(values.where.id).exec(function(err, record){
      rm('-Rf',record.base_dir);
      cb();
    })
  },
  // Despues de crear un servidor
  afterCreate:function(record, cb){
    sails.log.warn(record.id)
    var serverName = '';
    Server.findOne(record.id).exec(function(err, record){
      User.findOne(record.owner).exec(function(err, user){
        serverName = user.email.substring(0,3);
        serverName = serverName.concat(record.game).concat(Utils.klsclave());
        record.name = ''+serverName;
        baseDir = sails.config.server.serverBaseDir + serverName;
        record.base_dir = baseDir;
        mkdir('-p',baseDir);
        sails.log(record.game);
        switch (record.game) {
          case 'cs16':
            // cp('-Rf',''+sails.config.server.cs16BaseDir+'',''+baseDir+'');
            var cs16config ={
              'daemon_game':'hlds_run -game cstrike',
              'map':'de_dust',
              'extraParams':'-pingboost 3 -autoupdate -console'
            }
            record.configuration = cs16config;
            var copy = exec('cp -Rf '+sails.config.server.cs16BaseDir+'* '+baseDir+'; echo "Copia completa";',{async:true});
            copy.stdout.on('data',function(data){
              Serverlog.create({message:data,by:record.id}).exec(function(err,log){});
              Server.update({id:record.id},{ready:true}).exec(function(err,update){
                if(err){
                  return;
                }
              });
            })
            break;
          default:
        }
        ServersManager.preparePort(record.id)
        record.save();
        sails.log("Salve")
        cb();
      });
    });

  }
};
