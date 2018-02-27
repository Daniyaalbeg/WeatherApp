import React, { Component } from 'react';
import './Info.css';

    class Info extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div class="info">
                    <p id="city">LONDON</p>
                    <p id="temp">18°C</p>
                    <p id="wind">8 mph</p>
                    <p id="pol">Pollen: Low</p>
                </div>
            );
        }
    }

    export default Info;
