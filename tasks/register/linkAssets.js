module.exports = function (grunt) {
	grunt.registerTask('linkAssets', [
		'sails-linker:devJs',
		'sails-linker:devStyles',
		'sails-linker:devTpl',
		'sails-linker:devJsJade',
		'sails-linker:devStylesJade',
		'sails-linker:devTplJade',
		'sails-linker:devCssAdmin',
		'sails-linker:devJsAdmin',
		'sails-linker:devTplAdmin',
	]);
};
