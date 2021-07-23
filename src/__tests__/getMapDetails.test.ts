import { BeatSaverSong } from '../types/BeatSaverSong';
import BeatSaverAPI from '../BeatSaverAPI';
import axios from 'axios';

let key: string, hash: string, song: BeatSaverSong;

async function getSong() {

  const request = await axios.get('https://beatsaver.com/api/maps/detail/108ee', {headers: {'User-Agent': 'BeatSaverAPI/1.0.0'}});
  if (request.status === 404) throw new Error('Song not found');
  if (request.status === 429) throw new Error('Rate Limit Exceeded');
  if (request.status !== 200) throw new Error('Unknown Error');
  
  key = request.data.key;
  hash = request.data.hash;
  song = request.data as BeatSaverSong;

}


const bsapi = new BeatSaverAPI({
  AppName: 'BeatSaver API',
  Version: '1.0.0',
});

test('Get Map Details By Key', async () => {
  await getSong();
  expect(await bsapi.getMapDetailsByKey(key)).toStrictEqual(song);
});

test('Get Map Details By Hash', async () => {
  await getSong();
  expect(await bsapi.getMapDetailsByHash(hash)).toStrictEqual(song);
});
