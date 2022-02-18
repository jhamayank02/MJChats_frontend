import React, { Component } from 'react';
import './css/Message.css'

export class Message extends Component {
  render() {
    return <div className='msgBox'>
      <div className="user">{this.props.username}</div>
      <div className="msgText">{this.props.message}</div>
      <small>{new Date(this.props.dateTime).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year:'numeric', hour: 'numeric', hour12: true, minute:'numeric', second:'numeric' })}</small>
    </div>;
  }
}

export default Message;

