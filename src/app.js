import { getRainfallApi } from './apis.js';
import './styles/global.css';

const getRainfall = async () => {
  const res = await getRainfallApi();
  return res.records;
};

document.addEventListener('DOMContentLoaded', async () => {
  const rainfallRecords = await getRainfall();
  console.log('test', rainfallRecords);
});
