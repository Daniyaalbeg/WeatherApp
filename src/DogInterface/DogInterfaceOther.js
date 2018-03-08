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
            console.log({m: "checking weather", info: this.props.weatherInfo});
            if(this.props.daysimple.weather.toUpperCase().includes(weather.toUpperCase())) return this.props.daysimple.weather;
        }

        componentWillMount() {
            let weatherInfo = this.props.daysimple;
            // This is a transparent image, used as a placeholder for the weather gif.
            var weatherGif="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png";
            let classfile;
            var isDay = null;
            let currentTime = new Date().getHours();
            if (currentTime >= 6 && currentTime < 20) {
                isDay = true;
            } else {
                isDay = false;
            }
            // Moon Image: https://i.imgur.com/hG7Z9xh.png

            // This switch case is used to display the weather gif animation. The weather is run
            // through the switch case so if the weather is present, the correct variables and gif
            // are attatched to the animation when rendered.
            switch(weatherInfo.weather){
                case this.checkForWeather("sun"):
                    weatherGif="https://i.imgur.com/2P8pMyy.gif";
                    classfile="fixedtopsun";
                    break;
                case this.checkForWeather("snow"):
                    weatherGif="https://media.giphy.com/media/eiMzTkBCN4lGg/giphy.gif";
                    classfile="notfixedtop";
                    break;
                case this.checkForWeather("cloud"):
                    weatherGif="https://i.imgur.com/Rpgm1V2.gif";
                    classfile="fixedtop";
                    break;
                case this.checkForWeather("overcast"):
                    weatherGif="https://media.giphy.com/media/139VhIY2eHewz6/giphy.gif";
                    classfile="fixedtop";
                    break;
                case this.checkForWeather("rain"):
                    weatherGif="https://media.giphy.com/media/K9AnZe1fuZb68/giphy.gif";
                    classfile="notfixedtop";
                    break;
                case this.checkForWeather("fog"):
                    weatherGif="https://media.tnh.me/551ac5ba5ccacf1b837ebc21/5523d7cd5ccacf4f41a895f3";
                    classfile="notfixedtop";
                    break;
                case this.checkForWeather("clear"):
                    if (!isDay) {
                        weatherGif="https://imgur.com/k24jlE3.png";
                    }
                    classfile="fixedtopmoon";
                    break;
                default:
                    weatherGif="https://i.imgur.com/2P8pMyy.gif";
                    classfile="fixedtopsun";
                    break;
            }
            let header = this.getNameAndUser();
            this.setState({classfile: classfile, weatherGif: weatherGif, header: header});
        }

        componentWillUpdate(nextProps, prevState) {
            console.log("--------------------------------");
            console.log(nextProps.username);
            console.log(this.props.username);
            if (nextProps.username != this.props.username || nextProps.dogname != this.props.dogname) {
                this.setState({header: this.getNameAndUser()});
                console.log("UPDATING!");
                //this.state.header = this.getNameAndUser();
            }
        }

        //Method to generate custom message to take your dog out or not
        getNameAndUser() {
            var noDog;
            var noUser;
            var header;
            var dogname;
            var username;
            if (this.props.dogname == null) {
                noDog = true;
            } else {
                noDog = false;
                dogname = this.props.dogname.substring(0,1).toUpperCase() + this.props.dogname.substring(1);
            }
            if (this.props.username == null) {
                noUser = true;
            } else {
                noUser = false;
                username = this.props.username.substring(0,1).toUpperCase() + this.props.username.substring(1);
            }
            header = (noUser ? "It is " : username + " it is ") + (this.state.walkDog? "" : " not ") + "a good time to walk "+ (noDog ? "your dog." : dogname+".");
            return header;
        }

        render() {
            console.log(this.props.daysimple);
            return (
                <div className="di">
                    <div className="weatherinfo"><Info weatherInfo={this.props.daysimple}/></div>
                    <div className="lowerbody">
                        <div className="weatheranimation">
                            <img className={this.state.classfile} src={this.state.weatherGif} alt="Error"/>
                        </div>
                    </div>
                </div>
            );
        }
    }

    export default DogInterfaceOther;
