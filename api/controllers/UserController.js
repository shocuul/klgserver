/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function (req, res) {
		res.json(301, 'To create user go to /auth/register');
	},
	getServers: function (req, res) {
		Server.watch(req.socket);

		var ownerId = req.param('idUser');
		Server.find({ owner: ownerId }).exec(function (err, foundServers) {
			sails.log(foundServers);
			Server.subscribe(req.socket, foundServers);
			res.json(foundServers);
		})
	},
	createServer: function (req, res) {
		var sId = '';
		var game = req.body.game;
		var game_type = req.body.game_type ? req.body.game_type : null;
		var num_player = req.body.num_player;
		User.findOne(req.param('idUser')).exec(function (err, user) {
			var serverName = user.email.substring(0, 3);
			serverName = serverName.concat(game).concat(Utils.klsclave());
			var baseDir = sails.config.server.serverBaseDir + serverName;
			mkdir('-p', baseDir);
			ServersManager.preparePort().then(function(port){
				var port = port;
				Server.create({
					name:serverName,
					game:game,
					game_type: game_type,
					port: port,
					ip:sails.config.server.ip,
					base_dir:baseDir,
					num_player:num_player,
					owner:user.id
				}).then(function(newServer){
					Server.publishCreate(newServer);
					sId = newServer.id;
					res.json(newServer);
				},function(err){
					res.negotiate(err);
				})
			});
			// Se crean las diferentes configuraciones por cada juego
	}

};
