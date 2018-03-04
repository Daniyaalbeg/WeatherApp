import React, { Component } from 'react';
import './DogInterface.css';
import Info from './Info/Info.js';
import Message from './Message/Message.js';

    class DogInterface extends Component {
        constructor(props) {
            super(props);
            console.log(this.props.daysimple);
            console.log(this.props.weatherInfo);
        }

        // Function to check for the weather name in the API data (eg. 'Chance of Rain' will return for the case for rain.)
        checkForWeather(weather){
            if(this.props.weatherInfo.weather.toUpperCase().includes(weather.toUpperCase())) return this.props.weatherInfo.weather;
        }

        render() {
            let weatherInfo = this.props.weatherInfo;
            // This is a transparent image, used as a placeholder for the weather gif.
            var weatherGif="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png";
            let message = "";
            let windSpeed = weatherInfo.wind;
            // More weathers need to be added into the switch case.
            switch(weatherInfo.weather){
                case this.checkForWeather("sun"):
                    weatherGif="https://media.giphy.com/media/3ov9jLYWb4zCjGfqIE/giphy.gif";
                    message="The sun is out, now is a great time to walk your dog.";
                    break;
                case this.checkForWeather("snow"):
                    weatherGif="https://media.giphy.com/media/eiMzTkBCN4lGg/giphy.gif";
                    message="Its snowing, perhaps wait a few hours.";
                    break;
                case this.checkForWeather("cloud"):
                    weatherGif="https://media.giphy.com/media/139VhIY2eHewz6/giphy.gif";
                    message="Its a bit cloudy, now is an ok time to walk your dog.";
                    break;
                case this.checkForWeather("overcast"):
                    weatherGif="https://media.giphy.com/media/139VhIY2eHewz6/giphy.gif";
                    message="Its a bit gloomy, now is an ok time to walk your dog.";
                    break;
                case this.checkForWeather("rain"):
                    weatherGif="https://media.giphy.com/media/K9AnZe1fuZb68/giphy.gif";
                    message="Its raining, perhaps wait a few hours.";
                    break;
                case this.checkForWeather("fog"):
                    weatherGif="https://media.tnh.me/551ac5ba5ccacf1b837ebc21/5523d7cd5ccacf4f41a895f3";
                    message="Its a bit foggy, now may not be the best time.";
                    break;
                default:
                    message="Well shit...";
                    break;
            }
            if (windSpeed < 24) {
                message += " There is a gentle breeze.";
            } else if (windSpeed < 38) {
                message += " There is a strong breeze.";
            } else if (windSpeed < 38) {
                message += " There is a moderate gale.";
            } else {
                message += " The wind... God help us all.";
            }
            message += " The high today is " + this.props.daysimple.tHigh;
            return (
                <div className="di">
                    <Info weatherInfo={weatherInfo}/>
                    <div className="dogarea">
                        <div className="weatheranimation">
                            <img id="weathergif" src={weatherGif} alt="Error"/>
                        </div>
                        <div className="weatherComment"> <Message id="message" message={message}/> </div>
                    </div>
                     <div className="weathercomment"></div>
                </div>
            );
        }
    }

    export default DogInterface;
