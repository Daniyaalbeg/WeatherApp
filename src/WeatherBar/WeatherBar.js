import React, { Component } from 'react';
import './WeatherBar.css';
import FiveDay from './timePanel/FiveDay/FiveDay.js';
import FiveHour from './timePanel/FiveHour/FiveHour.js';

class WeatherBar extends Component {

    render() {

        let fiveHourInfo = this.props.fiveHourInfo;

        return (
            <div className="wb">
                <FiveHour fiveHourInfo={fiveHourInfo}/>
                <FiveDay/>
            </div>
            );
        }
    }

    export default WeatherBar;
