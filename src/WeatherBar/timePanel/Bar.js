import React, { Component } from 'react';
import './Bar.css';

class Bar extends Component {
    render() {

        return (
            <div className="bar">
                <p id="bartime">{this.props.time}</p>
                <p id="barweather">{this.props.weather}</p>
                <p id="bartemp">{this.props.temp}</p>
                <img id="imgtest" src="https://image.freepik.com/free-photo/nature-design-with-bokeh-effect_1048-1882.jpg" alt="Missing"/>
            </div>
            );
        }
    }

    export default Bar;
