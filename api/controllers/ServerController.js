/**
 * ServerController
 *
 * @description :: Server-side logic for managing servers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
require('shelljs/global');
var mime = require('mime')
var fs = require('fs');
var path = require('path');
module.exports = {

	index: function(req, res){
		Server.watch(req.socket);
		Server.find({}).exec(function findServer(err, foundServer){
			Server.subscribe(req.socket, foundServer);
			res.json(foundServer)
		})

	},
	create:function(req,res){
		res.json(301,'No se pueden crear servidores de esta forma');
	},
	start:function(req,res){
		//Agregar seguridad mas adelante
		sails.log(req.params)
		Server.findOne(req.params.idServer).exec(function(err, server){
			if(err) return res.json(301,'Error interno');
			if(!server) return res.json(301,'No se encuentra el servidor');
			if(server.ready){
				server.startServer();
				res.json(301,'Servidor Iniciado');
			}else{
				res.json(301,'El servidor aun no esta preparado');
			}
		})
	},
	getTree:function(req, res){
		sails.log.warn(req.params)
		var _p;
		if(!req.param('id')){
			Server.findOne(req.params.idServer).exec(function(err, server){
				if(err) return res.json(301, 'Error Interno');
				if(!server) return res.json(301, 'No se encuentra el servidor');
				if(server.ready){
					_p = path.resolve(server.base_dir);
					processReq(_p, res);
				}
			})
		}else{
			_p = req.param('id');
			processReq(_p, res);
		}
	},
	getResource:function(req, res){
		res.send(fs.readFileSync(req.param('resource'),'UTF-8'));
	},
	writeResource:function(req, res){
		switch(req.param('operation')){
			case 'editFile':
				fs.writeFile(req.param('resource'), req.param('content'), function (err) {
  				if (err) res.json(301,'Error al escribir el archivo');
  				res.json({msg:'Archivo actualizado correctamente'});
				});
				break;
			case 'createFolder':
				fs.mkdirSync(req.param('resource') +'/'+ req.param('content'));
				res.json({msg:'Carpeta creada correctamente.'});
				break;
		}
		
		
	},
	stop:function(req, res){
		Server.findOne(req.params.idServer).exec(function(err, server){
			if(err) return res.json(301,'Error interno');
			if(!server) return res.json(301, 'No se encuentra el servidor');
			if(server.ready){
				server.stopServer();

			}
		});
	},
	new:function(req, res){
		var files = ls('.');
		sails.log(files);
		mkdir('-p', 'usuarios/tes2');
		return res.json({success:'Server Created'});
	}
};

function processReq(_p, res){
	var resp = [];
	fs.readdir(_p, function(err, list){
		for(var i = list.length - 1; i >= 0; i--){
			resp.push(processNode(_p, list[i]));
		}
		res.json(resp);
	})
}

function editable(_p, f, s){
	var editableExtension = ['.json','.yml','.properties','.txt','.log'];
	if(s.isDirectory()){
		return false
	}else{
		var type = path.extname(path.join(_p,f));
		if(editableExtension.indexOf(type) >= 0){
			return true
		}else{
			return false
		}
	}
}

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
}

function processNode(_p, f){
	var s = fs.statSync(path.join(_p, f));
	return {
		"id":path.join(_p,f),
		"text":f,
		"icon":s.isDirectory() ? 'jstree-custom-folder' : 'jstree-custom-file',
		"state":{
			"opened":false,
			"disabled":false,
			"selected":false
		},
		"editable":editable(_p,f,s),
		"li_attr":{
			"base":path.join(_p,f),
			"isLeaf":!s.isDirectory()
		},
		"children":s.isDirectory()
	};
}
