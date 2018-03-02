import React, { Component } from 'react';
import DogInterface from './DogInterface/DogInterface.js';
import WeatherBar from './WeatherBar/WeatherBar.js';
import {getWeatherData} from './WeatherAPI.js';


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
        console.log("works");
        console.log(data);
    }

    UpdateHourly(){
        fetch('http://api.wunderground.com/api/d36721c0718840e5/hourly/q/UK/Northwood.json')
        .then(results => {
            return results.json();
        }).then( data => {
            this.props.hourly;
            let weatherdata = data.hourly_forecast.map(function(item){
                return(
                    {time: item.FCTTIME.civil,
                        weather: item.condition,
                        temp: parseInt(item.temp.metric),
                        wind: parseInt(item.wspd.metric)
                    }
                )
            })
            let today = weatherdata[0];
            today.city = 'Northwood';
            today.pol = 'High';
            this.setState({today : today, hourly : weatherdata.splice(0, 5)});
        });
    }

    Update5Day(){
        fetch('http://api.wunderground.com/api/d36721c0718840e5/forecast10day/q/UK/Northwood.json')
        .then(forecast => {
            return forecast.json();
        }).then( data => {
            this.props.weatherdata;
            let weatherdata = data.forecast.simpleforecast.forecastday.map(function(item, i){
                return(
                    {day: i,
                        weather: item.conditions,
                        tHigh: parseInt(item.high.celsius),
                        tLow: parseInt(item.low.celsius)
                    }
                )
            })
            this.setState({fiveday : weatherdata.splice(0, 5)});
        });
    }

    componentDidMount(){
        this.Update5Day();
        this.UpdateHourly();

    }

    child(percentage){
        return(
            <div style={{position: "absolute", top: 10, left: 10, backgroundColor: "white"}}>
            {percentage}% scroll
            </div>
        )
    }

    render(){
        getWeatherData(this.callBack.bind(this));
        console.log(this.state.today);
        console.log(this.state.hourly);
        console.log(this.state.fiveday);

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
