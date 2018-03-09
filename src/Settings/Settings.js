import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';
import SearchLocation from './SearchLocation.js';
import './Settings.css';

// For the user settings:
// The location toggle is under this.state.isChecked. If true the geoloacation is on, otherwise use manual location.
// The location is set when this.state.isChecked == flase, it is saved under this.location.
// The username, dogname and dogtype are saved under this.username, this.dogname and this.dogtype respectively.

// The settings component returns the entire settings panel on the lower potion of the app.
class Settings extends Component {
    constructor(props){
        super(props);
        this.locationErrorMessage="Location not found"
        this.state = {
            isToggleOn: this.props.csettings.isToggleOn,
            isChecked: this.props.csettings.isChecked,
            locationFound: true
        };
        this.WUAuto = {wuname: this.props.csettings.wuname, wuid: this.props.csettings.wuid};
        this.handleClick = this.handleClick.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    //Called when save settings button is pressed
    handleClick(){
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            isChecked: !prevState.isChecked,
        }));
    }
    //Called when Use my location is disabled.
    getEle(){
        return(
            <div className="ele">
                <div className="locationerrormsg">{this.state.locationFound ? "" : this.locationErrorMessage}</div>
                <div className="userData">
                    <SearchLocation WUName={this.props.csettings.wuname} updateDetails={this.updateAutoComplete.bind(this)} />
                </div>
            </div>
        );
    }
    //Message shown when Use your location is disabled.
    getMsg(){
        return(
            <div className="locationMessage">
                <p>We use your location to provide you with an up-to-date service when you're on the go! Don't fret, we only use this data to get the most accurate info to you 24/7.</p>
            </div>
        );
    }

    saveSettings(){
      console.log(this.WUAuto);
        let settings = {
          City: this.props.csettings.City,
          LocationSet: this.props.csettings.LocationSet,
          GeoEnabled: this.props.csettings.GeoEnabled,
          isToggleOn: this.state.isToggleOn,
          isChecked: this.state.isChecked,
          location: this.props.csettings.location,
          latitude: this.props.csettings.latitude,
          longitude: this.props.csettings.longitude,
          wuid: this.props.csettings.wuid,
          wuname: this.props.csettings.wuname,
          username: this.props.csettings.username,
          dogname: this.props.csettings.dogname,
          dogbreed: this.props.csettings.dogbreed,
          checkornot: this.props.csettings.checkornot
        }

        if(!this.state.isToggleOn){

                //settings.City = document.getElementById("locationf").value;
                settings.LocationSet = true;
                settings.GeoEnabled = false;
                settings.latitude = null;
                settings.longitude = null;
                settings.City = this.WUAuto.wuname;
                settings.wuname = this.WUAuto.wuname;
                settings.wuid = this.WUAuto.wuid;

            if(this.location === "") {
              settings.LocationSet = false;
            }
        } else {
          // Using GPS / Location
          if(this.props.isGeolocationAvailable){
            if(this.props.isGeolocationEnabled){
              if(this.props.coords.latitude !== 'undefined' && this.props.coords.longitude !== 'undefined'){
                settings.LocationSet = true;
                settings.GeoEnabled = true;
                settings.City = null;
                //settings.wuname = null;
                settings.latitude = this.props.coords.latitude;
                settings.longitude = this.props.coords.longitude;
              } else {
                // Error with getting coords
                this.state.locationFound=false;
                console.log("Unable to get coords");
              }
            } else {
              // Geo Location is not Enabled
              this.locationErrorMessage = 'You must allow access to geolocation to use this feature';
              this.setState({locationFound: false});
              this.handleClick();
              return;
              //console.log("Enable Geo Location");
            }
          } else {
            this.locationErrorMessage = 'GEO Location not possible on device / reset.';
            this.setState({locationFound: false});
            this.handleClick();
            return;
          }
        }

        settings.username = document.getElementById("usernamef").value;
        settings.dogname = document.getElementById("dognamef").value;
        settings.dogbreed = document.getElementById("dogbreedf").value;

        this.setState({locationFound: true});
        this.props.setSettings(settings);
        //this.forceUpdate();
        document.getElementById("settingForm").reset();

        //this.forceUpdate();

        // console.log("Loc?" + this.state.isChecked);
        // if(!this.state.isChecked) console.log("Loc:" + this.location);

    }

    getInputHolder(holder){
        if(holder=="Eg. Tom" || holder=="User name"){
            if(holder=="Eg. Tom"){
                if(this.props.csettings.username != null) return this.props.csettings.username;
                else return "User name";
            }
            else if(holder=="User name"){
                if(this.props.csettings.username != null) return "User name";
                else return "Eg. Tom";
            }
        }
        else if(holder=="Eg. Lassie" || holder=="Dog name"){
            if(holder=="Eg. Lassie"){
                if(this.props.csettings.dogname != null) return this.props.csettings.dogname;
                else return "Dog name";
            }
            else if(holder=="Dog name"){
                if(this.props.csettings.dogname != null) return "Dog name";
                else return "Eg. Lassie";
            }
        }
        else if(holder=="Eg. Bulldog" || holder=="Dog breed"){
            if(holder=="Eg. Bulldog"){
                if(this.props.csettings.dogbreed != null) return this.props.csettings.dogbreed;
                else return "Dog type";
            }
            else if(holder=="Dog breed"){
                if(this.props.csettings.dogbreed != null) return "Dog type";
                else return "Eg. Bulldog"
            }
        }
    }

    updateAutoComplete(newWUAuto){
      console.log(newWUAuto);
      this.WUAuto = newWUAuto;
      console.log(this.WUAuto);
      //this.WUAuto = {City: this.props.csettings.City, wuid: this.props.csettings.wuid};
    }

    componentDidUpdate(){
        let username = document.getElementById("usernamef");
        if(username){
            if(this.props.csettings.username){
                username.value = this.props.csettings.username;
            }
        }
        let dogname = document.getElementById("dognamef");
        if(dogname){
            if(this.props.csettings.dogname){
                dogname.value = this.props.csettings.dogname;
            }
        }
        let dogbreed = document.getElementById("dogbreedf");
        if(dogbreed){
            if(this.props.csettings.dogbreed){
                dogbreed.value = this.props.csettings.dogbreed;
            }
        }
    }

    render() {
        return (
            <div className="se">
                <div className="heading">Settings</div>
                <form id="settingForm">
                    <div className="location">
                        <div className="toggle">
                            <input name="test" id="locationSwitch" type="checkbox" onClick={this.handleClick} checked={this.state.isChecked}/>
                            <label for="locationSwitch">
                                Use my location
                                <span></span>
                            </label>
                        </div>
                    </div>
                    <div className="paragraph">{this.state.isToggleOn ? this.getMsg() : this.getEle()}</div>
                    <div className="userInfo">
                        <div className="headingTwo">User Info</div>
                        <div className="userData">
                            <input id="usernamef" placeholder="E.g. Tom" required/>
                            <label for="usernamef">User name</label>
                        </div>
                        <div className="userData">
                            <input id="dognamef" placeholder="E.g. Lassie" required/>
                            <label for="dognamef">Dog name</label>
                        </div>
                        <div className="userData">
                            <input id="dogbreedf" placeholder="E.g. Bulldog" required/>
                            <label for="dogbreedf">Dog breed</label>
                        </div>
                        <div className="centeredButton">
                            <button type="button" onClick={this.saveSettings}>Save Settings</button>
                        </div>
                    </div>
                </form>
            </div>
            );
        }
    }

    //export default Settings;

    export default geolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    })(Settings);
