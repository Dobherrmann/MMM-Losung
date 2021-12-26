var NodeHelper = require('node_helper');
var fetch = require('node-fetch');


module.exports = NodeHelper.create({
    start: function () {
        console.log('MMM-Losung helper started ...');
    },

    _openFile: function (filename) {
        var self = this;

    },

    async _getWebData(webURL) {
        var self = this;
        const url = webURL;
        // const url =  'https://www.losungen.de/fileadmin/media-losungen/heute/2021/0605.html';
        try {
            let response = await fetch(url); // Gets a promise
            const tmp = await response.text(); // Replaces body with response,
            self.sendSocketNotification('WebData', tmp);
          } catch (err) {
            console.log('Fetch error:' + err); // Error handling
          }
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'GetDataFromWeb'){
            this._getWebData(payload);
        }
        else
            self.sendSocketNotification('Error', 'File not opend');
    }
});
