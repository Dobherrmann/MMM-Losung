var NodeHelper = require('node_helper');
var fs = require('fs');
var parser = require('xml2json');


module.exports = NodeHelper.create({
    start: function () {
        console.log('MMM-cookbook helper started ...');
    },

    getCommute: function (filename) {
        var self = this;

        const filePath = self.path + '/' + filename; //"/Losungen Free 2021.xml";


        fs.readFile(filePath, (err, data) => {
            if (err)
                self.sendSocketNotification('Error', "File not Found");
            else {   
                const myparsedjson = parser.toJson(data, { reversible: true });
                const jsonfile = JSON.parse(myparsedjson);
                const jsonFiltered = jsonfile.FreeXml.Losungen;
                self.sendSocketNotification('Data',jsonFiltered);
            }
        });
    },

    socketNotificationReceived: function (notification, payload) {
        // Init Set File Name
        if(notification === 'OpenFile')
            this.getCommute(payload);
        else
            self.sendSocketNotification('Error', 'File not opend');       
    }
});
