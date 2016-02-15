function getAllValues(){

  var opt = Options.find().then(function(err, records){
    var steam;
    var csgo;
    var port;
    for (var i = 0; i < records.length; i++) {
      switch (records[i].option_name) {
        case "steamcmd":
          steam = records[i].option_value;
          break;
        case "csgoDir":
          csgo = records[i].option_value;
          break;
        case "port_number":
          port = records[i].option_value;
          break;
        default:

      }
    }
    return {
      steamcmd:steam,
      csgoDir:csgo,
      port_number:port
    }
  })
  return opt;



}

function saveValue(key,value){
  Options.findOrCreate({option_name:key},{option_name:key,option_value:value}).exec(function(err, record){
    sails.log(record);
    if(value != record.option_value){
      record.option_value = value;
      record.save().then(function(updated){
        sails.log(updated);
      });
    }
  })
}

module.exports = {
  getAllValues:getAllValues,
  saveValue:saveValue
};
