import React from 'react';
import { useNavigate } from 'react-router'
import './css/Home.css'

const Home = (props) => {

    let navigate = useNavigate()

    const onChange = (e) => {
        props.setCredentials({ ...props.credentials, [e.target.name]: e.target.value })
    }

    // Function which will run When user clicks on enter room button
    const handleSubmit = (e) => {
        e.preventDefault()

        let url = 'http://127.0.0.1:8000/chat/chatCredentialsCheck'

        let data = { "username": props.credentials.username, "room_code": props.credentials.room_code, "room_option": props.credentials.room_option, "room_pass": props.credentials.room_pass }
        
        let params = {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        // Submit the credentials and get the response whether the credentials are correct or not
        fetch(url, params).then((response) => {
            return response.json()
        }).then((data) => {
            props.setServerResponse(data.status, data.msg, data.status === 200 ? true : false)

            props.showAlert(data.msg)
            // If the credentials are correct redirect the user to chatpage
            if (data.status === 200) {
                navigate("/chatpage")
            }
        })
    }

    return <div className='homeContainer'>

        <div className="formBox">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Enter your username</label>
                <input onChange={onChange} type="text" id="username" name="username"/>

                <label htmlFor="room_option">Choose a option</label>
                <select onChange={onChange} id="room_option" name="room_option">
                    <option value=""></option>
                    <option value="1">Create a room</option>
                    <option value="2">Have a room code</option>
                </select>

                <label htmlFor="room_code">Enter your room code</label>
                <input onChange={onChange} type="text" id="room_code" name="room_code"/>

                <label htmlFor="room_pass">Enter your room password</label>
                <input onChange={onChange} id="password" type="password" name="room_pass"/>

                <button type='submit'>Enter room</button>
            </form>
        </div>
    </div>;
};

export default Home;