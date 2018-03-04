import React, { Component } from 'react';
import './WeatherBar.css';
import Hourly from './timePanel/Hourly/Hourly.js';

class WeatherBar extends Component {

    render() {
        return (
            <div className="wb">
                <Hourly hourly={this.props.hourly}/>
            </div>
        );
    }
}

    export default WeatherBar;
