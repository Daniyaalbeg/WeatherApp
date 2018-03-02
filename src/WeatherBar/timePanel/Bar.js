import React, { Component } from 'react';
import './Bar.css';
// Needs cleaning
class Bar extends Component {
    constructor(props){
        super(props);
        this.timeOD = null;
        this.dayOW = null;
        this.weather = null;
        this.tLow = null;
        this.tHigh = null;

        if(this.props.time != null){
            //var currentTime = new Date().getHours();
            //var timeToDisplay = currentTime + this.props.time + 1;
            //this.timeOD=timeToDisplay + ":00";
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

    render() {

        var weatherGif="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png";

        // More weathers need to be added into the switch case.
        switch(this.props.weather){
            case "sun":
                weatherGif="https://media.giphy.com/media/3ov9jLYWb4zCjGfqIE/giphy.gif";
                break;
            case "Snow":
                weatherGif="https://media.giphy.com/media/eiMzTkBCN4lGg/giphy.gif";
                break;
            case "Cloud":
                weatherGif="https://media.giphy.com/media/xT9IgrpsPQ6MONfO3C/giphy.gif";
                break;
            case "Rain":
                weatherGif="https://media.giphy.com/media/K9AnZe1fuZb68/giphy.gif";
                break;
        }
        return (
            <div className="bar">
                <p id="bartime">{this.props.time}</p>
                <p id="bardate">{this.dayOW}</p>
                <p id="bartHigh">{this.tHigh}</p>
                <p id="bartAvg">{this.temp}</p>
                <p id="bartLow">{this.tLow}</p>
                <img id="weatheranimation" src={weatherGif}/>
            </div>
            );
        }
    }

    export default Bar;
