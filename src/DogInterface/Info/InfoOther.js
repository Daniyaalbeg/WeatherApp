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
            var dateString = date.getDate() + " / " + date.getMonth();
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
