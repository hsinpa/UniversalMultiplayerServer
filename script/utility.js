var request = require('request'),
    crypto = require('crypto'),

utility = {
  RollDice : function() {
      return Math.floor((Math.random() * 1.5) );
  },

  RandomRange : function(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min
  }, 

  GenerateRandomString : function(p_extraString = "") {
    const shaString = crypto.createHash('sha1').update(new Date().toJSON() + p_extraString).digest('hex');
    return shaString;    
  },

  GenerateRandomColor : function() {
    var r = utility.RandomRange(180, 255),
        g = utility.RandomRange(180, 255),
        b = utility.RandomRange(180, 255);
    return [r,g,b];
  },

  CreateCustomerData : function(villagers, callback) {
    var villagerData = {};
    var prefList = ["fire", "classic", "ice"];

    Object.keys(villagers).forEach(function(key) {
      var villagerStats = [], villager = villagers[key];

      for(var i = 0; i < villager.people; i++) {
        var productPref = prefList[Math.floor(Math.random() * prefList.length)],
            quality = utility.RandomRange(villager.qualityRange[0], villager.qualityRange[1]);
            villagerStats.push( {"quality" : quality, "productPref" : productPref } );
      }
      villagerData[key] = villagerStats;
    });
    callback(villagerData);
  },

  GetCustomerSimulateData : function(villagerNum, callback ) {
    request('http://api.magitech.mvalero.net:3333/v1/simulations/'+villagerNum,
     function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      }
    });
  }
}

module.exports = utility;
