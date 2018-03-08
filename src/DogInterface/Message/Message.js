import React, { Component } from 'react';
import './Message.css';

    // Message component returns the personalised message for the user telling them wether or not it
    // is a good time to walk their dog.

    // It contains a header message; it is a good time to walk their dog and a message about
    // the current weather.
    class Message extends Component {
        render() {
            return (
                <div className="info">
                    <div className="message"><p id="header"> {this.props.header} </p></div>
                    <div className="message"><p id="message"> {this.props.message} </p></div>
                </div>
            );
        }
    }

    export default Message;
