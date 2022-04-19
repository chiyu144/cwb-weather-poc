import { getRainfallApi, getWeeklyApi } from './apis.js';
import { rendenWeekly } from './weeklyArea.js';
import './styles/global.css';
import './styles/weeklyArea.css';



const getRainfall = async () => {
  const res = await getRainfallApi();
  return res.records;
};

const getWeekly = async () => {
  const res = await getWeeklyApi();
  return res.records;
};


document.addEventListener('DOMContentLoaded', async () => {
  const rainfallRecords = await getRainfall();
  console.log('test', rainfallRecords);
  const weeklyRecords = await getWeekly();
  rendenWeekly(weeklyRecords,'臺北市') ;
});
