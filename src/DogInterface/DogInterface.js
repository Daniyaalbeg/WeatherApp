import React, { Component } from 'react';
import './DogInterface.css';
import Info from './Info/Info.js';

    class DogInterface extends Component {
        constructor(props) {
            super(props);
        }

        render() {

            let weatherInfo = this.props.weatherInfo;

            return (
                <div class="di">
                    <Info weatherInfo={weatherInfo}/>
                    <div class="dogarea"></div>
                    <div class="weathercomment"></div>
                </div>
            );
        }
    }

    export default DogInterface;
