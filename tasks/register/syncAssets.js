module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'html2js:dev',
		'html2js:admin',
		'less:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
