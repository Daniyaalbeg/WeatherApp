import React, { Component } from 'react';
import './DogInterface.css';
import Info from './Info/Info.js';

    class DogInterface extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div class="di">
                    <Info/>
                    <div class="dogarea"></div>
                    <div class="weathercomment"></div>
                </div>
            );
        }
    }

    export default DogInterface;
