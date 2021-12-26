Module.register("MMM-Losung",
    {
        defaults: {
            updateInterval: 10000, // 3 * 1000 -> 60s
            showDailyText: true,
            showTeachingText: true,
        },

        /**
         * Start function init update Dom + Get Data from xml File
         */
        start: function () {
            let self = this;
            Log.info("Starting module!: " + self.name + ", identifier: " + self.identifier);

            self.getData(self);
            self.getDom()
            setInterval(function () {
                self.updateDom();
                self.getData(self);
                // self.updateDailyMoravianFromXML();
            }, self.config.updateInterval);

        },

        getStyles: function () {
            return ['MMM-Losung.css',];
        },

        getScripts: function () {
            return [];
        },

        /*
         * getData
         * function example return data and show it in the module wrapper
         * get a URL request
         *
         */
        getData: function (self) {
            self.MoravianData = null;
            self.DailyMoravian = null;

            self.DailyVerse = null;
            self.DailyTeachingText = null;

            
           const actDate = new Date();

           // Set URL for web request
           // const url = 'https://www.losungen.de/fileadmin/media-losungen/heute/2021/0605.html';
           const day = actDate.getDate() < 10 ? `0${actDate.getDate().toString()}`: actDate.getDate().toString();
           const month = (actDate.getMonth()+1) < 10 ? `0${(actDate.getMonth()+1).toString()}`: (actDate.getMonth()+1).toString();

           const url = `https://www.losungen.de/fileadmin/media-losungen/heute/${actDate.getFullYear()}/${month}${day}.html`
           // console.log("url", url)
           self.sendSocketNotification('GetDataFromWeb', url);

        },

        getDom: function () {
            let self = this;
            let wrapper = document.createElement("div");
            wrapper.classList.add("moravian-container");

            if ((self.DailyVerse === null || self.DailyVerse === undefined) &&
                (self.DailyTeachingText === null || self.DailyTeachingText === undefined))
                wrapper.innerHTML = "Data get loaded";
            else {
                const dailyTextElement = self._createElement(['Losung:', self.DailyVerse[0], self.DailyVerse[1]], 'moravian');
                wrapper.appendChild(dailyTextElement);
                const teachingTextElement = self._createElement(['Lehrtext:', self.DailyTeachingText[0], self.DailyTeachingText[1]], 'teaching');
                wrapper.appendChild(teachingTextElement);


                if (dailyTextElement !== undefined && teachingTextElement !== undefined) {
                    dailyTextElement.style.display = self.config.showDailyText ? "block" : "none";

                    if (self.config.showTeachingText) {
                        teachingTextElement.style.display = "block";
                    }
                    else {
                        teachingTextElement.style.display = "none";
                        dailyTextElement.classList.remove("moravian-moravian")
                        // console.log(dailyTextElement.classList)
                    }
                }

                // console.log(self.config.showDailyText, self.config.showTeachingText)
            }
            return wrapper;
        },

        _createElement(texts, clases) {
            let element = document.createElement('div');
            let elementHeader = document.createElement('div');
            let elementText = document.createElement('div');
            let elementVers = document.createElement('div');
            element.classList.add(`moravian-${clases}`);
            elementHeader.classList.add(`moravian-header`);
            elementText.classList.add(`${clases}-text`);
            elementVers.classList.add(`${clases}-vers`);
            elementHeader.innerHTML = texts[0];
            elementText.innerHTML = texts[1];
            elementVers.innerHTML = texts[2];

            element.appendChild(elementHeader);
            element.appendChild(elementText);
            element.appendChild(elementVers);


            return element;
        },

        socketNotificationReceived: function (notification, payload) {
            // console.log(this.name, notification, payload)
            let self = this;
            if (notification === 'Error')
                console.error(self.name, "Error in helper Module", payload)
            else if (notification === 'WebData') {
                // console.log("WEBDatarecived", notification, payload);
                // Remove WebHeader
                const rawHTMLCode = payload.split("<tr><td>&nbsp;</td></tr>");
                rawHTMLCode.shift();

                self.DailyVerse = this._getVerse(rawHTMLCode[0]);
                self.DailyTeachingText = this._getVerse(rawHTMLCode[1]);
                // console.log("daily", self.DailyVerse, self.DailyTeachingText)
            }

            else {
                console.error(self.name, "Undefined Function", payload)

            }
        },


        //#region private functions
       
        /**
         * Calculate the day of the year
         * @param {*} date Acutal date
         * @returns 
         */
        daysIntoYear: function (date) {
            return (Date.UTC(date.getYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getYear(), 0, 0)) / 24 / 60 / 60 / 1000;
        },

        /**
         * Splits the raw HTML code to an array with the versetext and the verse
         * @param {*} rawHTMLVerse RawHTLM Verse
         * @returns 
         */
        _getVerse(rawHTMLVerse) {
            const start = rawHTMLVerse.search("<b>") + 3
            const end = rawHTMLVerse.search("</font>")
            // console.log("split", split)
            let sliced = rawHTMLVerse.slice(start, end);
            // console.log("sliced", sliced)

            const verseEnd = sliced.search("</b>");
            const verseSplited = sliced.split("</b>");
            const dailyverse = verseSplited[0];
            const verse = verseSplited[1].replace("<br>", "")
            // console.log("dailyverse", dailyverse);
            // console.log("verse", verse);
            return [dailyverse, verse];
        },


        //#endregion
    });