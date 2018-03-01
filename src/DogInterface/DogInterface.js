import React, { Component } from 'react';
import './DogInterface.css';
import Info from './Info/Info.js';

    class DogInterface extends Component {
        constructor(props) {
            super(props);
        }

        render() {

            let weatherInfo = this.props.weatherInfo;
            var weatherGif;

            // More weathers need to be added into the switch case.
            switch(weatherInfo.weather){
                case "sunny":
                    weatherGif="";
                    break;
                case "snow":
                    weatherGif="";
                    break;
                case "cloud":
                    weatherGif="";
                    break;
                case "rain":
                    weatherGif="https://media.giphy.com/media/127FZEzX7wnPmU/giphy.gif";
                    break;
            }

            return (
                <div className="di">
                    <Info weatherInfo={weatherInfo}/>
                    <div className="dogarea">
                        <div>
                            <img id="weathergif" src={weatherGif}/>
                        </div>
                    </div>
                    <div className="weathercomment"></div>
                </div>
            );
        }
    }

    export default DogInterface;
