import React, { useState } from 'react';
import './style.css';
import { data, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';

const Register = () => {

    const [getD, setGetD] = useState(null);
    const [msg, setMsg] = useState(null);

    //wut rlly interrest in here is the first variable, rest is unecessary shit from react to get the input
    const [username, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')

    //thingys to get the input
    const handleUserChange = (e) => setUser(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePassChange = (e) => setPass(e.target.value)
    

    function handleGet() {
        //calls flask using axios
        axios.get('http://localhost:5000/api/register')
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
                "email": email,
                "Password": password
            }

            try {
                // Send POST request to the backend
                const res = await axios.post('http://localhost:5000/api/register', dataToSend);
                const result = res.data;
                if (result === "Registered") {
                    window.location.href = '/login';
                }
                // Update the message based on the backend response
                setMsg(result.message);
            } catch (err) {
                console.error("Error during registration:", err);
                setMsg("An error occurred. Please try again.");
            }
        }
        sendData();
    }

    



    function printUser() {
        console.log(username)
    }

    return (
        <div>
            <Navbar />
            <h1 className='mainT'>Register</h1>
            <input type="text" placeholder="Enter your Username" className="userInp" value={username} onChange={handleUserChange} />
            <input type="text" placeholder="Enter your Email" className="emailInp" value={email} onChange={handleEmailChange} />
            <input type="text" placeholder="Enter your Password" className="passInp" value={password} onChange={handlePassChange} />
            <input type="submit" className='sub' onClick={doPost} value="Submit" />
            {getD ? (
                <div>
                    <p>{getD.message}</p>
                </div>
            ) : (
                <p>{msg}</p>
            )}
            <Link to="../login">Already have an account?</Link>
        </div>
    );
};

export default Register;