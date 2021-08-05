import { existsSync, readFileSync, unlinkSync } from 'fs';
import BeatSaverAPI from '../BeatSaverAPI';

// Song Info for Key abcd (map: Keep it up)
const knownKey1 = 'abcd';
const knownHash1 = '2f3e8fcd9df83062343ee2a8ba4ba78bb4d83ed0';
const knownUploaderID1 = '5cff0b7698cc5a672c854703';
const knownUploaderUsername1 = 'epictroller';

// Song Info for Key 2144 (map: Shut Up and Dance)
const knownKey2 = '2144';
const knownHash2 = '89cf8bb07afb3c59ae7b5ac00337d62261c36fb4';
const knownUploaderID2 = '5cff0b7298cc5a672c84e98d';
const knownUploaderUsername2 = 'bennydabeast';

const bsapi = new BeatSaverAPI({
  AppName: 'BeatSaverAPI',
  Version: '1.0.0',
});

test(`Test Map with Key ${knownKey1}`, async () => {
  const map = await bsapi.getMapDetailsByKey(knownKey1);
  expect(map).not.toBeNull();
  if (!map) throw new Error('Map is null');
  expect(map.key).toBe(knownKey1);
  expect(map.hash).toBe(knownHash1);
  if (!map.uploader) throw new Error('Map Uploader is null');
  expect(map.uploader._id).toBe(knownUploaderID1);
  expect(map.uploader.username).toBe(knownUploaderUsername1);
});

test(`Test Map with Key ${knownKey2}`, async () => {
  const map = await bsapi.getMapDetailsByKey(knownKey2);
  expect(map).not.toBeNull();
  if (!map) throw new Error('Map is null');
  expect(map.key).toBe(knownKey2);
  expect(map.hash).toBe(knownHash2);
  if (!map.uploader) throw new Error('Map Uploader is null');
  expect(map.uploader._id).toBe(knownUploaderID2);
  expect(map.uploader.username).toBe(knownUploaderUsername2);
});

test(`Test Maps by Uploader ${knownUploaderUsername1}`, async () => {
  const result = await bsapi.getMapsByUploader(knownUploaderID1);
  if (!result) throw new Error('Result is null');
  expect(result.docs.length).toBeGreaterThan(0);
  expect(result.prevPage).toBeNull();
  expect(result.totalDocs).toBeGreaterThan(0);

  for (const map of result.docs) {
    if (!map.uploader) throw new Error('Map Uploader is null');
    expect(map.uploader._id).toBe(knownUploaderID1);
    expect(map.uploader.username).toBe(knownUploaderUsername1);
  }
});

test('Test Pages', async () => {
  const resultPage0 = await bsapi.getMapsSortedByHot();
  if (!resultPage0) throw new Error('Page 0 is null');
  expect(resultPage0.prevPage).toBeNull();
  expect(resultPage0.nextPage).not.toBeNull();
  expect(resultPage0.lastPage).not.toBeNull();

  const resultPage1 = await bsapi.getMapsSortedByHot(1);
  if (!resultPage1) throw new Error('Page 1 is null');
  expect(resultPage1.prevPage).toBe(0);
  expect(resultPage1.nextPage).toBe(2);
});

test('Test Map Equality', async () => {
  const map1ByKey = await bsapi.getMapDetailsByKey(knownKey1);
  const map1ByHash = await bsapi.getMapDetailsByHash(knownHash1);
  const map2ByKey = await bsapi.getMapDetailsByKey(knownKey2);
  expect(map1ByKey).toStrictEqual(map1ByHash);
  expect(map2ByKey).not.toEqual(map1ByKey)
});

jest.setTimeout(30000);

test('Test Map Downloading', async () => {
  const fileLocationByKey = await bsapi.downloadMapByKey(knownKey1, './');
  const fileLocationByHash = await bsapi.downloadMapByHash(knownHash1, './');
  
  const fileBytesByKey = readFileSync(fileLocationByKey);
  const fileBytesByHash = readFileSync(fileLocationByHash);

  expect(fileBytesByKey).toEqual(fileBytesByHash);

  if (existsSync(fileLocationByKey)) unlinkSync(fileLocationByKey);
  if (existsSync(fileLocationByHash)) unlinkSync(fileLocationByHash);
});