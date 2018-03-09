export function UpdateHourly10Day(sdata, callBack){

  let dataurl = 'http://13.72.104.16/apicache.php?url=http://api.wunderground.com/api/d36721c0718840e5/hourly10day/q/zmw:'+sdata.wuid+'.json';

  let datam = [[], [], [], [], [], [], [], [], [], [], []];
  var currentdate = new Date();
    fetch(dataurl)
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
                  wind: parseInt(item.wspd.metric),
                  feelslike: item.feelslike
                }
            )
        })
        let daycount = 0;
        for (let i = 0; i < weatherdata.length; i++) {

          if(weatherdata[i].time == "12:00 AM"){
            daycount++;
          }

          if(daycount != 0){
            if(i % 2 == 0){
              datam[daycount].push(weatherdata[i]);
            }

          } else {
            if(currentdate.getHours() >= 0 && currentdate.getHours() <= 5){
              if(i % 2 == 0){
                datam[daycount].push(weatherdata[i]);
              }
            } else {
            datam[daycount].push(weatherdata[i]);
            }
          }
        }

        if(datam[0].length < 12){
          for(let i=0; i<= (datam[daycount].length - 5); i++){
            datam[0].push(datam[1][i]);
          }
        }

        let today = datam[0].splice(0,1)[0];
        today.city = sdata.wuname;
        if(today.temp <= 10){
            today.pol = 'None';
        } else if (today.temp > 10 && today.temp <= 15){
            today.pol = 'Low';
        } else if (today.temp > 15 && today.temp < 20){
            today.pol = 'Moderate';
        } else if (today.temp >= 20 && today.temp < 30){
            today.pol = 'High';
        } else if (today.temp <=30 && today.temp < 35){
            today.pol = 'Moderate';
        } else if (today.pol > 40){
            today.pol = 'Low';
        }
        callBack({today: today, hourly : datam});
    });
  return true;
}

export function UpdateDay(sdata, callBack){
  let dataurl = 'http://13.72.104.16/apicache.php?url=http://api.wunderground.com/api/d36721c0718840e5/forecast10day/q/zmw:'+sdata.wuid+'.json';

  var datam = {};
    fetch(dataurl)
    .then(forecast => {
        return forecast.json();
    }).then( data => {
        let weatherdata = data.forecast.simpleforecast.forecastday.map(function(item, i){
            return(
                {
                    city: sdata.wuname,
                    weather: item.conditions,
                    tHigh: parseInt(item.high.celsius),
                    tLow: parseInt(item.low.celsius),
                    epoch: item.date.epoch,
                    timezone: item.date.tz_long
                }
            )
        })
        callBack({daysimple: weatherdata});
    });
  return datam;
}

export function GeoUpdateWeather(sdata, callBack, settings, settingsCallBack){
  var fetchurl = 'http://13.72.104.16/apicache.php?url=http://api.wunderground.com/api/d36721c0718840e5/geolookup/q/' + sdata.latitude + ',' + sdata.longitude + '.json';
    fetch(fetchurl)
    .then(results => {
        return results.json();
    }).then( data => {
        let geodata = {
            wuname: data.location.city,
            wuid: data.location.zip + '.' +  data.location.magic + '.' + data.location.wmo
          };

        if(geodata.wuname != null){
          UpdateDay(geodata, callBack);
          UpdateHourly10Day(geodata, callBack);
          settings.wuname = geodata.wuname;
          console.log(settings);
          settingsCallBack(settings);


        }
    });
  return true;
}
