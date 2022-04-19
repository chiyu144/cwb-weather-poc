import './styles/weeklyArea.css'
import Chart from 'chart.js/auto'
import sunDay from './static/sun.gif';
import sunRain from './static/sunRain.gif';
import sunCloud from './static/sunCloud.gif';
import cloudDay from './static/cloud.png';
import storm from './static/storm.gif';
import littleRain from './static/littleRain.gif';
import rainDay from './static/rain.gif';
import heavyRain from './static/hr.gif';
import snow from './static/lightSnow.gif';

const lineCharDay=[]
const minT=[]
const maxT=[]
const wx=[]

export function rendenWeekly(weeklyRecords,cityName){

const weeklyUp=document.createElement('div')
weeklyUp.setAttribute("id", "weeklyUp")
document.getElementsByClassName('block block-week')[0].append(weeklyUp)

const weeklyBoxUp=document.createElement('div')
weeklyBoxUp.setAttribute("id", "weeklyBoxUp")
weeklyUp.append(weeklyBoxUp)

const weeklyBoxMiddle=document.createElement('div')
weeklyBoxMiddle.setAttribute("id", "weeklyBoxMiddle")
weeklyUp.append(weeklyBoxMiddle)

const weeklyBoxDown=document.createElement('div')
weeklyBoxDown.setAttribute("id", "weeklyBoxDown")
weeklyUp.append(weeklyBoxDown)


const WeeklyMid=document.createElement('div')
WeeklyMid.setAttribute("id", "WeeklyMid")
document.getElementsByClassName('block block-week')[0].append(WeeklyMid)


const lineChar=document.createElement('canvas')
lineChar.setAttribute("id", "myChart")
WeeklyMid.append(lineChar)
let WeeeklyDayList=['日','一','二','三','四','五','六']
  const weeklyAll=weeklyRecords.locations[0].location
  for(let i=0;i<weeklyAll.length;i++){
    const WeeklyData=weeklyRecords.locations[0].location[i]
    if (WeeklyData.locationName==cityName){
      const WeeklyCityData=weeklyRecords.locations[0].location[i].weatherElement
      for(let m=0;m<WeeklyCityData.length;m++){
        if(WeeklyCityData[m].elementName=='MinT'){
          for(let j=0;j<WeeklyCityData[m].time.length;j++){
            lineCharDay.push(WeeklyCityData[m].time[j].startTime.split(' ')[0].split('-')[2])
            const WeelyDate = new Date(WeeklyCityData[m].time[j].startTime.replace(/-/g,'/'))
            const WeelyDay=WeelyDate.getDay()
            if(j%2!=0){
              const weeklyDate=document.createElement('div')
              weeklyDate.className='weeklyDate'
              const weeklyDay=document.createElement('div')
              weeklyDay.className='weeklyDay'
              if(j==1){
                weeklyDate.textContent='今'

              }else{
                weeklyDate.textContent=WeeeklyDayList[WeelyDay]
                if((WeeeklyDayList[WeelyDay]=='六') || (WeeeklyDayList[WeelyDay]=='日')){
                  weeklyDate.style.color='red'
                }

              }
              weeklyDay.textContent=WeeklyCityData[m].time[j].startTime.split(' ')[0].split('-')[2]+'日'
              weeklyBoxMiddle.append(weeklyDay)
              weeklyBoxUp.append(weeklyDate)
            }

            minT.push(WeeklyCityData[m].time[j].elementValue[0].value)
          }
        }
        if(WeeklyCityData[m].elementName=='MaxT'){
          for(let j=0;j<WeeklyCityData[m].time.length;j++){
            maxT.push(WeeklyCityData[m].time[j].elementValue[0].value)

          }
        }
        if(WeeklyCityData[m].elementName=='Wx'){
          for(let j=0;j<WeeklyCityData[m].time.length;j++){
            wx.push(WeeklyCityData[m].time[j].elementValue[0].value)
            if(j%2!=0){
              const dayWx=document.createElement('div')
              dayWx.className='dayWx'
              const dayWxValue=WeeklyCityData[m].time[j].elementValue[0].value
              if(dayWxValue=='晴天'){
                dayWx.style.backgroundImage=`url("${sunDay}")`
              }else if((dayWxValue=='晴時多雲') || (dayWxValue=='多雲時晴') || (dayWxValue=='多雲')){
                dayWx.style.backgroundImage=`url("${sunCloud}")`
              }else if((dayWxValue=='多雲時陰') || (dayWxValue=='陰時多雲') || (dayWxValue=='陰天')){
                dayWx.style.backgroundImage=`url("${cloudDay}")`
              }else if(dayWxValue==('雨天')){
                dayWx.style.backgroundImage=`url("${rainDay}")`
              }else if((dayWxValue.includes('雨')) && (dayWxValue.includes('雷'))){
                dayWx.style.backgroundImage=`url("${storm}")`
              }else if((dayWxValue.includes('暫雨')) && (!(dayWxValue.includes('雷')))){
                dayWx.style.backgroundImage=`url("${littleRain}")`
              }else if((dayWxValue.includes('陣雨')) && (!(dayWxValue.includes('雷')))){
                dayWx.style.backgroundImage=`url("${heavyRain}")`
              }else if(dayWxValue.includes('雪')){
                dayWx.style.backgroundImage=`url("${snow}")`
              }else{
                dayWx.style.backgroundImage=`url("${cloudDay}")`
              }
              weeklyBoxDown.append(dayWx)
            }
          }
        }
      }
    }
  }


  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx,{
    type: 'line', //圖表類型
    data: {
      //標題
      labels: [lineCharDay[1]+'日',lineCharDay[3]+'日',lineCharDay[5]+'日',lineCharDay[7]+'日',lineCharDay[9]+'日',lineCharDay[11]+'日',lineCharDay[13]+'日'],
      datasets: [{
        label: '最高溫', //標籤
        data: [minT[1],minT[3],minT[5],minT[7],minT[9],minT[11],minT[13]],
        //圖表背景色
        backgroundColor: [
          'rgba(255, 255, 255, 0.2)',
        ],
        //圖表外框線色
        borderColor: [
          'rgba(75, 192, 192, 1)',
        ],
        //外框線寬度
        borderWidth: 1
      },{
        label: '最低溫', //標籤
        data: [maxT[1],maxT[3],maxT[5],maxT[7],maxT[9],maxT[11],maxT[13]],
        //圖表背景色
        backgroundColor: [
          'rgba(255, 255, 255, 0.2)',
        ],
        //圖表外框線色
        borderColor: [
          'rgba(244, 155, 92, 1)',
        ],
        //外框線寬度
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          type: 'linear'
      },
      }
    }
  });

}


