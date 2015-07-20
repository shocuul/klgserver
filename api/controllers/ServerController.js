/**
 * ServerController
 *
 * @description :: Server-side logic for managing servers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
require('shelljs/global');
module.exports = {
	new:function(req, res){
		var files = ls('.');
		sails.log(files);
		mkdir('-p', 'usuarios/tes2');
		return res.json({success:'Server Created'});
	}
};
