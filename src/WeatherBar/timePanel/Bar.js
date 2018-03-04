import React, { Component } from 'react';
import './Bar.css';
// Needs cleaning
class Bar extends Component {
    constructor(props){
        super(props);
        // If the time is not null, the bar component should be the 5 hour forecast, else, 5 day forecast.
        if(this.props.time != null){
            this.temp=this.props.temp+"°C";
        }
        else{
            var currentDay = new Date().getDay();
            var dayToDisplay = currentDay + this.props.day;
            if(dayToDisplay>=7) dayToDisplay=dayToDisplay-7;
            this.dayOfWeek(dayToDisplay);
            this.tLow=this.props.tLow + "°C";
            this.tHigh=this.props.tHigh + "°C";
        }
    }

    dayOfWeek(day){
        switch(day){
            case 0:
                this.dayOW="Mon";
                return;
            case 1:
                this.dayOW="Tue";
                return;
            case 2:
                this.dayOW="Wed";
                return;
            case 3:
                this.dayOW="Thurs";
                return;
            case 4:
                this.dayOW="Fri";
                return;
            case 5:
                this.dayOW="Sat";
                return;
            case 6:
                this.dayOW="Sun";
                return;
        }
    }

    // Function to check for the weather name in the API data (eg. 'Chance of Rain' will return for the case for rain.)
    checkForWeather(weather){
        if(this.props.weather.toUpperCase().includes(weather.toUpperCase())) return this.props.weather;
    }

    render() {
        // This is a transparent image, used as a placeholder for the weather gif.
        var weatherGif="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png";
        // More weathers need to be added into the switch case.
        switch(this.props.weather){
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
        const time = this.props.time.split(":");
        var hours = 0;
        if (time[1].includes("PM")) {
            hours = parseInt(time[0]) + 12;
        } else if (time[1].includes("AM") && time[0] == 12) {
            hours = parseInt(time[0]) + 12;
        } else {
            hours = parseInt(time[0]);
        }
        console.log(hours);
        var imgURL = null;
        if (hours>5 && hours<19) {
            imgURL = "https://i.imgur.com/doBAMm7.png";
        } else {
            imgURL = "https://i.imgur.com/yR14rdR.png";
        }
        let divStyle = {
            backgroundImage: 'url('+imgURL+')'
        };
        return (
            <div className="bar" style={divStyle}>
                <div className="bartime">
                    <p>{this.props.time}</p>
                </div>
                <div className="barweathergif">
                     <img id="barweatheranimation" src={weatherGif}/>
                </div>
                <div className="bartemp">
                    <p>{this.temp}</p>
                </div>
            </div>
        );
    }
}

    export default Bar;
