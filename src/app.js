import { getHoursWeatherApi } from './apis.js';
import { renderHoursWeather } from './hours.js';
import './styles/global.css';
import './styles/hours.css';

const getHoursWeather = async () => {
  const res = await getHoursWeatherApi();
  return res.records;
};

document.addEventListener('DOMContentLoaded', async () => {
  const hoursWeatherRecords = await getHoursWeather();
  renderHoursWeather(hoursWeatherRecords);
});
