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
        if(currentTime >= 4 && currentTime < 6) document.body.classList.add('morning');
        else if (currentTime >= 6 && currentTime <11) document.body.classList.add('lateMorning');
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
        console.log("HOURS: " + hours);
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
        //console.log(this.state.updates);
        //console.log(data);
    }

    componentDidMount(){
        if(this.props.csettings.wuid){
          UpdateDay({wuname: this.props.csettings.wuname, wuid: this.props.csettings.wuid}, this.callBack.bind(this));
          UpdateHourly10Day({wuname: this.props.csettings.wuname, wuid: this.props.csettings.wuid}, this.callBack.bind(this));
        } else if(this.props.csettings.GeoEnabled === true) {
          GeoUpdateWeather({latitude: this.props.csettings.latitude, longitude: this.props.csettings.longitude}, this.callBack.bind(this));
        }
    }

    componentWillUpdate(nextProps){
      if(nextProps.csettings.City){
        // Settings Changed
        if(nextProps.csettings.wuname != this.props.csettings.wuname){
          //this.setState({updates: 0});
          UpdateDay({wuname: nextProps.csettings.wuname, wuid: nextProps.csettings.wuid}, this.callBack.bind(this));
          UpdateHourly10Day({wuname: nextProps.csettings.wuname, wuid: nextProps.csettings.wuid}, this.callBack.bind(this));
          }
      } else if(nextProps.csettings.GeoEnabled == true) {
        if(nextProps.csettings.latitude != this.props.csettings.latitude && nextProps.csettings.longitude != this.props.csettings.longitude){
          GeoUpdateWeather({latitude: nextProps.csettings.latitude, longitude: nextProps.csettings.longitude}, this.callBack.bind(this));
        }
      }
    }

    componentDidUpdate(){
        let elem = document.getElementById("dayScroller");
        if(elem){
            if(!this.snapper){
                this.snapper = new HorizontalSnapper(elem);
            }
        }
    }

    render(){
        // console.log(this.state);
        let days = [];
        if(this.state.daysimple.length > 7){
            days = this.state.daysimple.slice(1,7);
            // console.log(days);
        }

        let daysHourly = [];
        if(this.state.hourly.length > 7){
            daysHourly = this.state.hourly.slice(1,7);
            // console.log(daysHourly);
        }

        let daysElems = [];
        if(days.length > 0){
            console.log(days);
            daysElems = days.map((day, i)=>{
                console.log({day, i});
                return (
                    <div className="otherDay">
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
            // console.log(Math.round(percentage));
        }

        if(this.state.updates > 1 && this.state.today.length != 0){
            this.changeBackground();
            console.log('Today', this.state.daysimple);
            return (
              <div id="dayScroller" className="horizontalSnapper">
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
