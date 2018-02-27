import React, { Component } from 'react';
import './FiveDay.css';
import Bar from '../Bar.js';

class FiveDay extends Component {


    render() {

        var rows = [];
        for (var i = 0; i < 5; i++){
            rows.push(<Bar className="bar" key={i}/>);
        }

        return (
            <div class="fvdy">
                {rows}
            </div>
            );
        }
    }

    export default FiveDay;
