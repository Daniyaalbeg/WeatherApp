import React, { Component } from 'react';
import './Message.css';

    class Message extends Component {
        render() {
            return (
                <div className="info">
                    <div class="message"><p id="message"> {this.props.message} </p></div>
                </div>
            );
        }
    }

    export default Message;
