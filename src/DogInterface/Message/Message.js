import React, { Component } from 'react';
import './Message.css';

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
