/**
 * ServerController
 *
 * @description :: Server-side logic for managing servers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
require('shelljs/global');
module.exports = {
	create:function(req,res){
		res.json(301,'No se pueden crear servidores de esta forma');
	},
	start:function(req,res){
		//Agregar seguridad mas adelante
		Server.findOne(req.params.idServer).exec(function(err, server){
			if(err) return res.json(301,'Error interno');
			if(!server) return res.json(301,'No se encuentra el servidor');
			if(server.ready){
				server.startServer();
			}else{
				res.json(301,'El servidor aun no esta preparado');
			}
		})
		res.json(301,'Request'+req.params.id)
	},
	new:function(req, res){
		var files = ls('.');
		sails.log(files);
		mkdir('-p', 'usuarios/tes2');
		return res.json({success:'Server Created'});
	}
};
