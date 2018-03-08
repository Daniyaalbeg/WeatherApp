import React, { Component } from 'react';
import './DogInterface.css';
import Info from './Info/Info.js';
import Message from './Message/Message.js';

    class DogInterface extends Component {
        constructor(props) {
            super(props);
            // console.log(this.props.daysimple);
            // console.log(this.props.weatherInfo);
            this.state = {
                username: this.props.username,
                dogname: this.props.dogname,
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

        componentWillMount() {
            let weatherInfo = this.props.weatherInfo;
            // This is a transparent image, used as a placeholder for the weather gif.
            var weatherGif="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png";
            let message = "";
            var header = "";
            var walkDog = true;
            let windSpeed = weatherInfo.wind;
            let classfile;
            var isDay = null;
            let currentTime = new Date().getHours();
            if (currentTime >= 6 && currentTime < 19) {
                isDay = true;
            } else {
                isDay = false;
            }
            //weatherInfo.weather ="sun";
            // More weathers need to be added into the switch case.
            // Moon Image: https://i.imgur.com/hG7Z9xh.png
            switch(weatherInfo.weather){
                case this.checkForWeather("sun"):
                    weatherGif="https://i.imgur.com/2P8pMyy.gif";
                    message="The sun is out, ";
                    walkDog = true;
                    classfile="fixedtopsun";
                    break;
                case this.checkForWeather("snow"):
                    weatherGif="https://media.giphy.com/media/eiMzTkBCN4lGg/giphy.gif";
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
                    weatherGif="https://media.giphy.com/media/139VhIY2eHewz6/giphy.gif";
                    message="Its a bit gloomy, ";
                    walkDog = true;
                    classfile="fixedtop";
                    break;
                case this.checkForWeather("rain"):
                    weatherGif="https://media.giphy.com/media/K9AnZe1fuZb68/giphy.gif";
                    message="Its raining, ";
                    walkDog = false;
                    classfile="notfixedtop";
                    break;
                case this.checkForWeather("fog"):
                    weatherGif="https://media.tnh.me/551ac5ba5ccacf1b837ebc21/5523d7cd5ccacf4f41a895f3";
                    message="Its a bit foggy, ";
                    walkDog = false;
                    classfile="notfixedtop";
                    break;
                case this.checkForWeather("clear"):
                    if (!isDay) {
                        weatherGif="https://i.imgur.com/hG7Z9xh.png";
                    }
                    message="Its a clear "+ (isDay? " day " : " night ") +", ";
                    classfile="fixedtopmoon";
                    break;
                default:
                    weatherGif="https://i.imgur.com/2P8pMyy.gif";
                    walkDog = true;
                    classfile="fixedtopsun";
                    message="Weather Not found... Default to sun";
                    break;
            }
            if (windSpeed < 24) {
                message += " there is a gentle breeze.";
                walkDog = true;
            } else if (windSpeed < 38) {
                message += " there is a strong breeze.";
                walkDog = true;
            } else if (windSpeed < 38) {
                message += " there is a moderate gale.";
                walkDog = false;
            } else {
                message += " the wind... God help us all.";
                walkDog = false;
            }
            message += " The high is " + this.props.daysimple.tHigh + ". The low is  " + this.props.daysimple.tLow + ".";
            var noDog;
            var noUser;
            if (this.props.dogname == null) {
                noDog = true;
            } else {
                noDog = false;
            }
            if (this.props.username == null) {
                noUser = true;
            } else {
                noUser = false;
            }
            if (walkDog) {
                header = (noUser ? "It is a " : this.props.username + " it is a ") + "good time to walk "+ (noDog ? "your dog." : this.props.dogname+".");
            } else {
                header = (noUser ? "It is a " : this.props.username + " it is a ") + "good time to walk "+ (noDog ? "your dog." : this.props.dogname+".");
            }
            this.setState({message : message, classfile: classfile, weatherGif: weatherGif, header: header});
        }

        render() {
            return (
                <div className="di">
                    <div className="weatherinfo"><Info weatherInfo={this.props.weatherInfo}/></div>
                    <div className="lowerbody">
                        <div className="weatheranimation">
                            <img className={this.state.classfile} src={this.state.weatherGif} alt="Error"/>
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
