import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import './styles.css'
import ReCAPTCHA from "react-google-recaptcha";

var loginSuccess = false;
var signUpSuccess = true;

export default function Login() {
    const [initUsername, setUsername] = useState('');
    const [initPassword, setPassword] = useState('');
    var [captchaCheck, setCaptcha] = useState(false);

    const  clickLogin = (e) => {
        e.preventDefault()
        const loggedIn = localStorage.getItem('curUser');
        if (loggedIn){
            alert("A user is already logged in, please log out first.")
        }
        else if (initUsername.length === 0){
            alert("Please input a valid username");
        }
        else if (initPassword.length === 0){
            alert("Please input a valid password");
        }
        else if (!captchaCheck){
            alert("Please complete the captcha")
        }
        else {
            axios.get('http://localhost:8000/api/users/')
            .then(res => {
                const users = res.data;
                users.map(function (users) {
                    if (users.Username === initUsername && users.Password === initPassword) {
                        loginSuccess = true;
                    }});
                if (loginSuccess){
                    localStorage.setItem('curUser', initUsername);
                    alert("Login success"); 
                    console.log("Login success"); 
                } else {
                    alert("Login failed"); 
                    console.log("Login failed"); 
                }
            }
            );
        }
    }

    const clickSignup = (e) => {
        e.preventDefault()
        signUpSuccess = true
        if (initUsername.length === 0){
            alert("Please input a valid username");
        }
        else if (initPassword.length === 0){
            alert("Please input a valid password");
        }
        else if (!captchaCheck){
            alert("Please complete the captcha")
        }
        else{
            axios.get('http://localhost:8000/api/users/')
            .then(res => {
                const users = res.data;
                users.map(function (users) {
                    if (users.Username === initUsername) {
                        signUpSuccess = false;
                    }});
                if (signUpSuccess){
                    axios.post('http://localhost:8000/api/users/',{Username : initUsername, Password : initPassword})
                    .then(function (response){alert(response)})
                    .catch(function (error) {alert(error)})
                } else {
                    alert("Username is already taken"); 
                    console.log("Sign-in failed"); 
                }

        })
    }}

    const clickLogout = (e) => {
        e.preventDefault()
        loginSuccess = false;
        localStorage.clear();
        console.log("Logged out");
        alert("Logged out");
    }

    const captchaChange = () => {
        setCaptcha(true);
    }

    return(
        <div classname="wrapper-main"> 
            <div className='topnav'>
                <a href="/writereview">Write a Review</a>
                <a href="/reviews">Read Reviews</a>
                <a href="/profile">Profile</a>
                <a class="active" href="#login">Login/Signup</a>
                <a href="/">Home</a>
            </div>
            <h3 className='header-login'>Login</h3>
            <form className='login-form'>
                <label>
                    Username:
                    <input type="text" name="username" placeholder="Enter username" value={initUsername} onChange={x => setUsername(x.target.value)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name="password" placeholder="Enter password" value={initPassword} onChange={x => setPassword(x.target.value)}/>
                </label>
                <br/>
                <Button variant="contained" onClick={clickLogin}>Login</Button> <br/>
                <Button variant="contained" onClick={clickSignup}>Sign Up</Button> <br/>
                <p className='logout-text'>Already logged in? Click <input type='submit' value="here" onClick={clickLogout}/> to logout</p>
                <ReCAPTCHA align="center" sitekey="6Lfijd0pAAAAAKQF-TCLDyYVYhZ8OvxeqnWb96y6" onChange={captchaChange}/>
            </form>
        </div>
    )
}

// secret key: 6Lfijd0pAAAAAIJhEmA3_BBaccebVWjS_Bq4de4E

// look into auth0 on thursday?