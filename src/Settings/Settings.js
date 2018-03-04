import React, { Component } from 'react';
import './Settings.css';

// For the user settings:
// The location toggle is under this.state.isChecked. If true the geoloacation is on, otherwise use manual location.
// The location is set when this.state.isChecked == flase, it is saved under this.location.
// The username, dogname and dogtype are saved under this.username, this.dogname and this.dogtype respectively.

class Settings extends Component {
    constructor(props){
        super(props);
        let location=null;
        let username=null;
        let dogname=null;
        let dogbreed=null;
        let checkornot="checked";
        this.locMsg="We use your location to provide you with a up-to-date service when you're on the go! Don't fret, we only use this data to get the most accurate info to you 24/7.";
        this.state = {
            isToggleOn: true,
            isChecked: true,
        };
        this.handleClick = this.handleClick.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    handleClick(){
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            isChecked: !prevState.isChecked,
        }));
    }

    getEle(){
        return(
            <input id="locationf" class="locationBox" type="text" placeholder={this.getInputHolder("Location")}/>
        );
    }

    saveSettings(){
        if(!this.state.isToggleOn){
            if(document.getElementById("locationf").value){
                this.location=document.getElementById("locationf").value;
            }
            if(this.location == "") this.location=null;
        }
        else this.location=null;
        if(document.getElementById("usernamef").value){
            this.username=document.getElementById("usernamef").value;
        }
        if(document.getElementById("dognamef").value){
            this.dogname=document.getElementById("dognamef").value;
        }
        if(document.getElementById("dogbreedf").value){
            this.dogbreed=document.getElementById("dogbreedf").value;
        }
        if(this.username == "") this.username=null;
        if(this.dogname == "") this.dogname=null;
        if(this.dogbreed == "") this.dogbreed=null;
        document.getElementById("settingForm").reset();
        this.forceUpdate();

        // console.log("Loc?" + this.state.isChecked);
        // if(!this.state.isChecked) console.log("Loc:" + this.location);
        // console.log(this.username);
        // console.log(this.dogname);
        // console.log(this.dogbreed);
    }

    getInputHolder(holder){
        if(holder=="Location"){
            if(this.location != null) return this.location;
            else return holder;
        }
        else if(holder=="User name"){
            if(this.username != null) return this.username;
            else return holder;
        }
        else if(holder=="Dog name"){
            if(this.dogname != null) return this.dogname;
            else return holder;
        }
        else if(holder=="Dog breed"){
            if(this.dogbreed != null) return this.dogbreed;
            else return holder;
        }
    }

    render() {
        return (
            <div class="se">
                <div class="heading"><p id="title">Settings</p></div>
                <form id="settingForm">
                    <div class="loc">
                        <div class="location">
                            <div class="locationTag"><p>Use my location</p></div>
                            <div class="togg">
                                <label class="switch">
                                    <input id="locationSwitch" type="checkbox" onClick={this.handleClick} checked={this.state.isChecked}/>
                                    <span class="slider round"></span>
                                </label>
                            </div>

                        </div>
                        <div class="locationInput">{this.state.isToggleOn ? this.locMsg : this.getEle()}</div>
                    </div>
                    <div class="userInfo">
                        <div class="headingTwo"><p>User Info</p></div>
                        <div class="userData"><input id="usernamef" class="locationBox" type="text" placeholder={this.getInputHolder("User name")}/></div>
                        <div class="userData"><input id="dognamef" class="locationBox" type="text" placeholder={this.getInputHolder("Dog name")}/></div>
                        <div class="userData"><input id="dogbreedf" class="locationBox" type="text" placeholder={this.getInputHolder("Dog breed")}/></div>
                        <div class="buttonarea">
                            <button class="saveDataButton" type="button" onClick={this.saveSettings}>Save Settings</button>
                            <div class="saveMessage"><p id="saq"></p></div>
                        </div>
                    </div>
                </form>
            </div>
            );
        }
    }

    export default Settings;
