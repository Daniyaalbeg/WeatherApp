import React, { Component } from 'react';
import WeatherData from './WeatherData.js';
import Settings from './Settings/Settings.js';
import {geolocated} from 'react-geolocated';
import Loader from './Loader/Loader.js';
import './App.css';
import './StyleSheets/backgroundStyles.css';
import VerticalSnapper from './lib/VerticalSnapper.js';

// The main window component. Holds important state checks to ensure that the
// correct data is being rendered.
class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            AppName: 'DogWeather',
            Settings: {
              City: null,
              LocationSet: false,
              GeoEnabled: false,
              isToggleOn: false,
              isChecked: false,
              location: null,
              latitude: null,
              longitude: null,
              wuname: null,
              wuid: null,
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

    //Setting state to the varibales that change.
    setSettings(NSettings){
      this.setState({
        Settings: NSettings
      });
      localStorage.setItem('DogWeather', JSON.stringify(NSettings));
    }

    //Creates the vertical slider
    componentDidMount(){
        let elem = document.getElementById("App");
        if(elem){
            if(!this.snapper){
                this.snapper = new VerticalSnapper(elem);
            }
        }
    }

    componentDidUpdate(){
        let elem = document.getElementById("App");
        if(elem){
            if(!this.snapper){
                this.snapper = new VerticalSnapper(elem);
            }
        }
    }

    // Data we have access to:
    // - Pressure
    // - Feels like (Hour)
    // - PoP (precipitation) (Hour)
    // - humidity (hour)
    // - wind speed

    // If location is enabled a different window of data is displayed.
    render() {
     //console.log(this.props.coords)
     if(this.state.Settings.LocationSet == true){
       //this.props.isGeolocationAvailable && this.props.isGeolocationEnabled)
          return (
            <div className="App" id="App">
             <WeatherData csettings={this.state.Settings} setSettings={this.setSettings.bind(this)} className="weatherData"/>
             <div className="settings">
                 <Settings csettings={this.state.Settings} setSettings={this.setSettings.bind(this)}/>
             </div>
           </div>
          );


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
