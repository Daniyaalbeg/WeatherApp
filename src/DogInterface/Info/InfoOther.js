import React, { Component } from 'react';
import './Info.css';

    // This info component is for the vertical slide views for future days
    class Info extends Component {
        constructor(props) {
            super(props);
        }

        // The weather information is passed in a prop which is used to render the data.
        render() {
            let weatherInfo = this.props.weatherInfo;
            var date = new Date(0);
            date.setUTCSeconds(weatherInfo.epoch);
            let weekday = date.toLocaleDateString("en-GB",{weekday:'long'});
            let day = date.getDate().toString();
            let digit = day.slice(-1);
            let dayString = day;
            if(day.length == 2 && day.slice(0,1) != "1"){
                if(digit == 1){
                    dayString += "st";
                }else if(digit == 2){
                    dayString += "nd";
                }else if(digit == 3){
                    dayString += "rd";
                }else{
                    dayString += "th";
                }
            }else{
                dayString += "th";
            }
            let month = date.toLocaleDateString("en-GB",{month:'long'});
            var dateString = weekday + ", " + dayString + " " + month;
            return (
                <div className="info other">
                    <p id="time">{dateString}</p>
                    <p id="city">{weatherInfo.city}</p>
                    <p id="temp"><span style={{fontSize: "0.8em", verticalAlign: "top"}}>▲</span> {weatherInfo.tHigh}°C</p>
                    <p id="temp"><span style={{fontSize: "0.8em", verticalAlign: "top"}}>▼</span> {weatherInfo.tLow}°C</p>
                </div>
            );
        }
    }

    export default Info;
