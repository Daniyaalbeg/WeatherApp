import React, { Component } from 'react';
import './Bar.css';
// Needs cleaning
class Bar extends Component {
    constructor(props){
        super(props);
        this.timeOD = null;
        this.dayOW = null;
        this.weather = null;
        this.lTemp = null;
        this.mTemp = null;

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

        var weatherGif;

        // More weathers need to be added into the switch case.
        switch(this.props.weather){
            case "sunny":
                weatherGif="https://image.freepik.com/free-photo/nature-design-with-bokeh-effect_1048-1882.jpg";
                break;
            case "snow":
                weatherGif="https://image.freepik.com/free-photo/nature-design-with-bokeh-effect_1048-1882.jpg";
                break;
            case "cloud":
                weatherGif="https://image.freepik.com/free-photo/nature-design-with-bokeh-effect_1048-1882.jpg";
                break;
        }

        return (
            <div className="bar">
                <p id="bartime">{this.timeOD}</p>
                <p id="bardate">{this.dayOW}</p>
                <p id="bartemp">{this.props.temp}°C</p>
                <img id="weatheranimation" src={weatherGif} alt="Missing"/>
                <img id="barbackground" src=""/>
            </div>
            );
        }
    }

    export default Bar;
