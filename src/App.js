import React, { Component } from 'react';
import DogInterface from './DogInterface/DogInterface.js'
import WeatherBar from './WeatherBar/WeatherBar.js'
import Settings from './Settings/Settings.js'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="doginterface">
                    <DogInterface/>
                </div>
                <div className="weatherbar">
                    <WeatherBar/>
                </div>
                <div className="settings">
                    <Settings/>
                </div>
            </div>
            );
        }
    }

    export default App;
