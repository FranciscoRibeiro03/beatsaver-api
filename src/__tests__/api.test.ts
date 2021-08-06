import { existsSync, readFileSync, unlinkSync } from 'fs';
import BeatSaverAPI from '../BeatSaverAPI';

// Song Info for Key abcd (map: Keep it up)
const knownKey1 = 'abcd';
const knownHash1 = '2f3e8fcd9df83062343ee2a8ba4ba78bb4d83ed0';
const knownUploaderID1 = 4285821;
const knownUploaderUsername1 = 'EpicTroller';

// Song Info for Key 2144 (map: Shut Up and Dance)
const knownKey2 = '2144';
const knownHash2 = '89cf8bb07afb3c59ae7b5ac00337d62261c36fb4';
const knownUploaderID2 = 30311;
const knownUploaderUsername2 = 'bennydabeast';

const bsapi = new BeatSaverAPI({
  AppName: 'BeatSaverAPI',
  Version: '1.0.0',
});

test(`Test Map with Key ${knownKey1}`, async () => {
  const map = await bsapi.getMapByID(knownKey1);
  expect(map).not.toBeNull();
  if (!map) throw new Error('Map is null');
  expect(map.versions[0].key).toBe(knownKey1);
  expect(map.versions[0].hash).toBe(knownHash1);
  if (!map.uploader) throw new Error('Map Uploader is null');
  expect(map.uploader.id).toBe(knownUploaderID1);
  expect(map.uploader.name).toBe(knownUploaderUsername1);
});

test(`Test Map with Key ${knownKey2}`, async () => {
  const map = await bsapi.getMapByID(knownKey2);
  expect(map).not.toBeNull();
  if (!map) throw new Error('Map is null');
  expect(map.versions[0].key).toBe(knownKey2);
  expect(map.versions[0].hash).toBe(knownHash2);
  if (!map.uploader) throw new Error('Map Uploader is null');
  expect(map.uploader.id).toBe(knownUploaderID2);
  expect(map.uploader.name).toBe(knownUploaderUsername2);
});

test(`Test Maps by Uploader ${knownUploaderUsername1}`, async () => {
  const result = await bsapi.getMapsByUploader(knownUploaderID1);
  if (!result) throw new Error('Result is null');
  expect(result.docs.length).toBeGreaterThan(0);

  for (const map of result.docs) {
    if (!map.uploader) throw new Error('Map Uploader is null');
    expect(map.uploader.id).toBe(knownUploaderID1);
    expect(map.uploader.name).toBe(knownUploaderUsername1);
  }
});

test('Test Map Equality', async () => {
  const map1ByKey = await bsapi.getMapByID(knownKey1);
  const map1ByHash = await bsapi.getMapByHash(knownHash1);
  const map2ByKey = await bsapi.getMapByID(knownKey2);
  expect(map1ByKey).toStrictEqual(map1ByHash);
  expect(map2ByKey).not.toEqual(map1ByKey)
});