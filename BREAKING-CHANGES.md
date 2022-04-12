# Breaking Changes on v2.0.0

These are all the breaking changes on v2.0.0

## Method Changes

```diff
- api.getMapDetailsByKey('key').then(map => {}).catch(err => {});
+ api.getMapByID('id').then(map => {}).catch(err => {});

- api.getMapDetailsByHash('hash').then(map => {}).catch(err => {});
+ api.getMapByHash('hash').then(map => {}).catch(err => {});

- api.getMapsSortedByLatest(page?).then(searchResult => {}).catch(err => {});
+ api.getLatestMaps(automapper, before?).then(searchResult => {}).catch(err => {});

- api.getMapsSortedByHot(page?).then(searchResult => {}).catch(err => {});
- api.getMapsSortedByRating(page?).then(searchResult => {}).catch(err => {});
- api.getMapsSortedByDownloads(page?).then(searchResult => {}).catch(err => {});
- api.getMapsSortedByPlays(page?).then(searchResult => {}).catch(err => {});

- api.searchMap('string').then(searchResult => {}).catch(err => {});
+ api.searchMaps(searchOptions, page?).then(searchResult => {}).catch(err => {});

- api.downloadMapByKey('key', directory).then(fileLocation => {}).catch(err => {});
- api.downloadMapByHash('hash', directory).then(fileLocation => {}).catch(err => {});
```

## Downloading maps

The methods for downloading maps have been removed. You now have to handle downloading the files yourself.
To get the download URL for a map, you can use the following code:

```js
const requestedMap = await api.getMapByID('ID');
const downloadURL = requestedMap.versions[0].downloadURL;
```
