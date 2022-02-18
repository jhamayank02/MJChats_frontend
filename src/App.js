import React, { Component } from 'react';
import ChatPage from './components/ChatPage';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { NotAuthorized } from './components/NotAuthorized';
import { Alert } from './components/Alert';

export default class App extends Component {
  constructor(){
    super()

    // Initialize state variables
    this.state = {
      // credentials will contain user credentials
      credentials: {
        username: "",
        room_option: "",
        room_code: "",
        room_pass: ""
      },

      // serverResponse will contain response sent by server
      serverResponse: {
        'status': '',
        'msg': '',
        // 'isAuthenticated': true
        'isAuthenticated': false
      },
      alert: ''
    }
  }

  // Function to show alert, if available for 3 seconds
  showAlert = (msg)=>{
    this.setState({alert: msg})
    setTimeout(() => {
      this.setState({alert: ''})
    }, 3000);
  }

  // This function will change credentials state
  setCredentials = ({'username':username, 'room_option':room_option, 'room_code':room_code, 'room_pass':room_pass})=>{
    this.setState({credentials: {
      'username': username,
      'room_option': room_option,
      'room_code': room_code,
      'room_pass': room_pass
    }})
  }

  // This function will set serverResponse state
  setServerResponse = (status, msg, isAuthenticated)=>{
    this.setState({serverResponse: {
      'status': status,
      'msg': msg,
      'isAuthenticated': isAuthenticated
    }})
  }

  render() {
    return <>
    <Router>
    <Navbar/>
    <Alert alert={this.state.alert}/>
      <Routes>

        <Route exact path="/" element={<Home setCredentials={this.setCredentials} credentials={this.state.credentials} setServerResponse={this.setServerResponse} serverResponse={this.state.serverResponse} showAlert={this.showAlert}/>}></Route>

        <Route exact path="/chatpage" element={this.state.serverResponse.isAuthenticated?<ChatPage credentials={this.state.credentials} showAlert={this.showAlert}/>:<NotAuthorized showAlert={this.showAlert}/>}></Route>
        

      </Routes>
    </Router>
    </>;
  }
}
