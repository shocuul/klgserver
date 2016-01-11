module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'html2js:dev',
		'html2js:admin',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
