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
    game_type:{
      type:'string',
      enum:['spigot','craftbukkit','vanilla']
    },
    port:{
      type:'integer'
    },
    ip:{
      type:'string'
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
      var spawn = require('child_process').spawn;
      shell.cd(this.base_dir);
      sed('-i','max-players=[0-9][0-9]+','max-players='+this.num_player,this.base_dir+'/server.properties');
      sails.log("Inicio el server")
      // switch(this.game){
      //   case 'cs16':
      //     shell.exec('screen -AmdS '+this.name+' ./'+this.configuration.daemon_game+' +ip '+sails.config.server.ip+' +port '+this.port+' +maxplayers '+this.max_player+' +map '+this.configuration.map+' ',{async:true});
      //     break;
      //   case 'minecraft':
      //     sails.log('entramos a minecraft');
      //     if(this.game_type == 'spigot'){
      //       sails.log('Entramos a spigot');
      //       var processo = shell.exec('java -Xms512M -Xmx1024M -XX:MaxPermSize=128M -jar spigot-1.8.8.jar --port ' + this.port +'',{async:true});
      //       processo.stdout.on('data',function(data){
      //         sails.log(data.toString());
      //       });
      //       break;
      //     }
      // }
      //
      // sails.log(this.id);
    },
    stopServer:function(){
      exec('screen -r "'+this.name+'" -X quit');
    }
  },
  afterUpdate:function(record, cb){
    //sails.log(record)
    if(record.owner == null){
      //sails.log("Entro a record.owner == null");
      Server.destroy(record.id).exec(function(err, deleterecord){
        if(err){cb(err);}else {
          Server.publishDestroy(record.id);
          cb(); }
      });
    }else{
      cb();
    }
  },
  //Antes de crear un servidor
  beforeCreate:function(values, cb){
    cb();
  },
  beforeDestroy:function(values, cb){
    //sails.log(values.where.id)
    Server.findOne(values.where.id).exec(function(err, record){
      rm('-Rf',record.base_dir);
      cb();
    })
  },
  // Despues de crear un servidor
  afterCreate:function(record, cb){
    //sails.log.warn(record.id)
    mkdir('-p', record.base_dir);
    switch (record.game) {
      case 'cs16':


        break;
      case 'csgo':
      //Si el juego es csgo
      var copy;
        Options.findOne({option_name:'csgoDir'}).then(function(baseCsgoDir){
          sails.log(baseCsgoDir);
          copy = exec('cp -r '+baseCsgoDir.option_value+'* '+record.base_dir+'; echo "Servidor CSGO Copiado";',{async:true});
          copy.stdout.on('data',function(data){
          Server.update({id:record.id},{ready:true}).exec(function(err,update){
            if(err){return;}
            Server.publishUpdate(record.id,{ready:true});
          })
        })

        })

        break;
      case 'minecraft':
        var fs = require('fs');
        fs.writeFile(''+record.base_dir+'/eula.txt','eula=true',function(err){
          if(err) sails.log.error(err);
        })
        var copy;
        // Copy installation files in server folder.
        switch (record.game_type) {
          case 'spigot':
            copy = exec('cp '+sails.config.server.minecraft.spigot+' '+record.base_dir+'; echo "Copia completa";',{async:true});
            break;
          case 'craftbukkit':
            copy = exec('cp '+sails.config.server.minecraft.craftbukkit+' '+record.base_dir+'; echo "Copia Completa";',{async:true});
            break;
          case 'vanilla':
            copy = exec('cp '+sails.config.server.minecraft.vanilla+' '+record.base_dir+'; echo "Copia Completa";',{async:true});
            break;
          default:
            sails.log("GameType Incompatible")
            break;
        }
        copy.stdout.on('data',function(data){
          Server.update({id:record.id},{ready:true}).exec(function(err,update){
            if(err){return;}
            var shell = require('shelljs');
            shell.cd(record.base_dir);
            switch (record.game_type) {
              //Falta agregar los otros daemon
              case 'spigot':
                    var processo = shell.exec('java -Xms512M -Xmx1024M -XX:MaxPermSize=128M -jar spigot-1.8.8.jar --port ' + record.port +'',{async:true, silent:true});
                    processo.stdout.on('data',function(data){
                      if((data.toString().indexOf("Done") > -1)){
                        processo.kill()
                        Server.publishUpdate(record.id,{ready:true});
                      }
                    });
                break;
              default:
            }
          });
        })

        break;
      default:

    }
    // var serverName = '';
    // Server.findOne(record.id).exec(function(err, record){
    //   User.findOne(record.owner).exec(function(err, user){
    //     serverName = user.email.substring(0,3);
    //     serverName = serverName.concat(record.game).concat(Utils.klsclave());
    //     record.name = ''+serverName;
    //     baseDir = sails.config.server.serverBaseDir + serverName;
    //     record.base_dir = baseDir;
    //     mkdir('-p',baseDir);
    //     sails.log(record.game);
    //     switch (record.game) {
    //       case 'cs16':
    //         // cp('-Rf',''+sails.config.server.cs16BaseDir+'',''+baseDir+'');
    //         var cs16config ={
    //           'daemon_game':'hlds_run -game cstrike',
    //           'map':'de_dust',
    //           'extraParams':'-pingboost 3 -autoupdate -console'
    //         }
    //         record.configuration = cs16config;
    //         var copy = exec('cp -Rf '+sails.config.server.cs16BaseDir+'* '+baseDir+'; echo "Copia completa";',{async:true});
    //         copy.stdout.on('data',function(data){
    //           Serverlog.create({message:data,by:record.id}).exec(function(err,log){});
    //           Server.update({id:record.id},{ready:true}).exec(function(err,update){
    //             if(err){
    //               return;
    //             }
    //           });
    //         })
    //         break;
    //       case 'minecraft':
    //         if(record.game_type == 'spigot'){
    //           var copy = exec('cp '+sails.config.server.minecraft.spigot+' '+baseDir+'; echo "Copia completa";',{async:true});
    //           var fs = require('fs');
    //           fs.writeFile(''+baseDir+'/eula.txt','eula=true',function(err){
    //             if(err) sails.log.error(err);
    //           })
    //           copy.stdout.on('data',function(data){
    //             Serverlog.create({message:data, by: record.id}).exec(function(err,log){});
    //             Server.update({id:record.id},{ready:true}).exec(function(err, update){
    //               if(err){
    //                 return;
    //               }
    //             })
    //           })
    //         }
    //       default:
    //     }
    //     ServersManager.preparePort(record.id)
    //     record.save(function(err, s){
    //       sails.log(s);
    //       Server.publishCreate(s);
    //     });
    //     sails.log("Salve")
        cb();
  }
};
