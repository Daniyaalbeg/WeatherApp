import React, { Component } from 'react';
import './Info.css';

    class Info extends Component {
        constructor(props) {
            super(props);
        }

        render() {

            let weatherInfo = this.props.weatherInfo;

            return (
                <div class="info">
                    <p id="city">{weatherInfo.city}</p>
                    <p id="temp">{weatherInfo.temp}°C</p>
                    <p id="wind">{weatherInfo.wind} mph</p>
                    <p id="pol">Pollen: {weatherInfo.pol}</p>
                </div>
            );
        }
    }

    export default Info;
