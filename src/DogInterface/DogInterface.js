import React, { Component } from 'react';
import './DogInterface.css';
import Info from './Info/Info.js';

    class DogInterface extends Component {
        constructor(props) {
            super(props);
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
            weatherInfo.weather="fog";
            // More weathers need to be added into the switch case.
            switch(weatherInfo.weather){
                case this.checkForWeather("sun"):
                    weatherGif="https://media.giphy.com/media/3ov9jLYWb4zCjGfqIE/giphy.gif";
                    break;
                case this.checkForWeather("snow"):
                    weatherGif="https://media.giphy.com/media/eiMzTkBCN4lGg/giphy.gif";
                    break;
                case this.checkForWeather("cloud"):
                    weatherGif="https://media.giphy.com/media/139VhIY2eHewz6/giphy.gif";
                    break;
                case this.checkForWeather("overcast"):
                    weatherGif="https://media.giphy.com/media/139VhIY2eHewz6/giphy.gif";
                    break;
                case this.checkForWeather("rain"):
                    weatherGif="https://media.giphy.com/media/K9AnZe1fuZb68/giphy.gif";
                    break;
                case this.checkForWeather("fog"):
                    weatherGif="https://media.tnh.me/551ac5ba5ccacf1b837ebc21/5523d7cd5ccacf4f41a895f3";
                    break;
            }
            return (
                <div className="di">
                    <Info weatherInfo={weatherInfo}/>
                    <div className="dogarea">
                        <div className="weatheranimation">
                            <img id="weathergif" src={weatherGif}/>
                        </div>
                        <div class="grass"></div>
                    </div>
                    <div className="weathercomment"></div>
                </div>
            );
        }
    }

    export default DogInterface;
