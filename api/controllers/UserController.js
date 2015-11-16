/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res){
		res.json(301,'To create user go to /auth/register');
	},
	getServers : function(req, res){
		Server.watch(req.socket);

		var ownerId = req.param('idUser');
		sails.log("Estoy en getServers");
		sails.log(req.socket.id);
		Server.find({owner:ownerId}).exec(function(err, foundServers){
			sails.log(foundServers);
			Server.subscribe(req.socket, foundServers);
			res.json(foundServers);
		})
	}

};
