
export function UpdateHourly10Day(callBack){
  let datam = {0 : [], 1 : [], 2 : [], 3 : [], 4 : [], 5 : [], 6 : [], 7 : [], 8 : [], 9 : [], 10 : []};
  var curentdate = new Date();
    var a = fetch('http://api.wunderground.com/api/d36721c0718840e5/hourly10day/q/UK/Northwood.json')
    .then(results => {
        return results.json();
    }).then( data => {
        let weatherdata = data.hourly_forecast.map(function(item, i){
            return(
                {
                  debug: item.FCTTIME.pretty,
                  time: item.FCTTIME.civil,
                  weather: item.condition,
                  temp: parseInt(item.temp.metric),
                  wind: parseInt(item.wspd.metric)
                }
            )
        })
        let daycount = 0;
        for (let i = 0; i < weatherdata.length; i++) {
          if(weatherdata[i].time == "12:00 AM"){
            daycount++;
          }
          datam[daycount].push(weatherdata[i]);
        }

        let today = datam[0].splice(0,1)[0];
        today.city = 'Northwood';
        today.pol = 'High';
        callBack({today: today, hourly : datam});
    });
  return true;
}

export function UpdateDay(callBack){
  var datam = {};
    fetch('http://api.wunderground.com/api/d36721c0718840e5/forecast10day/q/UK/Northwood.json')
    .then(forecast => {
        return forecast.json();
    }).then( data => {
        let weatherdata = data.forecast.simpleforecast.forecastday.map(function(item, i){
            return(
                {
                    weather: item.conditions,
                    tHigh: parseInt(item.high.celsius),
                    tLow: parseInt(item.low.celsius)
                }
            )
        })
        callBack({daysimple: weatherdata});
    });
  return datam;
}
