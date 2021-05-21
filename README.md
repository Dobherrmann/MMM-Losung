# MMM-Losung - German Losung for MagicMirror²

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/). It will display the daily verse of the day from  www.losungen.de. You have to download the *.xml file from their website and place that *.xml file in the root folder of the module. 

## Installation

```shell
cd ~/MagicMirror/modules
git clone https://github.com/Dobherrmann/MMM-Losung.git
cd MMM-Losung
npm install
```

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
  modules: [
    {
      module: "MMM-Losung",
      position: "top_bar",
      config: {
        updateInterval: 3000, // 3 * 1000 -> 3s
        filename: "Losungen Free 2021.xml",
        showDailyText: true,
        showTeachingText: true,
      },
    },
  ],
};
```
## Configuration options

| Option                | Description
|-----------------------|-----------
| `updateInterval` | *Optional* - The rate (in ms) in which the module will refresh the train data.
| `filename` | Add the filename of the *xml file with all 'Losungen' (daily bible verses)


## Installation 
<!-- Dieses Modul enthält aus Copyrightgründen nicht die Losungen an sich. Diese müssen von www.losungen.de als CSV (Tab getrennt) heruntergeladen werden und im Modulverzeichnis als losungen.csv gespeichert werden. -->