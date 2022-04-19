import { getHoursApi, getWeeklyApi, getForecastTwoDaysApi } from './apis.js';
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

const getForecastTwoDays = async (location) =>{
  let params, records, data;
  params = {locationName:location, elementName:['Wx', 'T']};
  const res = await getForecastTwoDaysApi(params);
  records = res.records.locations[0].location[0].weatherElement;
  data = {"Wx":records[0], "T":records[1]};
  return data;
}

document.addEventListener('DOMContentLoaded', async () => {
  const hoursRecords = await getHours();
  renderHours(hoursRecords);
  const weeklyRecords = await getWeekly();
  rendenWeekly(weeklyRecords, '臺北市');
});

await getForecastTwoDays();