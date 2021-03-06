import React, { Component } from 'react';
import DogInterface from './DogInterface/DogInterface.js';
import DogInterfaceOther from './DogInterface/DogInterfaceOther.js';
import WeatherBar from './WeatherBar/WeatherBar.js';
import {GeoUpdateWeather, UpdateDay, UpdateHourly10Day} from './WeatherAPI.js';
import Loader from './Loader/Loader.js';
import HorizontalSnapper from  './lib/HorizontalSnapper.js';
import './lib/HorizontalSnapper.css';

class WeatherData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: [],
            hourly: [],
            daysimple: [],
            viewday: 0,
            updates: 0
        };
    }

    changeBackground(){
        var currentTime = this.checkTime();
        this.removeOld();
        if(currentTime >= 5 && currentTime < 7) document.body.classList.add('morning');
        else if (currentTime >= 7 && currentTime <11) document.body.classList.add('lateMorning');
        else if(currentTime >= 11 && currentTime < 16) document.body.classList.add('afternoon');
        else if(currentTime >= 16 && currentTime < 17) document.body.classList.add('lateAfternoon');
        else if(currentTime >= 17 && currentTime < 18) document.body.classList.add('evening');
        else if(currentTime >= 18 && currentTime < 19) document.body.classList.add('lateEvening');
        else if(currentTime >= 19 && currentTime < 22) document.body.classList.add('night');
        else document.body.classList.add('lateNight');
    }

    checkTime() {
        let time = this.state.today.time.split(":");
        var hours = 0;
        if (time[1].includes("PM") && parseInt(time[0]) === 12) {
            hours = parseInt(time[0]);
        } else if (time[1].includes("AM") && parseInt(time[0]) === 12) {
            hours = parseInt(time[0]) + 12;
        } else if (time[1].includes("PM")) {
            hours = parseInt(time[0]) + 12;
        } else {
            hours = parseInt(time[0]);
        }
        //console.log("HOURS: " + hours);
        return hours;
    }

    removeOld(){
        document.body.classList.remove('morning');
        document.body.classList.remove('lateMorning');
        document.body.classList.remove('afternoon');
        document.body.classList.remove('lateAfternoon');
        document.body.classList.remove('evening');
        document.body.classList.remove('lateEvening');
        document.body.classList.remove('night');
        document.body.classList.remove('lateNight');
    }

    callBack(data){
        this.setState(data);
        this.setState(prevState => {
          return {updates: prevState.updates + 1}
        });
    }

    componentDidMount(){
        var intervalID = setInterval(this.UpdateWeatherEveryX.bind(this), 900000); // Weather will be updated every 15 minutes
        let helperIntervalID = setInterval(this.disableHelperUI.bind(this), 4000); // Remove hint after 4 seconds
        let settings = this.props.csettings;
        settings.showHelper = true;
        this.props.setSettings(settings);
        // Store intervalId in the state so it can be accessed later:
        this.setState({intervalID: intervalID});
        this.setState({helperIntervalID: helperIntervalID});
        if(!this.props.csettings.GeoEnabled){
          UpdateDay({wuname: this.props.csettings.wuname, wuid: this.props.csettings.wuid}, this.callBack.bind(this));
          UpdateHourly10Day({wuname: this.props.csettings.wuname, wuid: this.props.csettings.wuid}, this.callBack.bind(this));
        } else {
          GeoUpdateWeather({latitude: this.props.csettings.latitude, longitude: this.props.csettings.longitude}, this.callBack.bind(this));
        }
    }

    // Will disable the UI from displaying
    disableHelperUI(){
      let settings = this.props.csettings;
      settings.showHelper = false;
      this.props.setSettings(settings);
      clearInterval(this.state.helperIntervalID);

    }

    // Displays the helper GUI if its enabled
    returnHelperOverlay(){
      if(this.props.csettings.showHelper){
        return (<div className="sideIndicator">Swipe left for more days</div>);
      }
    }

    componentWillUnmount() {
    // We are usng intervalId from the state to clear the interval
    clearInterval(this.state.intervalID);
    clearInterval(this.state.helperIntervalID);
    // It will clear it when the app is exited.
    }

   UpdateWeatherEveryX(){
    // This method is called to update the weather every time, if the app is still kept open.
      if(!this.props.csettings.GeoEnabled){
        UpdateDay({wuname: this.props.csettings.wuname, wuid: this.props.csettings.wuid}, this.callBack.bind(this));
        UpdateHourly10Day({wuname: this.props.csettings.wuname, wuid: this.props.csettings.wuid}, this.callBack.bind(this));
      } else {
        GeoUpdateWeather({latitude: this.props.csettings.latitude, longitude: this.props.csettings.longitude}, this.callBack.bind(this));
      }
    }

    componentWillUpdate(nextProps){
      if(!nextProps.csettings.GeoEnabled){
        // Settings Changed
        if(nextProps.csettings.wuname != this.props.csettings.wuname ||	nextProps.csettings.GeoEnabled != this.props.csettings.GeoEnabled){
          let cstate = this.state;
          cstate.today.city = 'Updating Weather';
          this.setState(cstate);
          UpdateDay({wuname: nextProps.csettings.wuname, wuid: nextProps.csettings.wuid}, this.callBack.bind(this));
          UpdateHourly10Day({wuname: nextProps.csettings.wuname, wuid: nextProps.csettings.wuid}, this.callBack.bind(this));
          }
      } else {
        if(nextProps.csettings.latitude != this.props.csettings.latitude && nextProps.csettings.longitude != this.props.csettings.longitude){
          let cstate = this.state;
          cstate.today.city = 'Updating Weather';
          this.setState(cstate);
          GeoUpdateWeather({latitude: nextProps.csettings.latitude, longitude: nextProps.csettings.longitude}, this.callBack.bind(this));
        }
      }
    }

    componentDidUpdate(prevProps){
        let elem = document.getElementById("dayScroller");
        if(elem){
            if(!this.snapper){
                this.snapper = new HorizontalSnapper(elem);
            }
        }
    }

    render(){
        let days = [];
        if(this.state.daysimple.length > 7){
            days = this.state.daysimple.slice(1,7);
        }

        let daysHourly = [];
        if(this.state.hourly.length > 7){
            daysHourly = this.state.hourly.slice(1,7);
        }

        let daysElems = [];
        if(days.length > 0){
            daysElems = days.map((day, i)=>{
                return (
                    <div className="otherDay">
                      {this.returnHelperOverlay()}
                      <div className="doginterface" >
                        <DogInterfaceOther dogname={this.props.csettings.dogname} username={this.props.csettings.username} daysimple={day}/>
                      </div>
                      <div className="weatherbar">
                        <WeatherBar hourly={daysHourly[i]} id={i+1} />
                      </div>
                    </div>
                );
            });
        }

        var element = document.getElementById("data");
        if(element){
            var percentage = Math.round(Math.max(0,Math.min(1,-element.getBoundingClientRect().top/(element.clientHeight/2)))*100);
        }

        if(this.state.updates > 1 && this.state.today.length != 0){
            this.changeBackground();
            ///console.log('Today', this.state.daysimple);
            return (
              <div id="dayScroller" className="horizontalSnapper">
              {this.returnHelperOverlay()}
                <div className="day">
                  <div className="doginterface" >
                    <DogInterface weatherInfo={this.state.today} dogname={this.props.csettings.dogname} username={this.props.csettings.username} daysimple={this.state.daysimple[this.state.viewday]}/>
                  </div>
                  <div className="weatherbar">
                    <WeatherBar hourly={this.state.hourly[this.state.viewday]} id="0" />
                  </div>
                </div>
                {daysElems}
              </div>
            );
      } else {
        return (
          <Loader />
        );
      }
    }

}

export  default WeatherData;
