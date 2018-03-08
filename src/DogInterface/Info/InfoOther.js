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
            //console.log(weatherInfo);

            return (
                <div className="info">
                    <p id="city">{weatherInfo.city}</p>
                    <p id="temp"><span style={{fontSize: "0.8em", verticalAlign: "top"}}>▲</span> {weatherInfo.tHigh}°C</p>
                    <p id="temp"><span style={{fontSize: "0.8em", verticalAlign: "top"}}>▼</span> {weatherInfo.tLow}°C</p>
                </div>
            );
        }
    }

    export default Info;
