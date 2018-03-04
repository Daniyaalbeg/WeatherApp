import React, { Component } from 'react';
import './Hourly.css';
import Bar from '../Bar.js';

class Hourly extends Component {

    render() {

        let hourly = this.props.hourly;


        if (hourly == null) {
          return (null);
        }

        let rows = hourly.map((weatherObj) => {
            return <Bar time={weatherObj.time} weather={weatherObj.weather} temp={weatherObj.temp}/>;
        });



        return (
            <div className="hrly">
                {rows}
            </div>
            );
        }
    }

    export default Hourly;
