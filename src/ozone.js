import './styles/jay.css';


export function renderOzone(OzoneRecords) {


  // 取得資料顯示圖表上
  function elementValue(num) {
    let elementValue = OzoneRecords.location.weatherElement[2].time.slice(-6)[num].elementValue
    elementValue = parseInt(elementValue) / 5 + "%"
    document.getElementsByClassName('result-bar')[num].style.height = elementValue;
    // console.log("elementValue迴圈test", elementValue)
  }

  function dataTime(num) {
    let dataTime = OzoneRecords.location.weatherElement[2].time.slice(-6)[num].dataTime
    document.getElementsByClassName('result-bg')[num].setAttribute('data-month', dataTime)
    // console.log("dataTime迴圈test", dataTime)
  }


  for (let i = 0; i < 6; i++) {
    elementValue(i);
    dataTime(i)
  }



  //遍歷 Date 判斷 Date 裡面的第幾個數據
  function getNumdata() {
    for (let i = 0; i < 365; i++) {
      if (OzoneRecords.location.weatherElement[2].time[i].dataTime == document.getElementsByClassName('result-bg')[5].getAttribute('data-month')) {
        let Numdata = i
        return Numdata
      }
    }
  }

  //輪播函式，監聽右鍵有沒有被按

  document.getElementById("img_rightArrow").addEventListener(
    "click",

    function getRightArrow() {

      if (document.getElementsByClassName('result-bg')[5].getAttribute('data-month') !== OzoneRecords.location.weatherElement[2].time[364].dataTime) {

        let Numdata = getNumdata()

        function elementValue(num) {
          let elementValue = OzoneRecords.location.weatherElement[2].time.slice(0, Numdata + 2).slice(-6)[num].elementValue
          elementValue = parseInt(elementValue) / 5 + "%"
          document.getElementsByClassName('result-bar')[num].style.height = elementValue;
        }

        function dataTime(num) {
          let dataTime = OzoneRecords.location.weatherElement[2].time.slice(0, Numdata + 2).slice(-6)[num].dataTime
          document.getElementsByClassName('result-bg')[num].setAttribute('data-month', dataTime)
        }

        for (let i = 0; i < 6; i++) {
          elementValue(i);
          dataTime(i)
        }

        fnLineChart(eleDots)
      }
    },
    false
  );

  //輪播函式，監聽左鍵有沒有被按

  // let img_leftArrow = document.querySelector('img_leftArrow');
  img_leftArrow.addEventListener(
    "click",

    function getLeftArrow() {
      if (document.getElementsByClassName('result-bg')[0].getAttribute('data-month') != OzoneRecords.location.weatherElement[2].time[0].dataTime) {


        let Numdata = getNumdata()

        function elementValue(num) {
          let elementValue = OzoneRecords.location.weatherElement[2].time.slice(0, Numdata).slice(-6)[num].elementValue
          elementValue = parseInt(elementValue) / 5 + "%"
          document.getElementsByClassName('result-bar')[num].style.height = elementValue;
        }

        function dataTime(num) {
          let dataTime = OzoneRecords.location.weatherElement[2].time.slice(0, Numdata).slice(-6)[num].dataTime
          document.getElementsByClassName('result-bg')[num].setAttribute('data-month', dataTime)
        }


        for (let i = 0; i < 6; i++) {
          elementValue(i);
          dataTime(i)
        }
      }

      fnLineChart(eleDots)

    },
    false
  );

  // Setup Chart

  let eleDots = document.querySelectorAll('#chartX s');

  // 折線
  let fnLineChart = function (eles) {
    [].slice.call(eles).forEach(function (ele, index) {
      let eleNext = eleDots[index + 1];
      if (!eleNext) { return; }
      let eleLine = ele.querySelector('i');
      if (!eleLine) {
        eleLine = document.createElement('i');
        eleLine.setAttribute('line', '');
        ele.appendChild(eleLine);
      }
      // 紀錄座標
      let boundThis = ele.getBoundingClientRect();
      // 下一點座標
      let boundNext = eleNext.getBoundingClientRect();
      // 計算長度和旋轉角度
      let x1 = boundThis.left, y1 = boundThis.top;
      let x2 = boundNext.left, y2 = boundNext.top;
      // 長度
      let distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      // 弧度
      let radius = Math.atan((y2 - y1) / (x2 - x1));
      // 線條樣式
      eleLine.style.width = distance + 'px';
      eleLine.style.msTransform = 'rotate(' + radius + 'rad)';
      eleLine.style.transform = 'rotate(' + radius + 'rad)';
    });
  };

  // 調用折線方法
  fnLineChart(eleDots);

  //瀏覽器改變尺寸的時候
  window.addEventListener('resize', function () {
    fnLineChart(eleDots);
  });

}
