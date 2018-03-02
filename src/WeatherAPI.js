export function getWeatherData(){
  let finaldata = {};
  let hourly = UpdateHourly();
  let day = UpdateDay();
  console.log(hourly);
  console.log(day);
  finaldata.today = hourly.today;
  finaldata.hourly = hourly.hourly;
  finaldata.day = day.day;
  console.log(finaldata);
  return finaldata;
  //return {"Hello World"};
//  return {today: hourly.today, hourly: hourly.hourly, fiveday: fiveday.fiveday};
}

function UpdateHourly(){
  let datam = {};
    fetch('http://api.wunderground.com/api/d36721c0718840e5/hourly/q/UK/Northwood.json')
    .then(results => {
        return results.json();
    }).then( data => {
        let weatherdata = data.hourly_forecast.map(function(item){
            return(
                {time: item.FCTTIME.civil,
                    weather: item.condition,
                    temp: parseInt(item.temp.metric),
                    wind: parseInt(item.wspd.metric)
                }
            )
        })
        let today = weatherdata[0];
        today.city = 'Northwood';
        today.pol = 'High';


        datam.today = today;
        datam.hourly = weatherdata.splice(0, 10);
    });
  return datam;
}

function UpdateDay(){
  var datam = {};
    fetch('http://api.wunderground.com/api/d36721c0718840e5/forecast10day/q/UK/Northwood.json')
    .then(forecast => {
        return forecast.json();
    }).then( data => {
        let weatherdata = data.forecast.simpleforecast.forecastday.map(function(item, i){
            return(
                {day: i,
                    weather: item.conditions,
                    tHigh: parseInt(item.high.celsius),
                    tLow: parseInt(item.low.celsius)
                }
            )
        })
        datam.day = weatherdata;
    });
  return datam;
}
