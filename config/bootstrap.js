/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

 //require('shelljs/global');

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  //mkdir('-p','out/release');
  require('shelljs/global');
  //Utils.createXMLServerConfig({name:'Josep',memory:1048576});
  var version = exec('node --version', {silent:true}).output;
  sails.log(version);
  exec('virt-install --connect qemu:///system -n kvm1 -r 2048 --vcpus=2 \
--disk path=/var/lib/libvirt/images/kvm1-image.img,size=20 \
-c /isos/ubuntu-min-install.iso --vnc --noautoconsole --os-type linux \
--accelerate --network=network:default --hvm --vncport=5951',{async:true},function(code,output){
	sails.log(code);
	sails.log(output);
})
  exec('adduser dev libvirtd',{silent:true},function(code, output){
  	sails.log.warn(code);
  	sails.log.warn(output);
  })
  cb();

};
