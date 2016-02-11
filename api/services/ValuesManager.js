function getAllValues(){

  Options.find().exec(function(err, records){
    sails.log(records);
    for (var value in records.toObject()) {
      sails.log(value);
    }
  })

  return {
    steamcmd:'',
    csgoDir:'',
  }

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
