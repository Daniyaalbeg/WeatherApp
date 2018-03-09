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
            header: "empty",
            message: "empty",
            classfile: null,
            weatherGif: "",
            walkDog: true
        };
    }

    // Function to check for the weather name in the API data (eg. 'Chance of Rain' will return for the case for rain.)
    checkForWeather(weather){
        if(this.props.weatherInfo.weather.toUpperCase().includes(weather.toUpperCase())) return this.props.weatherInfo.weather;
    }

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

    makeWeatherInfo(CProps){
      let weatherInfo = CProps.weatherInfo;
      // This is a transparent image, used as a placeholder for the weather gif.
      var weatherGif="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png";
      let message = "";
      var walkDog = this.state.walkDog;
      let windSpeed = weatherInfo.wind;
      let classfile;
      var isDay = null;
      let currentTime= this.checkTime();
      if (currentTime > 6 && currentTime < 20) {
          isDay = true;
      } else {
          isDay = false;
      }
      // This switch case is used to display the weather gif animation. The weather is run
      // through the switch case so if the weather is present, the correct variables and gif
      // are attatched to the animation when rendered.
      switch(weatherInfo.weather){
          case this.checkForWeather("sun"):
              weatherGif="https://i.imgur.com/2P8pMyy.gif";
              message="The sun is out, ";
              walkDog = true;
              classfile="fixedtopsun";
              break;
          case this.checkForWeather("snow"):
              weatherGif="https://i.imgur.com/l8GPSHU.gif";
              message="Its snowing, ";
              walkDog = false;
              classfile="notfixedtop";
              break;
          case this.checkForWeather("cloud"):
              weatherGif="https://i.imgur.com/Rpgm1V2.gif";
              message="Its a bit cloudy, ";
              walkDog = true;
              classfile="fixedtop";
              break;
          case this.checkForWeather("overcast"):
              weatherGif="https://i.imgur.com/pqRqfhu.gif";
              message="Its a bit gloomy, ";
              walkDog = true;
              classfile="fixedtop";
              break;
          case this.checkForWeather("rain"):
              weatherGif="https://i.imgur.com/0VD2YQL.gif";
              message="Its raining, ";
              walkDog = false;
              classfile="notfixedtop";
              break;
          case this.checkForWeather("fog"):
              weatherGif="";
              message="Its a bit foggy, ";
              walkDog = false;
              classfile="notfixedtop";
              break;
          case this.checkForWeather("clear"):
              if (!isDay) {
                  weatherGif="https://imgur.com/k24jlE3.png";
              }
              message="Its a clear "+ (isDay? " day " : " night") +", ";
              classfile="fixedtopmoon";
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
          walkDog = true;
      } else if (windSpeed < 38) {
          message += " there is a strong breeze.";
          walkDog = true;
      } else if (windSpeed < 48) {
          message += " there is a moderate gale.";
          walkDog = false;
      } else {
          message += " the wind... God help us all.";
          walkDog = false;
      }
      message += " The high is " + this.props.daysimple.tHigh + ". The low is  " + this.props.daysimple.tLow + ".";
      let header = this.getNameAndUser(CProps);
      this.setState({message: message, classfile: classfile, weatherGif: weatherGif, header: header});
    }

    componentWillMount() {
      this.makeWeatherInfo(this.props);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.username != this.props.username || nextProps.dogname != this.props.dogname) {
            this.makeWeatherInfo(nextProps);
        }
    }

    getNameAndUser(CProps) {
        var noDog;
        var noUser;
        var header;
        var dogname;
        var username;
        if (CProps.dogname == null) {
            noDog = true;
        } else {
            noDog = false;
            dogname = CProps.dogname.substring(0,1).toUpperCase() + CProps.dogname.substring(1);
        }
        if (CProps.username == null) {
            noUser = true;
        } else {
            noUser = false;
            username = CProps.username.substring(0,1).toUpperCase() + CProps.username.substring(1);
        }
        header = (noUser ? "It is " : username + " it is ") + (this.state.walkDog? "" : " not ") + "a good time to walk "+ (noDog ? "your dog." : dogname+".");
        return header;
    }

    render() {
        return (
            <div className="di">
                <div className="weatherinfo"><Info weatherInfo={this.props.weatherInfo}/></div>
                <div className="lowerbody">
                    <div className="weatheranimation">
                        <img className={this.state.classfile} src={this.state.weatherGif} alt=""/>
                    </div>
                    <div className="weathercontainer">
                        <div className="weathercomment"><Message id="message" header={this.state.header} message={this.state.message}/></div>
                    </div>
                </div>
            </div>
        );
    }
}

    export default DogInterface;
