var spawn, servers, connect, create, preparePort
spawn = require('child_process').spawn;

servers = [];

preparePort = function(){
  Options.findOne({option_name:'port_number'}).exec(function(err, record){
    sails.log(record);
    var currentPort = parseInt(record.option_value);
    sails.log('El ultimo puerto abierto es : ' + currentPort);
    var currentPort = currentPort + 1;
    sails.log('El ultimo puerto abierto es actualizado: ' + currentPort);
    var c = exec('sudo iptables -A INPUT -p tcp --dport '+currentPort+' -j ACCEPT',{async:true});
    c.stdout.on('data',function(data){
      // c.stdin.write('by45nt5k4n');
    });
    record.option_value = currentPort.toString();
    record.save();
    return currentPort;
  })
}

create = function(){
  // User.findOneByEmail('shocuul@live.com',function(err, user){
  //   sails.log(user.name)
  // })
  // Server.findOne(2).exec(function(err, record){
  //   sails.log(record)
  // });
}

connect = function(){
  sails.log("Estoy en la funcion connect");
  var shell = require('shelljs');
  var nombre1 = 'prueba1'
  var nombre2 = 'prueba2'
  shell.cd('/home/dev/Developer/SteamCMD/27020');
  var child = shell.exec('screen -AmdS '+nombre1+' ./hlds_run -game cstrike +ip 192.168.1.70 +port 27016 -pingboost 3 +maxplayers 22 +map de_dust -autoupdate -console',{async:true});
  servers.push({process:child,name:'TestServer1'});
  servers[0].process.stdout.on('data',function(data){
    sails.log(data);
  });
  shell.cd('/home/dev/Servers/denethics');
  var otherchild = shell.exec('screen -AmdS '+nombre2+' ./hlds_run -game cstrike +ip 192.168.1.70 +port 27017 -pingboost 3 +maxplayers 22 +map de_dust -autoupdate -console',{async:true});
  servers.push({process:otherchild,name:'Other Server 2'});
  servers[1].process.stdout.on('data',function(data){
    sails.log(data);
  })
  sails.log(servers);
  var existe = shell.exec('screen -ls | grep [.]prueba4[[:space:]]');
  var existe2 = shell.exec('screen -ls | grep [.]prueba2[[:space:]]');
  sails.log(typeof(existe));
  sails.log(typeof(existe2));

  setTimeout(function(){
    sails.log("Apagando " + servers[0].name);
    shell.exec('screen -r "'+nombre1+'" -X quit');
    shell.exec('screen -r "'+nombre2+'" -X quit');
    // servers[0].process.stdin.write('\u0003');
    //child.stdin.write(null,{ctrl:true, name:'c'});

   }, 10000);
  // var cs16server = spawn('',[
  //   '',
  //   '',
  //   '+port 27016',
  //   '-pingboost 3',
  //   '+maxplayers 22',
  //   '+map de_dust',
  //   '-autoupdate']);
  //
  // cs16server.stdout.on('data',Utils.serverLog());
  // cs16server.stderr.on('data',Utils.serverLog());
}

// var ServerManager = {
//   servers_process : servers_process = [],
//   init:function initializeServers(){
//     Server.find({}).exec(function fincCB(err, found){
//       while(found.length)
//         console.log('Found Server with Game' + found.pop().game);
//     })
//     servers_process.push("Nuevo elemento");
//     var minecraftServerProcess = spawn('java', [
//     '-Xmx512M',
//     '-Xms256M',
//     '-jar',
//     'minecraft_server.1.8.jar',
//     'nogui'
//   ],'Path');
//   }
// }

module.exports = {
  connect : connect,
  create : create,
  preparePort : preparePort
};


