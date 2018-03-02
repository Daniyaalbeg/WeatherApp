import React, { Component } from 'react';
import './FiveDay.css';
import Bar from '../Bar.js';

class FiveDay extends Component {
  constructor(props){
      super(props);
    }

    render() {
        let fiveDayInfo = this.props.fiveDayInfo;

        if (fiveDayInfo == null) {
          return (null);
        }

        let rows = fiveDayInfo.map((weatherObj) => {
            return <Bar day={weatherObj.day} weather={weatherObj.weather} tHigh={weatherObj.tHigh} tLow={weatherObj.tLow}/>;
        });

        return (
            <div className="fvdy">
                {rows}
            </div>
            );
        }
    }

    export default FiveDay;
