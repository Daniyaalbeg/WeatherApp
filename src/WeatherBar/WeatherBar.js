import React, { Component } from 'react';
import './WeatherBar.css';
import Hourly from './timePanel/Hourly/Hourly.js';
import HorizontalSnapper from '../lib/HorizontalSnapper.js';

// Weather bar is the horizontal bar at the bottom of the main window.
class WeatherBar extends Component {

    componentDidMount(){
        let elem = document.getElementById("weatherBar"+this.props.id);
        if(elem){
            this.snapper = new HorizontalSnapper(elem, 0.2, 20);
        }
    }

    render() {
        let id = "weatherBar" + this.props.id;
        return (
            <div className="wb" id={id}>
                <Hourly hourly={this.props.hourly}/>
            </div>
        );
    }
}

    export default WeatherBar;
