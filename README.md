# MMM-Losung - German Losung for MagicMirror²

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

## Installation

```shell
cd ~/MagicMirror/modules
git clone https://github.com/shbatm/MMM-OnScreenMenu
cd MMM-OnScreenMenu/
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
        fadeSpeed: 0,
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
