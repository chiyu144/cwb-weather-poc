class ForecastDays {
  constructor () {
    this._records = null;
  }

  getData (data) {
    this._records = { Wx: data[0], T: data[1] };
    this.dataParse();
  }

  dataParse () {
    const resultWx = this.splitWithDate(this._records.Wx, 'startTime');
    const resultT = this.splitWithDate(this._records.T, 'dataTime');

    this._todayWx = resultWx[0];
    this._tomorrowWx = resultWx[1];
    this._afterTomorrowWx = resultWx[2];

    this._todayT = resultT[0];
    this._tomorrowT = resultT[1];
    this._afterTomorrowT = resultT[2];
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

  splitWithDate (data, key) {
    const date = new Date().toLocaleString({ timeZone: 'Asia/Taipei' });
    const day = date.split(',')[0].split('/');
    if (day[0].length < 2) {
      day[0] = '0' + day[0];
    }
    if (day[1].length < 2) {
      day[1] = '0' + day[1];
    }
    const todayDate = `${day[2]}-${day[0]}-${day[1]}`;
    const tomorrowDate = `${day[2]}-${day[0]}-${Number(day[1]) + 1}`;
    const afterTomorrowDate = `${day[2]}-${day[0]}-${Number(day[1]) + 2}`;
    const today = []; const tomorrow = []; const afterTomorrow = [];
    data.time.forEach(function (value) {
      const time = value[key];
      if (time.indexOf(todayDate) !== -1) {
        today.push(value);
      } else if (time.indexOf(tomorrowDate) !== -1) {
        tomorrow.push(value);
      } else if (time.indexOf(afterTomorrowDate) !== -1) {
        afterTomorrow.push(value);
      }
    });
    return [today, tomorrow, afterTomorrow];
  }
}

const _forecastDays = new ForecastDays();
let offset = 0;
export function renderDays (data) {
  if (data !== undefined) {
    _forecastDays.getData(data);
    document.querySelector('.block-days').addEventListener('mouseover', function () {
      const btnLeft = document.querySelector('#left-btn');
      const btnRight = document.querySelector('#right-btn');

      btnLeft.style.display = 'block';
      btnRight.style.display = 'block';
    });
    document.querySelector('.block-days').addEventListener('mouseout', function () {
      const btnLeft = document.querySelector('#left-btn');
      const btnRight = document.querySelector('#right-btn');

      btnLeft.style.display = 'none';
      btnRight.style.display = 'none';
    });
    document.querySelector('#left-btn').addEventListener('click', function () {
      if (offset > 0) {
        offset--;
      } else {
        offset = 2;
      }
      removeElement();
      renderDays(undefined);
    });
    document.querySelector('#right-btn').addEventListener('click', function () {
      if (offset < 2) {
        offset++;
      } else {
        offset = 0;
      }
      removeElement();
      renderDays(undefined);
    });
  }
  // ***ptr [day[[time], [temp]], ...]
  const dateAndTemp = getDaysDateTempData();
  // **ptr [day[wheather], ...]
  const weatherChip = getDaysWeatherData();
  // ***ptr[day[temp[max], [min]], ...]
  const maxMinTemp = getMaxMinTemp(dateAndTemp);

  //  const todayWheather = weatherAverage(weatherChip[0]);
  createTitle();
  createItem(offset, dateAndTemp, weatherChip, maxMinTemp);
};
function createTitle () {
  const block = document.querySelector('.block-days');
  const title = document.createElement('div');
  const day = document.createElement('div');

  title.setAttribute('id', 'title');
  title.textContent = '三小時預報';
  day.setAttribute('id', 'title-time');
  if (offset === 0) {
    day.textContent = '今天';
  } else if (offset === 1) {
    day.textContent = '明天';
  } else {
    day.textContent = '後天';
  }
  block.appendChild(title);
  block.appendChild(day);
}
function createItem (offset, dateAndTemp, weather, maxMinTemp) {
  const block = document.querySelector('.block-days');
  for (let i = 0; i < dateAndTemp[offset][1].length; i++) {
    const day = document.createElement('div');
    day.setAttribute('id', 'day');
    const img = document.createElement('img');
    img.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${weather[offset][i]['代號']}.svg`;
    const temp = document.createElement('div');
    temp.setAttribute('id', 'temp');
    temp.textContent = `${dateAndTemp[offset][0][i]}℃`;
    if (dateAndTemp[offset][1].length > 2) {
      if (dateAndTemp[offset][0][i] === maxMinTemp[offset][0]) {
        temp.style.color = 'red';
      } else if (dateAndTemp[offset][0][i] === maxMinTemp[offset][1]) {
        temp.style.color = 'aqua';
      }
    }

    const startTime = document.createElement('div');
    startTime.setAttribute('id', 'start-time');
    startTime.textContent = dateAndTemp[offset][1][i];
    const line = document.createElement('div');
    line.setAttribute('id', 'time-to');
    line.textContent = '|';
    const endTime = document.createElement('div');
    endTime.setAttribute('id', 'end-time');
    let time = ((Number((dateAndTemp[offset][1][i]).substring(0, 2)) + 3)).toString();
    if (time.length < 2) {
      time = '0' + time;
    }
    endTime.textContent = `${time}:00`;

    day.appendChild(img);
    day.appendChild(temp);
    day.appendChild(startTime);
    day.appendChild(line);
    day.appendChild(endTime);
    block.appendChild(day);
  }
}

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

function removeElement () {
  const block = document.querySelector('.block-days');
  const item = document.querySelectorAll('#day');
  const title = document.querySelector('#title');
  const day = document.querySelector('#title-time');

  item.forEach(function (value) {
    block.removeChild(value);
  });
  block.removeChild(title);
  block.removeChild(day);
}
