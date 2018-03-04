import React, { Component } from 'react';
import './Message.css';

    class Message extends Component {
        render() {
            return (
                <div className="info">
                    <p id="message"> {this.props.message} </p>
                </div>
            );
        }
    }

    export default Message;
