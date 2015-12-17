/**
 * ServerController
 *
 * @description :: Server-side logic for managing servers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
require('shelljs/global');
var fs = require('fs');
var path = require('path');
module.exports = {

	index: function(req, res){
		sails.log("Ejecute el Index");
		sails.log(req.params);
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
		"li_attr":{
			"base":path.join(_p,f),
			"isLeaf":!s.isDirectory()
		},
		"children":s.isDirectory()
	};
}
