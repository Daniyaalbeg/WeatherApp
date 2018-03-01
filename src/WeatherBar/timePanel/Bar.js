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
            var currentTime = new Date().getHours();
            var timeToDisplay = currentTime + this.props.time + 1;
            this.timeOD=timeToDisplay;
        }
        else{
            var currentDay = new Date().getDay();
            var dayToDisplay = currentDay + this.props.day;
            if(dayToDisplay>=7) dayToDisplay=dayToDisplay-7;
            this.dayOfWeek(dayToDisplay);
            this.tLow=this.props.tLow;
            this.tHigh=this.props.tHigh;
            this.tAvg=this.props.tHigh;
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
            case "sunny":
                weatherGif="https://media.giphy.com/media/3ov9jLYWb4zCjGfqIE/giphy.gif";
                break;
            case "snow":
                weatherGif="https://media.giphy.com/media/eiMzTkBCN4lGg/giphy.gif";
                break;
            case "cloud":
                weatherGif="https://media.giphy.com/media/xT9IgrpsPQ6MONfO3C/giphy.gif";
                break;
            case "rain":
                weatherGif="https://media.giphy.com/media/K9AnZe1fuZb68/giphy.gif";
                break;
        }

        return (
            <div className="bar">
                <p id="bartime">{this.timeOD}</p>
                <p id="bardate">{this.dayOW}</p>
                <p id="bartemp">{this.props.temp}°C</p>
                <p id="bartemp">{this.props.tHigh}°C</p>
                <p id="bartemp">{this.props.tLow}°C</p>
                <img id="weatheranimation" src={weatherGif}/>
                <div id="barbackground">
                    <img id="bgimage" src="https://cdn.dribbble.com/users/1895433/screenshots/4007015/jarecki-wallpaper-material-moutains-2_1x.png"/>
                </div>
            </div>
            );
        }
    }

    export default Bar;
