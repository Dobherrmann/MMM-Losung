Module.register('MMM-Losung', {
	defaults: {
		updateInterval: 3600000, // every hour
		showDailyText: true,
		showTeachingText: true,
	},

	/**
	 * Start function init update Dom + Get Data from xml File
	 */
	start: function () {
		let self = this;
		Log.info(
			'Starting module!: ' +
				self.name +
				', identifier: ' +
				self.identifier
		);

		self.getData(self);
		setInterval(function () {
			self.getData(self);
			self.updateDom();
		}, self.config.updateInterval);
	},

	getStyles: function () {
		return ['MMM-Losung.css'];
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
		self.losungData = null;
		self.sendSocketNotification('GetDataFromWeb');
	},

	getDom: function () {
		let self = this;
		let wrapper = document.createElement('div');
		wrapper.classList.add('moravian-container');

		if (self.losungData === null) {
			wrapper.innerHTML = 'Data get loaded';
		} else {
			const dailyTextElement = self._createElement(
				[
					'Losung:',
					self.losungData.dailyText,
					self.losungData.dailyTextRef,
				],
				'moravian'
			);
			wrapper.appendChild(dailyTextElement);
			const teachingTextElement = self._createElement(
				[
					'Lehrtext:',
					self.losungData.teachingText,
					self.losungData.teachingTextRef,
				],
				'teaching'
			);
			wrapper.appendChild(teachingTextElement);

			if (
				dailyTextElement !== undefined &&
				teachingTextElement !== undefined
			) {
				dailyTextElement.style.display = self.config.showDailyText
					? 'block'
					: 'none';

				if (self.config.showTeachingText) {
					teachingTextElement.style.display = 'block';
				} else {
					teachingTextElement.style.display = 'none';
					dailyTextElement.classList.remove('moravian-moravian');
				}
			}
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
		console.log(this.name, notification, payload);
		let self = this;
		if (notification === 'Error')
			console.error(self.name, 'Error in helper Module', payload);
		else if (notification === 'WebData') {
			self.losungData = payload;
			self.updateDom();
		} else {
			console.error(self.name, 'Undefined Function', payload);
		}
	},
});
