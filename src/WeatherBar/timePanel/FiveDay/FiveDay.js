import React, { Component } from 'react';
import './FiveDay.css';
import Bar from '../Bar.js';

class FiveDay extends Component {

    render() {
        console.log(this.props.Big);
        let fiveDayInfo = this.props.fiveDayInfo;
        let rows = fiveDayInfo.map((weatherObj) => {
            return <Bar day={weatherObj.day} weather={weatherObj.weather} tHigh={weatherObj.tHigh} tLow={weatherObj.tLow}/>;
        });

        return (
            <div class="fvdy">
                {rows}
            </div>
            );
        }
    }

    export default FiveDay;
