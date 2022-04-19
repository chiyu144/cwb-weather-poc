import { getHoursApi, getWeeklyApi } from './apis.js';
import { rendenWeekly } from './weeklyArea.js';
import { renderHours } from './hoursArea.js';
import './styles/global.css';
import './styles/weeklyArea.css';

const getHours = async () => {
  const res = await getHoursApi();
  return res.records;
};

const getWeekly = async () => {
  const res = await getWeeklyApi();
  return res.records;
};

document.addEventListener('DOMContentLoaded', async () => {
  const hoursRecords = await getHours();
  renderHours(hoursRecords);
  const weeklyRecords = await getWeekly();
  rendenWeekly(weeklyRecords, '臺北市');
});
