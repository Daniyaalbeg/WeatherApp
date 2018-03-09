import React, { Component } from 'react';
import './DogInterface.css';
import Info from './Info/InfoOther.js';
import Message from './Message/Message.js';

    // This dog interface is used to show weather for future days via a vertical swipe.

    class DogInterfaceOther extends Component {
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
            if(this.props.daysimple.weather.toUpperCase().includes(weather.toUpperCase())) return this.props.daysimple.weather;
        }

        makeWeatherInfo() {
            let weatherInfo = this.props.daysimple;
            // This is a transparent image, used as a placeholder for the weather gif.
            var weatherGif="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png";
            let classfile;
            var isDay=true;
            // Moon Image: https://i.imgur.com/hG7Z9xh.png

            // This switch case is used to display the weather gif animation. The weather is run
            // through the switch case so if the weather is present, the correct variables and gif
            // are attatched to the animation when rendered.
            switch(weatherInfo.weather){
                case this.checkForWeather("sun"):
                    weatherGif="https://imgur.com/UXQq6Ft.gif";
                    classfile="fixedtopsun";
                    break;
                case this.checkForWeather("thunder"):
                    weatherGif="https://imgur.com/anbCBfW.gif";
                    classfile="notfixedtoprain";
                    break;
                case this.checkForWeather("snow"):
                    weatherGif="https://imgur.com/Nw3NwPU.gif";
                    classfile="notfixedtop";
                    break;
                case this.checkForWeather("cloud"):
                    weatherGif="https://i.imgur.com/Rpgm1V2.gif";
                    classfile="fixedtop";
                    break;
                case this.checkForWeather("overcast"):
                    weatherGif="https://i.imgur.com/pqRqfhu.gif";
                    classfile="fixedtopsun";
                    break;
                case this.checkForWeather("rain"):
                    weatherGif="https://imgur.com/anbCBfW.gif";
                    classfile="notfixedtoprain";
                    break;
                case this.checkForWeather("fog"):
                    weatherGif="https://media.tnh.me/551ac5ba5ccacf1b837ebc21/5523d7cd5ccacf4f41a895f3";
                    classfile="notfixedtop";
                    break;
                case this.checkForWeather("clear"):
                    if (!isDay) {
                        weatherGif="https://imgur.com/k24jlE3.png";
                        classfile="fixedtopmoon";
                    }else{
                        weatherGif="https://imgur.com/UXQq6Ft.gif";
                        classfile="fixedtopsun";
                    }
                    break;
                default:
                    weatherGif="https://imgur.com/UXQq6Ft.gif";
                    classfile="fixedtopsun";
                    break;
            }
            return {classfile: classfile, weatherGif: weatherGif};
        }

        componentWillMount() {
            this.makeWeatherInfo()
        }

        componentWillUpdate() {
            this.makeWeatherInfo();
        }

        render() {
            let info = this.makeWeatherInfo();
            return (
                <div className="di">
                    <div className="weatherinfo"><Info weatherInfo={this.props.daysimple}/></div>
                    <div className="lowerbody">
                        <div className="weatheranimation">
                            <img className={info.classfile} src={info.weatherGif} alt="Error"/>
                        </div>
                    </div>
                </div>
            );
        }
    }

    export default DogInterfaceOther;
