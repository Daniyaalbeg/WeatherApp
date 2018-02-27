import React, { Component } from 'react';
import './FiveHour.css';
import Bar from '../Bar.js';

class FiveHour extends Component {


    render() {

        var rows = [];
        for (var i = 0; i < 5; i++){
            rows.push(<Bar class="bar" cata="Time" key={i}/>);
        }

        return (
            <div class="fvhr">
                {rows}
            </div>
            );
        }
    }

    export default FiveHour;