// var connect, getConnection, graph, mysql, pools, query, queryWithCache, sanitize, transaction;
//
// mysql = require('mysql');
//
// pools = {};
//
// getConnection = function(options) {
//   if (options == null) {
//     options = sails.config.doe.mysql;
//   }
//   return mysql.createConnection({
//     host: options.host,
//     port: options.port ? options.port : 3306,
//     user: options.user,
//     password: options.password,
//     dateStrings: true
//   });
// };
//
//
// /*
//   connect(options, callback)
//   or connect(callback)
//  */
//
// connect = function() {
//   var callBack, options;
//   if (_.isFunction(arguments[0])) {
//     callBack = arguments[0];
//   } else if (_.isObject(arguments[0]) && _.isFunction(arguments[1])) {
//     options = arguments[0];
//     callBack = arguments[1];
//   }
//   if (!callBack) {
//     throw new Error('Parameter type wrong for MysqlService.connect');
//   }
//   if (options == null) {
//     options = sails.config.doe.mysql;
//   }
//   if (pools[options.key] == null) {
//     pools[options.key] = mysql.createPool({
//       host: options.host,
//       port: options.port ? options.port : 3306,
//       user: options.user,
//       password: options.password,
//       dateStrings: true
//     });
//   }
//   return pools[options.key].getConnection(callBack);
// };
//
// transaction = function(callBack) {
//   return connect(function(err, conn) {
//     if (err) {
//       return callBack(err, null);
//     }
//     return conn.beginTransaction(function(transErr) {
//       if (transErr) {
//         conn.release();
//         return callBack(transErr, null);
//       }
//       return callBack(null, conn);
//     });
//   });
// };
//
//
// /*
//   conf = {
//     'a': {
//       depend : ['b', 'c'] | []
//       query: 'select' | (x) -> x + 1 | null
//     }
//   }
//  */
//
// graph = function(conf, options, cache, isTransaction) {
//   var allDefer, buildDependency, cf, confErr, connFunc, dataset, dep, id, _i, _len, _ref;
//   if (isTransaction == null) {
//     isTransaction = false;
//   }
//   if (options == null) {
//     options = sails.config.doe.mysql;
//   }
//   dataset = {};
//   allDefer = Promise.defer();
//   buildDependency = function(key, conn) {
//     var confBody, dependPromise, i;
//     confBody = conf[key];
//     dependPromise = Promise.all((function() {
//       var _i, _len, _ref, _results;
//       _ref = confBody.depend;
//       _results = [];
//       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//         i = _ref[_i];
//         _results.push(conf[i].defer.promise);
//       }
//       return _results;
//     })());
//     return dependPromise.then(function(r) {
//       var e, sql;
//       try {
//         sql = _.isFunction(confBody.query) ? confBody.query(dataset) : confBody.query;
//       } catch (_error) {
//         e = _error;
//         dataset[key] = e;
//         confBody.defer.reject(e);
//         return;
//       }
//       if (sql != null) {
//         if (cache) {
//           return queryWithCache(cache.collection, options, sql, {}, cache.expire).then(function(queryData) {
//             dataset[key] = queryData;
//             return confBody.defer.resolve(queryData);
//           });
//         } else {
//           return query(options, sql, {}).then(function(queryData) {
//             dataset[key] = queryData;
//             return confBody.defer.resolve(queryData);
//           });
//         }
//       } else {
//         dataset[key] = null;
//         return confBody.defer.resolve(null);
//       }
//     });
//   };
//   for (id in conf) {
//     cf = conf[id];
//     cf.defer = Promise.defer();
//     if (cf.depend == null) {
//       cf.depend = [];
//     }
//     _ref = cf.depend;
//     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//       dep = _ref[_i];
//       if (!dep in conf) {
//         confErr = new Error("graph id '" + dep + "' not found");
//         console.log(confErr.toString());
//         allDefer.reject(confErr);
//         return allDefer;
//       }
//     }
//   }
//   connFunc = isTransaction ? transaction : connect;
//   connFunc(function(connErr, myConn) {
//     var allPromise;
//     if (connErr) {
//       return allDefer.reject(connErr);
//     }
//     for (id in conf) {
//       cf = conf[id];
//       buildDependency(id, myConn);
//     }
//     allPromise = Promise.all((function() {
//       var _results;
//       _results = [];
//       for (id in conf) {
//         cf = conf[id];
//         _results.push(cf.defer.promise);
//       }
//       return _results;
//     })());
//     return allPromise.then(function(r) {
//       if (isTransaction) {
//         return myConn.commit(function(commitErr) {
//           myConn.release();
//           if (commitErr) {
//             return allDefer.reject(commitErr);
//           }
//           return allDefer.resolve(dataset);
//         });
//       } else {
//         myConn.release();
//         return allDefer.resolve(dataset);
//       }
//     }, function(r) {
//       if (isTransaction) {
//         return myConn.rollback(function(rollBackErr) {
//           myConn.release();
//           if (rollBackErr) {
//             return allDefer.reject(rollBackErr);
//           }
//           return allDefer.reject(r);
//         });
//       } else {
//         myConn.release();
//         return allDefer.reject(r);
//       }
//     });
//   });
//   return allDefer.promise;
// };
//
//
// /*
//   query with sql
//  */
//
// query = function(options, sql, data) {
//   var defer;
//   defer = Promise.defer();
//   connect(options, function(err, conn) {
//     if (err) {
//       return defer.reject(err);
//     } else {
//       if (data == null) {
//         data = {};
//       }
//       return conn.query(sql, data, function(err, data) {
//         if (err) {
//           defer.reject(err);
//         } else {
//           defer.resolve(data);
//         }
//         return conn.release();
//       });
//     }
//   });
//   return defer.promise;
// };
//
//
// /*
//   query with sql, and cache data
//   params
//  */
//
// queryWithCache = function(cacheCollection, options, sql, param, expire) {
//   var defer;
//   defer = Promise.defer();
//   Cache.get(cacheCollection, sql).then(function(ret) {
//     if (ret.length > 0) {
//       return defer.resolve(ret[0].value);
//     } else {
//       return query(options, sql, param).then(function(data) {
//         Cache.set(cacheCollection, sql, data, expire);
//         return defer.resolve(data);
//       });
//     }
//   });
//   return defer.promise;
// };
//
//
// /*
//   sanitize sql to prevent sql injection
//  */
//
// sanitize = function(s) {
//   return s.replace(/-{2,}/, '-').replace(/[*/]+/, '').replace(/(;|\s)(exec|execute|select|insert|update|delete|create|alter|drop|rename|truncate|backup|restore)\s/i, '');
// };
//
// module.exports = {
//   sanitize: sanitize,
//   format: mysql.format,
//   getConnection: getConnection,
//   connect: connect,
//   transaction: transaction,
//   graph: graph,
//   query: query,
//   queryWithCache: queryWithCache
// };
