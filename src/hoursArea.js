import umbrellaIconUrl from './static/umbrella.png';

export const renderHours = hoursRecords => {
  const taipeiCityData = hoursRecords.location[0];
  const sectionTitles = ['今天白天', '今晚明晨', '明天白天'];
  const sections = Array.from({ length: 3 }, (value, index) => {
    const content = {};
    content.title = sectionTitles[index];
    taipeiCityData.weatherElement.forEach(weather => {
      if (weather.elementName === 'Wx') {
        content[weather.elementName] = weather.time[index].parameter.parameterValue;
      } else {
        content[weather.elementName] = weather.time[index].parameter.parameterName;
      };
    });
    value = content;
    return value;
  });

  const blockHours = document.querySelector('.block-hours');
  const fragment = document.createDocumentFragment();
  sections.forEach((section, index) => {
    const hourZone = document.createElement('div');
    hourZone.classList.add('hour-zone');

    const title = document.createElement('div');
    title.textContent = `${section.title}`;

    const wx = document.createElement('img');
    wx.classList.add('wx');
    const wxImgId = parseInt(section.Wx) < 10 ? `0${section.Wx}` : `${section.Wx}`;
    wx.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${wxImgId}.svg`;

    const temp = document.createElement('div');
    temp.classList.add('temp');
    temp.textContent = `${section.MinT} - ${section.MaxT} ˚C`;

    const pop = document.createElement('div');
    pop.classList.add('pop');
    const umbrellaIcon = document.createElement('img');
    umbrellaIcon.src = `${umbrellaIconUrl}`;
    const popNum = document.createElement('div');
    popNum.classList.add('pop-num');
    popNum.textContent = `${section.PoP}%`;
    pop.appendChild(umbrellaIcon);
    pop.appendChild(popNum);

    const ci = document.createElement('div');
    ci.classList.add('ci');
    ci.textContent = `${section.CI}`;

    hourZone.appendChild(title);
    hourZone.appendChild(wx);
    hourZone.appendChild(temp);
    hourZone.appendChild(pop);
    hourZone.appendChild(ci);
    fragment.appendChild(hourZone);
  });
  blockHours.appendChild(fragment);
};
