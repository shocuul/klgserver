
module.exports.guid = function(){
  function s4(){
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

module.exports.createXMLConfig = function(name){
  var xmlDoc : XmlDocument = new XmlDocument();
  var domainNode : XmlElement = xmlDoc.CreateElement("domain");
  domainNode.setAttribute("type","kvm");
  var nameNode : XmlElement = xmlDoc.CreateElement("name");
  nameNode.InnerText = name;
  var uuidNode : XmlElement = xmlDoc.CreateElement("uuid");
  uuidNode.InnerText = Utils.guid();
  var memoryNode : XmlElement = xmlDoc.CreateElement("memory");
  memoryNode.InnerText = 1048576;
  var currentMemoryNode : XmlElement = xmlDoc.CreateElement("currentMemory");
  currentMemoryNode.InnerText = 1048576;
  var vcpuNode : XmlElement = xmlDoc.CreateElement("vcpu").InnerText = 1;
  var osNode : XmlElement = xmlDoc.CreateElement("os");
  var typeNode : XmlElement = xmlDoc.CreateElement("type");
  var bootNode : XmlElement = xmlDoc.CreateElement("boot");
  bootNode.setAttribute("dev","cdrom");
  osNode.AppendChild(typeNode);
  osNode.AppendChild(bootNode);
  var featuredNode : XmlElement = xmlDoc.CreateElement("features");
  var acpiNode : XmlElement = xmlDoc.CreateElement("acpi");
  featuredNode.AppendChild(acpiNode);
  var clockNode : XmlElement = xmlDoc.CreateElement("clock");
  clockNode.setAttribute("offset","utc");
  var onPowerOffNode : XmlElement = xmlDoc.CreateElement("on_poweroff").InnerText = "destroy";
  var onRebootNode : XmlElement = xmlDoc.CreateElement("on_reboot").InnerText = "restart";
  var onCrashNode : XmlElement = xmlDoc.CreateElement("on_crash").InnerText = "destroy";
  



}
