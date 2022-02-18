import React, { Component } from 'react';
import { Message } from './Message';
import './css/ChatPage.css'

export default class ChatPage extends Component {

    constructor(props) {
        super(props)

        // Initialize state variables
        this.state = {
            msg_text: '',
            messages: [],
            connectionStatus: "Disconnected"
        }
    }

    // Function to fetch all the previous messages stored on the database
    fetchAllPrevMsgs = () => {
        let url = 'http://127.0.0.1:8000/chat/prevMsgs'
        let data = { "room_code": this.props.credentials.room_code }

        let params = {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(url, params).then((response) => {
            return response.json()
        }).then((data) => {
            data.msgs.forEach((element) => {
                this.setState({
                    messages: this.state.messages.concat({
                        'message': element.msg,
                        'username': element.sent_by,
                        'dateTime': element.sent_on
                    })
                })
            })
        })
    }
    
    // Make a new websocket connection
    chatSocket = new WebSocket(
        'ws://' + '127.0.0.1:8000/' + 'ws/chat/' + this.props.credentials.room_code + '/'
    )

    componentDidMount() {
        this.fetchAllPrevMsgs()

        this.chatSocket.onopen = () => {
            this.setState({connectionStatus: "Connected"})
        }
        this.chatSocket.onclose = () => {
            this.setState({connectionStatus: "Disconnected"})
        }


        this.chatSocket.onmessage = (event) => {
            let receivedMsgData = JSON.parse(event.data)
            this.setState({
                messages: this.state.messages.concat({
                    'message': receivedMsgData.message,
                    'username': receivedMsgData.username,
                    'dateTime': receivedMsgData.dateTime
                })
            })
        }
    }

    // Function which will run when user clicks on send button
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.msg_text === '') {
            this.props.showAlert("Blank messages are not allowed.")
            return
        }

        this.chatSocket.send(JSON.stringify({
            'message': this.state.msg_text,
            'username': this.props.credentials.username,
            'dateTime': new Date().toLocaleString()
        }))

        document.getElementById('msgInput').value = ''
        e.preventDefault()
    }

    handleOnchange = (e) => {
        this.setState({ msg_text: e.target.value })
    }


    render() {
        return <div className='chatPageContainer'>
            <div className='connectionStatus'>{this.props.credentials.room_code}: {this.state.connectionStatus}</div>
            <div className="displayMsgs">
                {this.state.messages.map((element) => {
                    return <div style={this.props.credentials.username === element.username ? { alignSelf: 'end' } : { alignSelf: 'start' }} key={element.dateTime}>{<Message message={element.message} username={element.username} dateTime={element.dateTime} />}</div>
                })}

            </div>

            <div className="msgForm">
                <form onSubmit={this.handleSubmit}>
                    <input id="msgInput" onChange={this.handleOnchange} type="text" name="msg" placeholder="Enter your text here"/>
                    <button className='sendBtn' type='submit'>Send</button>
                </form>
            </div>
        </div>;
    }
}
