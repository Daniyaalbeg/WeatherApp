import React, { Component } from 'react';
import './WeatherBar.css';
import FiveDay from './timePanel/FiveDay/FiveDay.js';
import FiveHour from './timePanel/FiveHour/FiveHour.js';

class WeatherBar extends Component {

    render() {
        return (
            <div className="wb">
                <FiveHour/>
                <FiveDay/>
            </div>
            );
        }
    }

    export default WeatherBar;
