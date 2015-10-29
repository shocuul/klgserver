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
		res.json(301,'Request'+req.params.id)
	},
	new:function(req, res){
		var files = ls('.');
		sails.log(files);
		mkdir('-p', 'usuarios/tes2');
		return res.json({success:'Server Created'});
	}
};
