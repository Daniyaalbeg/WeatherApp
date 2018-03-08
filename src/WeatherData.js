import React, { Component } from 'react';
import DogInterface from './DogInterface/DogInterface.js';
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
            daysimple: {},
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
        if(this.props.csettings.wuid != null){
          UpdateDay('WUID', {wuname: this.props.csettings.wuname, wuid: this.props.csettings.wuid}, this.callBack.bind(this));
          UpdateHourly10Day('WUID', {wuname: this.props.csettings.wuname, wuid: this.props.csettings.wuid}, this.callBack.bind(this));
        } else if(this.props.csettings.GeoEnabled === true) {
          GeoUpdateWeather('GEO', {latitude: this.props.csettings.latitude, longitude: this.props.csettings.longitude}, this.callBack.bind(this));
        }
    }

    componentWillUpdate(nextProps, nextState){
      if(nextProps.csettings.City !== null && nextProps.csettings.City !== 'undefined'){
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
            console.log("test");
            if(!snapper){
                var snapper = new HorizontalSnapper(elem);
            }
        }
    }

    child(percentage){
        return(
            <div style={{position: "absolute", top: 10, left: 10, backgroundColor: "white"}}>
            {percentage}% scroll
            </div>
        )
    }

    render(){
       //console.log(this.state);

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
                    <WeatherBar hourly={this.state.hourly[this.state.viewday]} />
                  </div>
                </div>
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
