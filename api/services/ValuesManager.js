function getAllValues(){
  var dict = [];
  Options.find().then(function(records){
    for (var i = 0; i < records.length; i++){
      switch (records[i].option_name) {
        case "steamcmd":
          dict.push({steamcmd:records[i].option_value});
          break;
        case "csgoDir":
          dict.push({csgoDir:records[i].option_value});
          break;
        case "port_number":
          dict.push({port_number:records[i].option_value});
          break;
        default:

      }
    }
  })
  return dict;




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
