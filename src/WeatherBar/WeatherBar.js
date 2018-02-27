import React, { Component } from 'react';
import './WeatherBar.css';
import Bar from './timePanel/Bar.js';

class WeatherBar extends Component {
    render() {
        return (
            <div className="wb">
                <Bar/>
                <Bar/>
                <Bar/>
                <Bar/>
                <Bar/>
            </div>
            );
        }
    }

    export default WeatherBar;
