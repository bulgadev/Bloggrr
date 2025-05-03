import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="Enter your Username" className="userInp" />
            <input type="text" placeholder="Enter your Email" className="emailInp" />
            <input type="text" placeholder="Enter your Password" className="passInp" />
            <input type="submit" className='sub' />
            <Link to="./login.js">Already have an account?</Link>
        </div>
    );
};

export default Register;