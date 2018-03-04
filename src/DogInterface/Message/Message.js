import React, { Component } from 'react';
import './Message.css';

    class Message extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            let message = this.props.message;
            return (
                <div className="info">
                    <p id="message"> {message} </p>
                </div>
            );
        }
    }

    export default Message;
