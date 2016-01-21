module.exports = function(grunt){
	grunt.config.set('ngAnnotate',{
		app:{
			files:{
				'.tmp/public/concat/production.js':['.tmp/public/concat/production.js'],
				'.tmp/public/concat/productionAdmin.js':['.tmp/public/concat/productionAdmin.js']
			}
		}
	});
	grunt.loadNpmTasks('grunt-ng-annotate');
}