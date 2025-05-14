import './style.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

const Login = () => {

    const [getD, setGetD] = useState(null);
    const [msg, setMsg] = useState(null);

    //wut rlly interrest in here is the first variable, rest is unecessary shit from react to get the input
    const [username, setUser] = useState('')
    const [password, setPass] = useState('')

    //thingys to get the input
    const handleUserChange = (e) => setUser(e.target.value)
    const handlePassChange = (e) => setPass(e.target.value)
    

    function handleGet() {
        //calls flask using axios
        axios.get('https://bloggrr.onrender.com/api/login')
        //we take our info from flask
        .then(res => {
          setGetD(res.getD); //saves the data into a state
        })
        //just in case our code goes kaboom
        .catch(err => console.error("Im sorry for u man, good luck:", err));
  }


    function doPost() {
        const sendData = async () => {
            const dataToSend = {
                "username": username,
                "Password": password
            }

            try {
                // Send POST request to the backend
                const res = await axios.post('https://bloggrr.onrender.com/api/login', dataToSend, { withCredentials: true });
                const result = res.data;

                // Redirect to /dashboard if login is successful
                if (result.message === "Login successful") {
                    window.location.href = '/dashboard';
                }
                // Update the message based on the backend response
                setMsg(result.message);
            } catch (err) {
                console.error("Error, login:", err);
                setMsg("An error occurred. Please try again.");
            }
        }
        sendData();
    }

    

    return (
        <div className='Main'>
            <Navbar />
            <h1 className='mainT'>Login</h1>
            <input type="text" placeholder="Enter your Username" className="userInp" value={username} onChange={handleUserChange} />
            <input type="password" placeholder="Enter your Password" className="passInp" value={password} onChange={handlePassChange} />
            <input type="submit" className='sub' onClick={doPost} value="Submit" />
            {getD ? (
                <div>
                    <p>{getD.message}</p>
                </div>
            ) : (
                <p>{msg}</p>
            )}
            <Link to="../register">Doesnt have a account with us?</Link>
        </div>
    );
};

export default Login;
