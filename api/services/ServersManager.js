var spawn = require('child_process').spawn;
var ServerManager = {
  servers_process : servers_process = [],
  init:function initializeServers(){
    Server.find({}).exec(function fincCB(err, found){
      while(found.length)
        console.log('Found Server with Game' + found.pop().game);
    })
    servers_process.push("Nuevo elemento");
    var minecraftServerProcess = spawn('java', [
    '-Xmx512M',
    '-Xms256M',
    '-jar',
    'minecraft_server.1.8.jar',
    'nogui'
  ],'Path');
  }
}

module.exports = ServerManager;
