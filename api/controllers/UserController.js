/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res){
		res.json(301,'To create user go to /auth/register');
	}

};
