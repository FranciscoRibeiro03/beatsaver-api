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

## Important Notes

- You can't use the `downloadMapByKey` and the `downloadMapByHash` functions if you're using this library on a browser.

- While using this library with Node.js, all requests made to BeatSaver are made with the User-Agent `AppName/Version` (so, in the example case, the User-Agent sent to BeatSaver will be `Application Name/1.0.0`). However, if you're using this library on a browser, the requests will use your browser's User-Agent.

## Important for users using webpack

If you try to use [webpack](https://webpack.js.org/) for front-end use with this library, it will throw two errors, due to the fact that the `fs` module is not available.
To stop these errors, you need to add one of the following to your `webpack.config.js` file:

```js
// Classic
module.exports = {
  ...
  node: {
    fs: "empty"
  }
}
```

```js
// Symfony
// You edit the end of the file with the following
let config = Encore.getWebpackConfig();
config.node = {
    fs: "empty"
}
module.exports = config
```

Thank you [KriKrixs](https://github.com/KriKrixs) for this

## Help

If you need help using this module or if you found an error with it, you can always contact me on my [Discord Server](https://discord.gg/qjKhqA3)
