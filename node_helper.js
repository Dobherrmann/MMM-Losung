var NodeHelper = require('node_helper');
var fs = require('fs');
var parser = require('xml2json');
var fetch = require('node-fetch');


module.exports = NodeHelper.create({
    start: function () {
        console.log('MMM-Losung helper started ...');
    },

    // ADD : https://www.losungen.de/download/skriptloesungen/

    _openFile: function (filename) {
        var self = this;

        const filePath = self.path + '/' + filename; //"/Losungen Free 2021.xml";


        fs.readFile(filePath, (err, data) => {
            if (err)
                self.sendSocketNotification('Error', "File not Found");
            else {
                const myparsedjson = parser.toJson(data, { reversible: true });
                const jsonfile = JSON.parse(myparsedjson);
                const jsonFiltered = jsonfile.FreeXml.Losungen;
                self.sendSocketNotification('FileData', jsonFiltered);
            }
        });
    },

    async _getWebData(webURL) {
        var self = this;
        const url = webURL;
        // const url =  'https://www.losungen.de/fileadmin/media-losungen/heute/2021/0605.html';
        try {
            let response = await fetch(url); // Gets a promise
            const tmp = await response.text(); // Replaces body with response,
            self.sendSocketNotification('WebData', tmp);
            // const tmp = mytmp.body
            // self.sendSocketNotification('WebData', tmp);
          } catch (err) {
            console.log('Fetch error:' + err); // Error handling
          }
    },

    socketNotificationReceived: function (notification, payload) {
        // Init Set File Name
        if (notification === 'OpenFile')
            this._openFile(payload);
        else if (notification === 'GetDataFromWeb'){
            this._getWebData(payload);
        }
        else
            self.sendSocketNotification('Error', 'File not opend');
    }
});
