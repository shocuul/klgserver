/**
* Server.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name:{
  		type:'string'
  	},
  	game:{
  		type:'string',
  		emum:['minecraft','cs16','csgo'],
  		required:true
  	},
  	owner:{
  		model:'user'
  	},
    base_dir:{
      type:'string'
    }
  },
  beforeCreate:function(values, cb){
    sails.log(values.owner);
    switch(values.game){
      case 'cs16':
        statements_1
        break;
      case 'csgo':
        break;
      default:
        sails.log.error('Algo salio mal en beforeCreate de Servers');
        break;
    }
    cb();
  }
};

