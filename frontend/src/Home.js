import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './styles.css'



const checkLogin = () => {
    const loggedIn = localStorage.getItem('curUser');
    if (loggedIn){
        console.log("according to local storage you are logged in")
    }
    else {
        console.log("according to local storage you are NOT logged in")
    }
}

export default function Home() {
    return(
        <div className='wrapper-main'> 
            <div className='topnav'>
                <a href="/writereview">Write a Review</a>
                <a href="/reviews">Read Reviews</a>
                <a href="/login">Login/Signup</a>
                <a class="active" href="#home">Home</a>
            </div>
            <h3 className='header-home'>Rate that Course</h3>
            <p className='paragraph-home'>Welcome to rate that course!</p>

            {/* <Link to="/login">Login/Signup</Link> <br/>
            <Link to="/reviews">Read reviews</Link> <br/>
            <Link to="/writereview">Write reviews</Link> */}

            {checkLogin()}

        </div>
    )
}