import React, { Component } from 'react';
import DogInterface from './DogInterface/DogInterface.js'
import WeatherBar from './WeatherBar/WeatherBar.js'
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

    render() {

        // Some data that will update the GUI, right now just for testing.
        // WeaterInfo corrosponds to the top-center weather display.
        // FiveHour and fiveday info corrosponds to the weather bar at the bottom.
        let weatherInfo = {city: "London", temp: 18, wind: 100, pol: "High", weather: "sun"};
        let fiveHourInfo = [
            {time: 0, weather: "sunny", temp: 0},
            {time: 1, weather: "sunny", temp: 0},
            {time: 2, weather: "cloud", temp: 0},
            {time: 3, weather: "snow", temp: 0},
            {time: 4, weather: "snow", temp: 0}
        ];
        let fiveDayInfo = [
            {day: 0, weather: "sunny", tHigh: 0, tAvg:0, tLow:0},
            {day: 1, weather: "sunny", tHigh: 0, tAvg:0, tLow:0},
            {day: 2, weather: "sunny", tHigh: 0, tAvg:0, tLow:0},
            {day: 3, weather: "sunny", tHigh: 0, tAvg:0, tLow:0},
            {day: 4, weather: "sunny", tHigh: 0, tAvg:0, tLow:0}
        ];

        return (
            <div className="App">
                <div className="doginterface">
                    <DogInterface weatherInfo={weatherInfo}/>
                </div>
                <div className="weatherbar">
                    <WeatherBar fiveHourInfo={fiveHourInfo} fiveDayInfo={fiveDayInfo}/>
                </div>
                <div className="settings">
                    <Settings/>
                </div>
            </div>
            );
        }
    }

    export default App;
