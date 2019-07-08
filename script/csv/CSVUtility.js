const request = require('request'),
        parse = require('csv-parse'),
        fsPath = require('fs-path'),
        _ = require('underscore'),
        fs = require('fs'),
        generalSetting = require('../GeneralSetting');

class CSVUtility {
  constructor(parsedArray ) {
    if (parsedArray.length > 0) {
      this.keys = parsedArray[0];
      parsedArray.splice(0, 1);
      this.rows = parsedArray;
      this.length = this.rows.length;
    }
  }

  Get(p_line, p_key, p_default = null) {
    if (this.rows.length > p_line) {
      let keyIndex = _.findIndex(this.keys, x => x == p_key );
      return this.rows[p_line][keyIndex];
    }

    return p_default;
  }

  static GetAllURL() {
    let csvKeys = Object.keys(generalSetting.csvObjects),
        csvArray = [];

        csvKeys.forEach((key) => csvArray.push( {"name" : key, "url" : generalSetting.baseCSVURL.replace(":id", generalSetting.csvObjects[key])} ) );

    return csvArray;
  }

  static PrepareCSV(p_csv_name) {
    return new Promise((resolve, reject) => {
        fs.readFile('./static/csvFile/'+p_csv_name+'.csv', 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            resolve(data);
        });
    }).then((p_data) => {
        return new Promise((resolve, reject) => {
            parse(p_data, function(err, output){
                resolve(output)
            });
        });

    }).then((p_data) => {
        return p_data;
    });
  }

  static DownloadAllCSV() {
     let csvArray = this.GetAllURL(), _self = this;
     csvArray.forEach(function(json) {
        _self.DownloadFromURL(json.url, json.name );
     });
  }

  /** Download file (usually csv) from an url path
   * 
   * @param {string} p_url 
   * @param {string} p_fileName 
   */
  static DownloadFromURL(p_url, p_fileName) {
    let url = p_url;
    request(url, function (error, response, body) {
        
        let filePath = "./static/csvFile/";

        fsPath.writeFile(filePath + p_fileName +".csv", body, function(err){
          });
    });
  }
}

module.exports = CSVUtility;
