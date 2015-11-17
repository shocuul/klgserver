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
		sails.log("Estoy en getServers");
		sails.log(req.socket.id);
		Server.find({ owner: ownerId }).exec(function (err, foundServers) {
			sails.log(foundServers);
			Server.subscribe(req.socket, foundServers);
			res.json(foundServers);
		})
	},
	createServer: function (req, res) {
		var game = req.body.game;
		var game_type = req.body.game_type ? req.body.game_type : null;
		var num_player = req.body.num_player;
		User.findOne(req.param('idUser')).exec(function (err, user) {
			var serverName = user.email.substring(0, 3);
			serverName = serverName.concat(game).concat(Utils.klsclave());
			var baseDir = sails.config.server.serverBaseDir + serverName;
			mkdir('-p', baseDir);
			var port = ServersManager.preparePort();
			Server.create({
				name:serverName,
				game:game,
				game_type: game_type,
				port: port,
				ip:sails.config.server.ip,
				base_dir:baseDir,
				num_player:num_player,
				owner:user.id
			}).exec(function(err, newServer){
				Server.publishCreate(newServer);
				res.json(newServer);
			})
			// Se crean las diferentes configuraciones por cada juego
			sails.log("Estoy en el switch");
			switch(game){
				case 'cs16':
					break;
				case 'minecraft':
					switch(game_type){
						case 'spigot':
							var copy = exec('cp '+sails.config.server.minecraft.spigot+' '+baseDir+'; echo "Copia Completa";',{async:true});
							var fs = require('fs');
							fs.writeFile(baseDir+'/eula.txt','eula=true',function(err){
								if(err) res.negotiate(err);
							})
							
					}
					break;
				case 'csgo':
					break;
			}
			
			
		})
		sails.log(req.body);
	}

};
