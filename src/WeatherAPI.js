
export function UpdateHourly(callBack){
  let datam = {};
    var a = fetch('http://api.wunderground.com/api/d36721c0718840e5/hourly/q/UK/Northwood.json')
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
        callBack(datam);
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
                {day: i,
                    weather: item.conditions,
                    tHigh: parseInt(item.high.celsius),
                    tLow: parseInt(item.low.celsius)
                }
            )
        })
        datam.day = weatherdata;
        callBack(datam);
    });
  return true;
}
