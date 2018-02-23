import React, { Component } from 'react';
import logo from './logo.svg';
import DogInterface from './DogInterface.js'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="doginterface">
                    <DogInterface/>
                </div>
                <div className="weatherbar">
                    <DogInterface/>
                </div>
                <div className="settings">
                    <DogInterface/>
                </div>
            </div>
            );
        }
    }

    export default App;
