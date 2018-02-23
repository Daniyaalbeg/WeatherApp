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
              <div style={{color: bgColor}} onClick={this.changeColor.bind(this)}>
                <h1>It is {this.state.date.toLocaleTimeString()}</h1>
              </div>
            );
        }
    }

    export default DogInterface;
