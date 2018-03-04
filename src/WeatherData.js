import React, { Component } from 'react';
import DogInterface from './DogInterface/DogInterface.js';
import WeatherBar from './WeatherBar/WeatherBar.js';
import {UpdateDay, UpdateHourly10Day} from './WeatherAPI.js';
import Loader from './Loader/Loader.js';


class WeatherData extends Component {
    constructor() {
        super();
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
        UpdateDay(this.callBack.bind(this));
        UpdateHourly10Day(this.callBack.bind(this));

    }

    child(percentage){
        return(
            <div style={{position: "absolute", top: 10, left: 10, backgroundColor: "white"}}>
            {percentage}% scroll
            </div>
        )
    }

    render(){
        console.log(this.state);
        //console.log(this.state.hourly);
      //  console.log(this.state.fiveday);

        //console.log(this.state.hour[this.state.viewday]);
        //console.log(this.state.hourly);

        var element = document.getElementById("data");
        if(element){
            var percentage = Math.round(Math.max(0,Math.min(1,-element.getBoundingClientRect().top/(element.clientHeight/2)))*100);
            // console.log(Math.round(percentage));
        }

        if(this.state.updates > 1){
          return (
              <div style={{height: "200vh"}} id="data">
                <div style={{position: "sticky", top: 0, bottom: 0}}>
                  {this.child(percentage)}
                  <div className="doginterface" >
                    <DogInterface weatherInfo={this.state.today} />
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
export default WeatherData;
