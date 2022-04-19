import { getRainfallApi, getForecastTwoDaysApi } from './apis.js';
import './styles/global.css';

const getRainfall = async () => {
  const res = await getRainfallApi();
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
  const rainfallRecords = await getRainfall();
  console.log('test', rainfallRecords);
});

await getForecastTwoDays();