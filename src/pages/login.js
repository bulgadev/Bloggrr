import './style.css';
import React from 'react';

const Login = () => {
    return (
        <div className='Main'>
            <h1>Login</h1>
            <input type="text" placeholder="Enter your Username" className="userInp" />
            <input type="text" placeholder="Enter your Password" className="passInp" />
            <input type="submit" className='sub' />
        </div>
    );
};

export default Login;