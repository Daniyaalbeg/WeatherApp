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
          UpdateDay('WUID', {wuname: this.props.csettings.wuname, wuid: this.props.csettings.wuid}, this.callBack.bind(this));
          UpdateHourly10Day('WUID', {wuname: this.props.csettings.wuname, wuid: this.props.csettings.wuid}, this.callBack.bind(this));
        } else if(this.props.csettings.GeoEnabled === true) {
          GeoUpdateWeather('GEO', {latitude: this.props.csettings.latitude, longitude: this.props.csettings.longitude}, this.callBack.bind(this));
        }
    }

    componentWillUpdate(nextProps){
      if(nextProps.csettings.City){
        // Settings Changed
        if(nextProps.csettings.wuname != this.props.csettings.wuname){
          //this.setState({updates: 0});
          UpdateDay('WUID', {wuname: nextProps.csettings.wuname, wuid: nextProps.csettings.wuid}, this.callBack.bind(this));
          UpdateHourly10Day('WUID', {wuname: nextProps.csettings.wuname, wuid: nextProps.csettings.wuid}, this.callBack.bind(this));
          }
      } else if(nextProps.csettings.GeoEnabled == true) {
        if(nextProps.csettings.latitude != this.props.csettings.latitude && nextProps.csettings.longitude != this.props.csettings.longitude){
          GeoUpdateWeather('GEO', {latitude: nextProps.csettings.latitude, longitude: nextProps.csettings.longitude}, this.callBack.bind(this));
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
