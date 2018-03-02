import React, { Component } from 'react';
import DogInterface from './DogInterface/DogInterface.js';
import WeatherBar from './WeatherBar/WeatherBar.js';
import {UpdateHourly, UpdateDay} from './WeatherAPI.js';


class WeatherData extends Component {
    constructor() {
        super();
        this.state = {
            today: [],
            hourly: [],
            fiveDay: []
        };
    }

    callBack(data){
        this.setState(data);
    }

    componentDidMount(){
        UpdateDay(this.callBack.bind(this));
        UpdateHourly(this.callBack.bind(this));

    }

    child(percentage){
        return(
            <div style={{position: "absolute", top: 10, left: 10, backgroundColor: "white"}}>
            {percentage}% scroll
            </div>
        )
    }

    render(){
        //console.log(this.state.today);
        //console.log(this.state.hourly);
      //  console.log(this.state.fiveday);

        var element = document.getElementById("data");
        if(element){
            var percentage = Math.round(Math.max(0,Math.min(1,-element.getBoundingClientRect().top/(element.clientHeight/2)))*100);
            // console.log(Math.round(percentage));
        }

        return (
            <div style={{height: "200vh"}} id="data">
            <div style={{position: "sticky", top: 0, bottom: 0}}>
            {this.child(percentage)}
            <div className="doginterface" >
            <DogInterface weatherInfo={this.state.today} />
            </div>
            <div className="weatherbar">
            <WeatherBar fiveHourInfo={this.state.hourly} fiveDayInfo={this.state.fiveday} />
            </div>
            </div>
            </div>
        );
    }

}
export default WeatherData;
