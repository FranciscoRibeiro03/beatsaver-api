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

api.getMapDetailsByKey('key').then(map => {}).catch(err => {});
api.getMapDetailsByHash('hash').then(map => {}).catch(err => {});
api.getMapsByUploader('userID', page?).then(maps => {}).catch(err => {});
api.getMapsSortedByHot(page?).then(maps => {}).catch(err => {});
api.getMapsSortedByRating(page?).then(maps => {}).catch(err => {});
api.getMapsSortedByLatest(page?).then(maps => {}).catch(err => {});
api.getMapsSortedByDownloads(page?).then(maps => {}).catch(err => {});
api.getMapsSortedByPlays(page?).then(maps => {}).catch(err => {});

api.searchMap('string').then(maps => {}).catch(err => {});

api.downloadMapByKey('key', directory).then(fileLocation => {}).catch(err => {});
api.downloadMapByHash('hash', directory).then(fileLocation => {}).catch(err => {});
```

You need to make sure that the App Version on the `BeatSaverAPI` constructor is valid [SemVer](https://semver.org/)

## Help

If you need help using this module or if you found an error with it, you can always contact me on my [Discord Server](https://discord.gg/qjKhqA3)
