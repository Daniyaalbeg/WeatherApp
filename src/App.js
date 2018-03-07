import React, { Component } from 'react';
import WeatherData from './WeatherData.js';
import Settings from './Settings/Settings.js';
import {geolocated} from 'react-geolocated';
import Loader from './Loader/Loader.js';
import './App.css';
import './StyleSheets/backgroundStyles.css';

class App extends Component {
    constructor(props){
        super(props);
        this.changeBackground(props);
        this.state = {
            City: null,
            LocationSet: false,
            GeoEnabled: false,
            Settings: {
              City: null,
              LocationSet: false,
              GeoEnabled: false,
              isToggleOn: false,
              isChecked: false,
              location: null,
              username: null,
              dogname: null,
              dogbreed: null,
              checkornot: 'checked'
            }
        };
    }

    componentWillMount(){
      let csettings = localStorage.getItem('DogWeather');
      if(csettings != null){
        this.setState({Settings: JSON.parse(csettings)});
      }

    }

    setSettings(NSettings){
      this.setState({
        Settings: NSettings
      });
      localStorage.setItem('DogWeather', JSON.stringify(NSettings));
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
     //console.log(this.props.coords)
     if(this.state.Settings.LocationSet == true){
       //this.props.isGeolocationAvailable && this.props.isGeolocationEnabled)
        if(this.state.Settings.City != null){
          return (
            <div className="App">
             <WeatherData geo={{city: this.state.Settings.City}} csettings={this.state.Settings} className="weatherData"/>
             <div className="settings">
                 <Settings csettings={this.state.Settings} setSettings={this.setSettings.bind(this)}/>
             </div>
           </div>
          );
        } else {
          return (
            <div className="App">
                <WeatherData geo={this.props.coords} csettings={this.state.Settings} className="weatherData"/>
                <div className="settings">
                    <Settings csettings={this.state.Settings} setSettings={this.setSettings.bind(this)}/>
                </div>
            </div>
          );

        }
      } else {
        // Location is not set so set locatoion
        return (
          <div className="App">
              <div ref="setting" className="settings">
                  <Settings csettings={this.state.Settings} setSettings={this.setSettings.bind(this)} />
              </div>
          </div>
        );
      }

    }
}

//export default App;

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
