import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import axios from 'axios';

function Write() {
    const navigate = useNavigate();

        const data = new Date();    
        const [msg, setMsg] = useState(null);

        //wut rlly interrest in here is the first variable, rest is unecessary shit from react to get the input
        const [title, setUser] = useState('')
        const [content, setPass] = useState('')

        const handleUserChange = (e) => setUser(e.target.value)
        const handlePassChange = (e) => setPass(e.target.value)

        function doPost() {
        const sendData = async () => {
            const dataToSend = {
                "Title": title,
                "Content": content,
                "Date": data
            }

            try {
                // Send POST request to the backend
                const res = await axios.post('http://localhost:5000/api/write', dataToSend, { withCredentials: true });
                const result = res.data;

                // Redirect to /dashboard if login is successful
                if (result.message === "Submission successful") {
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
      <div className="App">
        {/*Nanbar Component*/}
        <Navbar />
        <header className="App-header">
            <br></br>
            <h1>Write a blog</h1>
            <br></br>
            <input className="userInp" type="text" placeholder="Your blog name" value={title} onChange={handleUserChange} />
            <input className="writingInp" type="text" placeholder="Your blog content" value={content} onChange={handlePassChange} />
            <input type='submit' className="sub" onClick={doPost} />
            {msg ? (
                <div>
                    <p>{msg}</p>
                </div>
            ) : null} 
        </header>
      </div>
    );
  }
  
  export default Write;
