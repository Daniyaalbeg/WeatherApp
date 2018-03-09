import React, { Component } from 'react';
import './DogInterface.css';
import Info from './Info/Info.js';
import Message from './Message/Message.js';

    // The dog interface is the main window of the application. It is from in here that
    // the main window components are rendered. This includes the weather info, the dog
    // image area where the weather gif is displayed, as well as the comment  about the
    // current weather.

class DogInterface extends Component {
    constructor(props) {
        super(props);
        // The state holds data used to personalise the output, as well as the weather gif;
        this.state = {
            username: this.props.username,
            dogname: this.props.dogname,
            dogbreed: this.props.dogbreed,
            header: "empty",
            message: "empty",
            classfile: null,
            weatherGif: ""
        };
    }

    // Function to check for the weather name in the API data (eg. 'Chance of Rain' will return for the case for rain.)
    checkForWeather(weather){
        if(this.props.weatherInfo.weather.toUpperCase().includes(weather.toUpperCase())) return this.props.weatherInfo.weather;
    }
    // Returns the time int using the formal time string (Eg. 6:00AM returns 6).
    checkTime() {
        let time = this.props.weatherInfo.time.split(":");
        var hours = 0;
        if (time[1].includes("PM") && parseInt(time[0]) === 12) {
            hours = parseInt(time[0]);
        } else if (time[1].includes("AM") && parseInt(time[0]) === 12) {
            hours = parseInt(time[0]) + 12;
        } else if (time[1].includes("PM")) {
            hours = parseInt(time[0]) + 12;
        } else {
            hours = parseInt(time[0]);
        }
        return hours;
    }

    // Sets the specific information which should be rendered for the weather. This includes
    // the weather gif, the day, the message for the user, the weather information details.
    makeWeatherInfo(){
      let weatherInfo = this.props.weatherInfo;
      // This is a transparent image, used as a placeholder for the weather gif.
      var weatherGif="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png";
      let message = "";
      var walkDog = true;
      let windSpeed = weatherInfo.wind;
      let classfile;
      var isDay = null;
      let currentTime= this.checkTime();
      if (currentTime >= 5 && currentTime < 20) {
          isDay = true;
      } else {
          isDay = false;
      }
      // This switch case is used to display the weather gif animation. The weather is run
      // through the switch case so if the weather is present, the correct variables and gif
      // are attatched to the animation when rendered.
      switch(weatherInfo.weather){
          case this.checkForWeather("sun"):
              weatherGif="https://imgur.com/UXQq6Ft.gif";
              message="The sun is out, ";
              //walkDog = true;
              classfile="fixedtopsun";
              break;
          case this.checkForWeather("thunder"):
              weatherGif="https://imgur.com/anbCBfW.gif";
              classfile="notfixedtoprain";
              break;
          case this.checkForWeather("snow"):
              weatherGif="https://imgur.com/Nw3NwPU.gif";
              message="Its snowing, ";
              walkDog = false;
              classfile="notfixedtop";
              break;
          case this.checkForWeather("cloud"):
              weatherGif="https://i.imgur.com/Rpgm1V2.gif";
              message="Its a bit cloudy, ";
              //walkDog = true;
              classfile="fixedtop";
              break;
          case this.checkForWeather("overcast"):
              weatherGif="https://i.imgur.com/pqRqfhu.gif";
              message="Its a bit gloomy, ";
              //walkDog = true;
              classfile="fixedtop";
              break;
          case this.checkForWeather("rain"):
              weatherGif="https://imgur.com/anbCBfW.gif";
              message="Its raining, ";
              walkDog = false;
              classfile="notfixedtop";
              break;
          case this.checkForWeather("fog"):
              weatherGif="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png";
              message="Its a bit foggy, ";
              walkDog = false;
              classfile="notfixedtop";
              break;
          case this.checkForWeather("clear"):
                // If the time of day is daytime the moon should not be shown, if clear.
              if (!isDay) {
                  weatherGif="https://imgur.com/k24jlE3.png";
                  walkDog = false;
                  classfile="fixedtopmoon";
              }else{
                  weatherGif="https://imgur.com/UXQq6Ft.gif";
                  //walkDog= true;
                  classfile="fixedtopsun";
              }
              // The message is concatonated to be passed to the Message component.
              message="Its a clear "+ (isDay? " day" : " night") +", ";
              break;
          default:
              weatherGif="https://i.imgur.com/2P8pMyy.gif";
              walkDog = true;
              classfile="fixedtopsun";
              message="Weather Not found... Default to sun";
              break;
      }
      // Additionally the message for the user requires a check to wind windspeed, this
      // is concatonated onto the message for the user.
      if (windSpeed < 24) {
          message += " there is a gentle breeze.";
          //walkDog = true;
      } else if (windSpeed < 38) {
          message += " there is a strong breeze.";
          //walkDog = true;
      } else if (windSpeed < 48) {
          message += " there is a moderate gale.";
          walkDog = false;
      } else {
          message += " the wind... God help us all.";
          walkDog = false;
      }
      if (currentTime >= 6 && currentTime < 23) {
          //walkDog = true;
      } else {
          walkDog = false;
      }

      // The current temp should also be taken into account. If below a certain temp
      // the user should not walk their dog.
      if(weatherInfo.temp < 0){
          walkDog=false;
      }
      // The user data is returned using this function, which is then passed to the Message component.
      message += " The high is " + this.props.daysimple.tHigh + ". The low is  " + this.props.daysimple.tLow + ".";
      let header = this.getNameAndUser(walkDog);
      return {message: message, classfile: classfile, weatherGif: weatherGif, header: header};
    }

    componentWillMount() {
      this.makeWeatherInfo();
    }

    componentWillUpdate() {
        this.makeWeatherInfo();
    }

    // Returns the 1st message for the user, explicitly stating whether or not they
    // should walk their dog.
    getNameAndUser(walkDog) {
        var noDog;
        var noUser;
        var header;
        var dogname;
        var username;
        var cityName = this.props.weatherInfo.city.split(",")[1];
        if (!this.props.dogname) {
            noDog = true;
        } else {
            noDog = false;
            dogname = this.props.dogname.substring(0,1).toUpperCase() + this.props.dogname.substring(1);
        }
        if (!this.props.username) {
            noUser = true;
        } else {
            noUser = false;
            username = this.props.username.substring(0,1).toUpperCase() + this.props.username.substring(1);
        } if(cityName == " North Korea"){
            header = "It is always a good time to walk "+ (noDog ? "your dog" : dogname ) +" in Glorious Korea!";
        } else {
            header = (noUser ? "It is " : "Hi " + username + ", it's ") + (walkDog ? "" : " not ") + "a good time to walk " + (noDog ? "your dog" : dogname) + " right now.";
        }
        return header;
    }

    // The render will display the main weather information with the Info component.
    // The lower body is also rendered, which contains the animation for the weather
    // at that specific time.
    // The weather comment is also added which contains the message which has been generated
    // in the getUserInformation method.
    render() {
        let info = this.makeWeatherInfo();
        return (
            <div className="di">
                <div className="weatherinfo"><Info weatherInfo={this.props.weatherInfo}/></div>
                <div className="lowerbody">
                    <div className="weatheranimation">
                        <img className={info.classfile} src={info.weatherGif} alt=""/>
                    </div>
                    <div className="weathercontainer">
                        <div className="weathercomment"><Message id="message" header={info.header} message={info.message}/></div>
                    </div>
                </div>
            </div>
        );
    }
}

    export default DogInterface;
