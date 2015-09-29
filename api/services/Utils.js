
module.exports.guid = function(){
  function s4(){
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var builder = require('xmlbuilder');

module.exports.createXMLServerConfig = function(server){
  var xml = builder.create('domain');
  xml.att('type','kvm');
  xml.ele('name',{},server.name);
  xml.ele('uuid',{},Utils.guid());
  xml.ele('memory',{},server.memory);
  xml.ele('currentMemory',{},server.memory);
  xml.ele('vcpu',{},1);
  var osNode = xml.ele('os');
  osNode.ele('type',{},'hvm');
  osNode.ele('boot',{'dev':'cdrom'});
  xml.ele('features').ele('acpi');
  xml.ele('clock',{'offset':'utc'});
  xml.ele('on_poweroff',{},'destroy');
  xml.ele('on_reboot',{},'destroy');
  xml.ele('on_crash',{},'destroy');
  var devicesNode = xml.ele('devices');
  devicesNode.ele('emulator',{},'/usr/bin/kvm');
  var diskNode = devicesNode.ele('disk',{'type':'file','device':'disk'});
  diskNode.ele('driver',{'name':'qemu','type':'raw'});
  diskNode.ele('source',{'file':'/home/dev/images/'+server.name+'.img'});
  diskNode.ele('target',{'dev':'vda','bus':'virtio'});
  diskNode.ele('address',{'type':'pci','domain':'0x0000','bus':'0x00','slot':'0x04','function':'0x0'});
  var cdromNode = devicesNode.ele('disk',{'type':'file','device':'cdrom'});
  cdromNode.ele('driver',{'name':'qemu','type':'raw'});
  cdromNode.ele('source',{'file':'/home/dev/iso/ubuntu-13.10-server-amd64.iso'});
  cdromNode.ele('target',{'dev':'hdc','bus':'ide'});
  cdromNode.ele('readonly');
  cdromNode.ele('address',{'type':'drive','controller':'0','bus':'1','target':'0','unit':'0'});
  devicesNode.ele('controller',{'type':'ide','index':'0'}).ele('address',{'type':'pci','domain':'0x0000','bus':'0x00','slot':'0x01','function':'0x1'});
  devicesNode.ele('input',{'type':'mouse','bus':'ps2'});
  devicesNode.ele('graphics',{'type':'vnc','port':'-1','autoport':'yes','listen':'127.0.0.1'});
  devicesNode.ele('console',{'type':'pty'}).ele('target',{'port':'0'});
  xml.end({pretty:true});
  sails.log(xml.end());

}



// module.exports.createXMLConfig = function(name){
//   var xmlDoc : XmlDocument = new XmlDocument();
//   var domainNode : XmlElement = xmlDoc.CreateElement("domain");
//   domainNode.setAttribute("type","kvm");
//   var nameNode : XmlElement = xmlDoc.CreateElement("name");
//   nameNode.InnerText = name;
//   var uuidNode : XmlElement = xmlDoc.CreateElement("uuid");
//   uuidNode.InnerText = Utils.guid();
//   var memoryNode : XmlElement = xmlDoc.CreateElement("memory");
//   memoryNode.InnerText = 1048576;
//   var currentMemoryNode : XmlElement = xmlDoc.CreateElement("currentMemory");
//   currentMemoryNode.InnerText = 1048576;
//   var vcpuNode : XmlElement = xmlDoc.CreateElement("vcpu").InnerText = 1;
//   var osNode : XmlElement = xmlDoc.CreateElement("os");
//   var typeNode : XmlElement = xmlDoc.CreateElement("type");
//   var bootNode : XmlElement = xmlDoc.CreateElement("boot");
//   bootNode.setAttribute("dev","cdrom");
//   osNode.AppendChild(typeNode);
//   osNode.AppendChild(bootNode);
//   var featuredNode : XmlElement = xmlDoc.CreateElement("features");
//   var acpiNode : XmlElement = xmlDoc.CreateElement("acpi");
//   featuredNode.AppendChild(acpiNode);
//   var clockNode : XmlElement = xmlDoc.CreateElement("clock");
//   clockNode.setAttribute("offset","utc");
//   var onPowerOffNode : XmlElement = xmlDoc.CreateElement("on_poweroff").InnerText = "destroy";
//   var onRebootNode : XmlElement = xmlDoc.CreateElement("on_reboot").InnerText = "restart";
//   var onCrashNode : XmlElement = xmlDoc.CreateElement("on_crash").InnerText = "destroy";
  



// }
