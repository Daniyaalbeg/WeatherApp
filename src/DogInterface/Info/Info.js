import React, { Component } from 'react';
import './Info.css';


    // The info component contains the main weather for the day:
    // The location, the temperature, the wind speed and the pollen count.
    class Info extends Component {
        constructor(props) {
            super(props);
        }

        // The weather information is passed in a prop which is used to render the data.
        render() {
            let weatherInfo = this.props.weatherInfo;

            return (
                <div className="info">
                    <p id="city">{weatherInfo.city}</p>
                    <p id="temp">{weatherInfo.temp}°C</p>
                    <p id="wind">{weatherInfo.wind} mph</p>
                    <p id="pol">Pollen: {weatherInfo.pol}</p>
                </div>
            );
        }
    }

    export default Info;
