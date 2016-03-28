module.exports.server = {
	/*
	** Archivo de Configuracion de las rutas de los servidores para KLS
	*/

	/* =================================================================
	** Configuraciones Generales
	**
	*/
	// IP Publica del servidor
	ip:'192.168.1.67',

	// Directorio donde se instalaran los servidores a rentar
	serverBaseDir:'/home/developer/Servers/',


	/*
	** =================================================================
	** MINECRAFT
	*/
	minecraft:{
		//SPIGOT
		spigot:'/home/developer/minecraft/spigot-1.8.8.jar',

		//CRAFTBUKKIT
		craftbukkit:'/home/developer/minecraft/craftbukkit-1.8.8.jar',

		//SERVER ORIGINAL 
		vanilla:'/home/developer/minecraft/minecraft_server.1.8.8.jar'
	},

	/*
	** =================================================================
	** Counter Strike Global Offensive
	*/
	// Servidor de instalacion 
	csgoBaseDir:'/kls/install/csgo/',
	// Servicio Steam CMD
    steamCmdDir:'/kls/install/steamcmd/',

	
	/*
	** =================================================================
	** Counter Strike 1.6
	*/
	// CS1.6 Base Install Dir
	cs16BaseDir:'/home/developer/cs16/',


	/*
	** =================================================================
	** Test Stuff
	*/
	// Default admin y password
	name:'Jose David Pacheco ',
	email:'josepdark@gmail.com',
	password:'by45nt5k4n',

}
