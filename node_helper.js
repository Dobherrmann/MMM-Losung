var NodeHelper = require('node_helper');
var fetch = require('node-fetch');


module.exports = NodeHelper.create({
    start: function () {
        console.log('MMM-Losung helper started ...');
    },

    _openFile: function (filename) {
        var self = this;

    },
    
    _daysIntoYear(date){
	    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
	},

    async _getWebData() {
        var self = this;
        const url = "https://www.losungen.de/fileadmin/media-losungen/kalender/kalender_daten.php";
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const weekday = date.getDay();
        const daysIntoYear = self._daysIntoYear(date);
        try {
            let response = await fetch(url, {
			    "body": `jahr=${year}&monat=${month}&tag=${day}&wtag=${weekday}&tagid=${daysIntoYear}`,
			    "cache": "default",
			    "credentials": "omit",
			    "headers": {
			        "Accept": "*/*",
			        "Accept-Language": "en-US,en;q=0.9",
			        "Content-Type": "application/x-www-form-urlencoded",
			        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15"
			    },
			    "method": "POST",
			    "mode": "cors",
			    "redirect": "follow",
			    "referrer": "https://www.losungen.de/fileadmin/media-losungen/kalender/kalender.html",
			    "referrerPolicy": "strict-origin-when-cross-origin"
			}); // Gets a promise
            const tmp = await response.text(); // Replaces body with response,
            const parts = tmp.split("@");
            console.log(parts);
            const result = {
            	dailyText: parts[1],
            	dailyTextRef: parts[2],
            	teachingText: parts[5],
            	teachingTextRef: parts[6]
            };
            self.sendSocketNotification('WebData', result);
          } catch (err) {
            console.log('Fetch error:' + err); // Error handling
          }
    },

    socketNotificationReceived: function (notification) {
        if (notification === 'GetDataFromWeb'){
            this._getWebData();
        }
        else
            self.sendSocketNotification('Error', 'File not opend');
    }
});
