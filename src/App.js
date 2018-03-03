import React, { Component } from 'react';
import WeatherData from './WeatherData.js';
import Settings from './Settings/Settings.js';
import './App.css';
import './StyleSheets/backgroundStyles.css';

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

    // Data we have access to:
    // - Pressure
    // - Feels like (Hour)
    // - PoP (precipitation) (Hour)
    // - humidity (hour)
    // - wind speed

    render() {
        return (
            <div className="App">
                <WeatherData className="weatherData"/>
                <div className="settings">
                    <Settings/>
                </div>
            </div>
        );
    }
}

    export default App;
