import React, { Component } from 'react';
import './Settings.css';
import Switch from 'react-toggle-switch';

class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            switched: true
        };
    }

    toggleSwitch = () => {
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
                <div className="settingSection">
                    <div className="settingLabelLeft"><p>Use my Location</p></div>
                    <div className="settingLabelLeft"><p>Name of User</p></div>
                    <div className="settingLabelLeft"><p>Name of Dog</p></div>
                    <div className="settingLabelLeft"><p>Breed of Dog</p></div>
                </div>
                <div className="settingSection">
                    <div className="settingLabelRight">
                        <Switch onClick={this.toggleSwitch} on={this.state.switched}/>
                    </div>
                    
                </div>
            </div>

            );
        }
    }

    export default Settings;
