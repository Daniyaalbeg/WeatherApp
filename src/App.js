import React, { Component } from 'react';
import WeatherData from './WeatherData.js'
import Settings from './Settings/Settings.js'
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.changeBackground(props);
    }

    changeBackground(props){
        var currentTime = new Date().getHours();
        if(currentTime >= 5 && currentTime < 11) document.body.classList.add('bgdawn');
        else if(currentTime >= 11 && currentTime < 17) document.body.classList.add('bgnoon');
        else if(currentTime >= 17 && currentTime < 20) document.body.classList.add('bgevening');
        else document.body.classList.add('bgnight');
    }

    child(percentage){
        return(
            <div style={{position: "absolute", top: 10, left: 10}}>
                {percentage}
            </div>
        )
    }

    render() {

        // Some data that will update the GUI, right now just for testing.
        // WeaterInfo corrosponds to the top-center weather display.
        // FiveHour and fiveday info corrosponds to the weather bar at the bottom.
        let weatherInfo = {city: "London", temp: 18, wind: 100, pol: "High", weather: "sun"};
        let fiveHourInfo = [
            {time: 0, weather: "rain", temp: 10},
            {time: 1, weather: "snow", temp: 4},
            {time: 2, weather: "rain", temp: -3},
            {time: 3, weather: "sun", temp: 5},
            {time: 4, weather: "snow", temp: 3}
        ];
        let fiveDayInfo = [
            {day: 0, weather: "snow", tHigh: 10, tAvg:10, tLow:9},
            {day: 1, weather: "snow", tHigh: 5, tAvg:4, tLow:3},
            {day: 2, weather: "sun", tHigh: 3, tAvg:-3, tLow:-4},
            {day: 3, weather: "rain", tHigh: 6, tAvg:5, tLow:1},
            {day: 4, weather: "sun", tHigh: 9, tAvg:3, tLow:-1}
        ];

        var element = document.getElementById("test2");
        if(element){
            var element = document.getElementById("test");
            if(element)
            var percentage = Math.round(Math.max(0,Math.min(1,-element.getBoundingClientRect().top/(element.clientHeight/2)))*100);
            // console.log(Math.round(percentage));
        }

        return (
            <div className="App">
            <WeatherData/>
                <div className="settings">
                    <Settings/>
                </div>
            </div>
            );
        }
    }

    export default App;
