import React, { Component } from 'react';
import './Hourly.css';
import Bar from '../Bar.js';

// Hourly renders the weather bar, by looping throught the object of data
// that is passed to it and adding a new component to the array which is rendered,
// for each hourly forecast in the object.
class Hourly extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      console.log(this.props.hourly);
        // Data that is padded in.
        let hourly = this.props.hourly;
        // If no data is passed, nothing can be looped through.
        if (hourly == null) {
          return (null);
        }
        // Each bar represents the data for another hourly forecast; all are added
        // to the variable 'rows'.
        let rows = hourly.map((weatherObj, index) => {
            return <Bar key={index} time={weatherObj.time} weather={weatherObj.weather} temp={weatherObj.temp}/>;
        });



        return (
            <div className="hrly">
                {rows}
            </div>
            );
        }
    }

    export default Hourly;
