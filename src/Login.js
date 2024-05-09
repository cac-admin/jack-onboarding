import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export var loginSuccess = false;

export default function Login() {
    const [initUsername, setUsername] = useState('');
    const [initPassword, setPassword] = useState('');

    const  clickLogin = (e) => {
        e.preventDefault()
        if (initUsername.length === 0){
            alert("Please input a valid username");
        }
        else if (initPassword.length === 0){
            alert("Please input a valid password");
        }
        else {
        axios.get('http://localhost:8000/api/users/')
        .then(res => {const users = res.data;
            users.map(function (users) {
                if (users.Username === initUsername && users.Password === initPassword) {
                    loginSuccess = true;
                }});
            if (loginSuccess){
                alert("Login success"); 
                console.log("Login success"); 
            } else {
                alert("Login failed"); 
                console.log("Login failed"); 
            }
        });}
    }

    const  clickSignup = (e) => {
        e.preventDefault()
        if (initUsername.length === 0){
            alert("Please input a valid username");
        }
        else if (initPassword.length === 0){
            alert("Please input a valid password");
        }
        else{
        axios.post('http://localhost:8000/api/users/',{Username : initUsername, Password : initPassword})
        .then(function (response){alert(response)})
        .catch(function (error) {alert(error)})
        }
    }

    const  clickLogout = (e) => {
        e.preventDefault()
        loginSuccess = false;
        console.log("Logged out");
        alert("Logged out");
    }

    return(
        <div> 
            <h3>Login Page</h3>
            <p>THIS IS THE LOGIN PAGE</p>
            <form>
            <label>
                Username:
                <input type="text" name="username" value={initUsername} onChange={x => setUsername(x.target.value)}/>
            </label>
            <br/>
            <label>
                Password:
                <input type="text" name="password" value={initPassword} onChange={x => setPassword(x.target.value)}/>
            </label>
            <br/>
            <input type="submit" value="Login" onClick={clickLogin}/><br/>
            <input type="submit" value="Sign Up" onClick={clickSignup}/><br/><br/>
            <input type="submit" value="Logout" onClick={clickLogout}/>
            </form>

            <Link to="/">Go! 2</Link>



        </div>
    )
}