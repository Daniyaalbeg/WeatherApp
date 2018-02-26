import React, { Component } from 'react';
import './DogInterface.css';

    class DogInterface extends Component {
        constructor(props) {
            super(props);
            this.state = {
                date: new Date(),
                color_lightsalmon: true
            };

        }
        componentDidMount() {
            this.timerID = setInterval(
              () => this.tick(),
              1000
            );
        }
        componentWillUnmount() {
            clearInterval(this.timerID);
        }
        tick() {
            this.setState({
              date: new Date()
            });
        }

        changeColor(){
            this.setState({color_lightsalmon: !this.state.color_lightsalmon})
        }

        render() {
            let bgColor = this.state.color_lightsalmon ? "white" : "lightsalmon";

            return (
                <div class="di">
                    <div class="info">
                        <p id="city">LONDON</p>
                        <p id="temp">18°C</p>
                        <p id="wind">8 mph</p>
                        <p id="pol">Pollen: Low</p>
                    </div>
                    <div class="dogarea">
                    </div>
                    <div class="weathercomment">
                    </div>
                </div>

            );
        }
    }
// <h1>It is {this.state.date.toLocaleTimeString()}</h1>
//<div class="clock">style={{color: bgColor}} onClick={this.changeColor.bind(this)}</div>
    export default DogInterface;
