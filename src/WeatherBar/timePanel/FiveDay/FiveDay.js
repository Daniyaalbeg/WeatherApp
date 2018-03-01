import React, { Component } from 'react';
import './FiveDay.css';
import Bar from '../Bar.js';

class FiveDay extends Component {
  constructor(props){
      super(props);
    }

    render() {
        let fiveDayInfo = this.props.fiveDayInfo;
        let Buggy = this.props.Bigg;
        if (Buggy == null) {
          return (null);
        }
        console.log(Buggy);

        let rows = Buggy.map((weatherObj) => {
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
