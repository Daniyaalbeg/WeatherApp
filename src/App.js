import React, { Component } from 'react';
import logo from './logo.svg';
import DogInterface from './DogInterface.js'
import WeatherBar from './WeatherBar.js'
import Settings from './Settings.js'
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
