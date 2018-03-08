import React, { Component } from 'react';
import './Bar.css';

// The bar is one of the components in the horizonal weather bar, which shows hourly
// information. It shows the time, the temperature and an animation of the weathers
// at the corrent point in the data.
class Bar extends Component {
    constructor(props){
        super(props);
    }

    // Function to check for the weather name in the API data (eg. 'Chance of Rain' will return for the case for rain.)
    checkForWeather(weather){
        if(this.props.weather.toUpperCase().includes(weather.toUpperCase())) return this.props.weather;
    }
    //Function to check if time is AM or PM
    checkTime() {
        const time = this.props.time.split(":");
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

    render() {
        // This is a transparent image, used as a placeholder for the weather gif.
        var weatherGif="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png";
        var classfile=null;
        var isDay = null;
        let frameTime = this.checkTime();
        if (frameTime >= 6 && frameTime < 20) {
            isDay = true;
        } else {
            isDay = false;
        }

        // Switches through the weathers to assign the correct animation to the correct weather.
        switch(this.props.weather){
            case this.checkForWeather("clear"):
                if (!isDay) {
                    weatherGif="https://imgur.com/k24jlE3.png";
                    classfile="fixedmoon";
                }
                break;
            case this.checkForWeather("sun"):
                weatherGif="https://i.imgur.com/2P8pMyy.gif";
                classfile="fixedsun";
                break;
            case this.checkForWeather("snow"):
                weatherGif="https://imgur.com/Nw3NwPU.gif";
                classfile="notfixed";
                break;
            case this.checkForWeather("cloud"):
                weatherGif="https://i.imgur.com/Rpgm1V2.gif";
                classfile="fixed cloud";
                break;
            case this.checkForWeather("overcast"):
                weatherGif="https://i.imgur.com/Tnp4BBN.gif";
                classfile="fixed overcast";
                break;
            case this.checkForWeather("rain"):
                weatherGif="https://i.imgur.com/0VD2YQL.gif";
                classfile="notfixed";
                break;
            case this.checkForWeather("fog"):
                weatherGif="";
                classfile="notfixed";
                break;
            default:
                weatherGif="";
        }

        // Depending on the time of day a different background image is displayed.
        var hours = this.checkTime();
        var imgURL = null;
        if (hours === 19 || hours === 18 || hours === 6 || hours === 7) {
            //Sunset
            imgURL = "https://imgur.com/3lKtYUC.png";
        } else if (hours >= 6 && hours < 20) {
            //Day
            imgURL = "https://imgur.com/9KgUH67.png";
        } else {
            //Night
            imgURL = "https://imgur.com/7xjHY9D.png";
        }
        let divStyle = {
            backgroundImage: 'url('+imgURL+')',
            backgroundPosition: (-this.props.pos*20)+'vw'
        };
        return (
            <div className="bar" style={divStyle}>
                <div className="barweathergif">
                    <img className={classfile} src={weatherGif}/>
                </div>
                <div className="bartime">
                    <p>{this.props.time}</p>
                </div>
                <div className="bartemp">
                    <p>{this.props.temp +"°C"}</p>
                </div>
            </div>
        );
    }
}

    export default Bar;
