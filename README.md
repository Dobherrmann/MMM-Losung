# MMM-Losung - German Losung for MagicMirror²

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/). It will fetch and display the daily verse of the day from  www.losungen.de 

![Exemple ](/Example.JPG)

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
  modules: [
    {
      module: "MMM-Losung",
      position: "top_bar",
      config: {
        updateInterval: 3000,
        showDailyText: true,
        showTeachingText: true,
      },
    },
  ],
```
## Configuration options

| Option                | Description
|-----------------------|-----------
| `updateInterval` | *Optional* - The rate (in ms) in which the module will refresh the train data.
| `showDailyText` | *Optional* - Show daily bible verse
| `showTeachingText` |  *Optional* - Show additional teaching text

## Additional informations 
Have fun with your daily input :)
