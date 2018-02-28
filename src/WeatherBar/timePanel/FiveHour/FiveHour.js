import React, { Component } from 'react';
import './FiveHour.css';
import Bar from '../Bar.js';

class FiveHour extends Component {

    render() {

        let fiveHourInfo = this.props.fiveHourInfo;

        let rows = fiveHourInfo.map((weatherObj) => {
            return <Bar time={weatherObj.time} weather={weatherObj.weather} temp={weatherObj.temp}/>;
        });

        return (
            <div class="fvhr">
                {rows}
            </div>
            );
        }
    }

    export default FiveHour;
