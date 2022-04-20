class ForecastDays {
  constructor () {
    this._records = null;
    this._tomorrowRecords = null;
    this._todayRecords = null;
    this._afterTomorrowRecords = null;
  }

  getData (data) {
    this._records = { Wx: data[0], T: data[1] };
    this.dataParse(this._records);
  }

  dataParse (data) {
    const date = new Date();
    const todayDate = date.toISOString().split('T');
    const tomorrowDate = this.getDate(date, 'tomorrow');
    const afterTomorrowDate = this.getDate(date, 'afterTomorrow');
    const today = [];
    const tomorrow = [];
    const afterTomorrow = [];

    data.Wx.time.forEach(function (value) {
      if (value.startTime.indexOf(todayDate[0]) !== -1) {
        today.push(value);
      } else if (value.startTime.indexOf(tomorrowDate[0]) !== -1) {
        tomorrow.push(value);
      } else if (value.startTime.indexOf(afterTomorrowDate[0]) !== -1) {
        afterTomorrow.push(value);
      }
    });
    this._todayRecords = today;
    this._tomorrowRecords = tomorrow;
    this._afterTomorrowRecords = afterTomorrow;
  }

  getDate (date, value) {
    const _date = new Date(date);
    if (value === 'tomorrow') {
      _date.setDate(_date.getDate() + 1);
    } else {
      _date.setDate(_date.getDate() + 2);
    }
    const result = _date.toISOString().split('T');
    return result;
  }
}

const _forecastDays = new ForecastDays();

export function renderDays (data) {
  _forecastDays.getData(data);
  //  const block = document.querySelector('.block-days');
  // ***ptr [day[[time], [temp]], ...]
  const dateAndTemp = getDaysDateTempData();
  // **ptr [day[wheather], ...]
  const weatherChip = getDaysWeatherData();
  // ***ptr[day[temp[max], [min]], ...]
  const maxMinTemp = getMaxMinTemp(dateAndTemp);

  const todayWheather = weatherAverage(weatherChip[0]);

  console.log(dateAndTemp);
  console.log(weatherChip);
  console.log(maxMinTemp);
  console.log(todayWheather);
};

function getDaysDateTempData () {
  const result = [];
  for (let i = 0; i < 3; i++) {
    switch (i) {
    case 0:
      result.push(getDateAndTemp(_forecastDays._todayT));
      break;
    case 1:
      result.push(getDateAndTemp(_forecastDays._tomorrowT));
      break;
    case 2:
      result.push(getDateAndTemp(_forecastDays._afterTomorrowT));
      break;
    }
  }
  return result;
}

function getDateAndTemp (records) {
  const temp = [];
  const date = [];

  records.forEach((value) => {
    date.push(value.dataTime.split(' ')[1].substring(0, 5));
    temp.push(value.elementValue[0].value);
  });
  return [temp, date];
}
function getDaysWeatherData () {
  const result = [];
  for (let i = 0; i < 3; i++) {
    switch (i) {
    case 0:
      result.push(getWeatherData(_forecastDays._todayWx));
      break;
    case 1:
      result.push(getWeatherData(_forecastDays._tomorrowWx));
      break;
    case 2:
      result.push(getWeatherData(_forecastDays._afterTomorrowWx));
      break;
    }
  }
  return result;
}
function getWeatherData (records) {
  const result = [];
  records.forEach((value) => {
    const k = value.elementValue[0].value;
    const v = value.elementValue[1].value;
    result.push({ 天氣: k, 代號: v });
  });
  return result;
}
function getMaxMinTemp (data) {
  let min, max;
  const result = [];
  for (let i = 0; i < 3; i++) {
    data[i][0].forEach(function (value, index) {
      if (index === 0) {
        min = value;
        max = value;
      }
      if (Number(value) > max) {
        max = value;
      }
      if (Number(value) < min) {
        min = value;
      }
    });
    result.push([max, min]);
  }
  return result;
}
function weatherAverage (array) {
  const modeMap = {};
  let maxEl = array[0]; let maxCount = 1;
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    if (modeMap[el] == null) { modeMap[el] = 1; } else { modeMap[el]++; }
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}
