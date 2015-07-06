
module.exports = function(grunt) {
  grunt.config.set('html2js',{
    dev:{
      options:{
        base: 'assets/templates',
        module:'app-templates',
      },
      files:{
        '.tmp/public/templates.js':require('../pipeline').templateFilesToInject
      }
    }
  });

  grunt.loadNpmTasks('grunt-html2js');
}
