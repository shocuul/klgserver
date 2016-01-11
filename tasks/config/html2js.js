
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
    },
    admin:{
      options:{
        base:'assets/admin/js',
        module:'admin-templates',
      },
      files:{
        '.tmp/public/adminTemplates.js':require('../pipeline').templateFilesAdminToInject
      }
    }
  });

  grunt.loadNpmTasks('grunt-html2js');
}
