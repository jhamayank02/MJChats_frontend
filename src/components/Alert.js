import React, { Component } from 'react';
import './css/Alert.css'

export class Alert extends Component {
  render() {
    return <div className='alertBox'>
      {this.props.alert !== '' && <div className="alertMsg">
        {this.props.alert}
      </div>}
    </div>;;
  }
}

export default Alert;

