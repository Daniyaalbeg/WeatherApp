import React, { Component } from 'react';
import './Settings.css';
import Switch from 'react-toggle-switch';

class Settings extends Component {
    constructor(props){
        super(props);
        var el = "yup";
        this.state = {
            switched: true
        };
    }

    togSwitch(){
        if(!this.state.switched){
            this.el = "yup";
        }
        else{
            this.el = "nope";
        }
    }

    toggleSwitch = () => {
        this.togSwitch();
        this.setState(prevState => {
            return {
                switched: !prevState.switched
            };
        });
    };

    render() {
        return (
            <div className="se">
                <div className="heading"><p id="title">Settings</p></div>
                <div className="location">
                    <div id="locationTag"><p>Use my location</p></div>
                    <Switch class="switch" onClick={this.toggleSwitch} on={this.state.switched}/>
                </div>
                <div className="locationInput"><p>We use your location to provide you with a uptodate service when you're
                on the go! Don't fret, we only use this data to get the most accurate data to you 24/7</p></div>
                <div className="settingSection">
                    <div className="settingLabelLeft"><p>User's name</p></div>
                    <div className="settingLabelLeft"><p>Dog's name</p></div>
                    <div className="settingLabelLeft"><p>Type of dog</p></div>
                </div>
                <div className="settingSection">
                    <div className="settingLabelRight">uName</div>
                    <div className="settingLabelRight">dName</div>
                    <div className="settingLabelRight">type</div>

                </div>
            </div>

            );
        }
    }

    export default Settings;
