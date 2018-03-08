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
            //console.log(currentdate.getHours());
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
        //console.log(data);
        today.city = sdata.wuname;
        today.pol = 'High';
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
                    tLow: parseInt(item.low.celsius)
                }
            )
        })
        callBack({daysimple: weatherdata});
    });
  return datam;
}

export function GeoUpdateWeather(sdata, callBack){
  var datam = {};
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
        }
    });
  return true;
}
