# beatsaver-api - A BeatSaver API Wrapper

## Installation

```sh-session
npm install beatsaver-api
```

## Example Usage

```js
const BeatSaverAPI = require('beatsaver-api');

const api = new BeatSaverAPI({
    AppName = 'Application Name',
    Version = '1.0.0'
});

api.getMapByID('ID').then(map => {}).catch(err => {});
api.getMapByHash('hash').then(map => {}).catch(err => {});
api.getMapsByUploader(userID, page?).then(searchResult => {}).catch(err => {});
api.getLatestMaps(automapper, before?).then(searchResult => {}).catch(err => {});

api.searchMaps(searchOptions, page?).then(searchResult => {}).catch(err => {});
```

You need to make sure that the App Version on the `BeatSaverAPI` constructor is valid [SemVer](https://semver.org/)

## Important Notes

- While using this library with Node.js, all requests made to BeatSaver are made with the User-Agent `AppName/Version` (so, in the example case, the User-Agent sent to BeatSaver will be `Application Name/1.0.0`). However, if you're using this library on a browser, the requests will use your browser's User-Agent.

## Help

If you need help using this module or if you found an error with it, you can always contact me on my [Discord Server](https://discord.gg/qjKhqA3)
