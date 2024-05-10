import React from 'react';
import { Link } from 'react-router-dom';



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

        <div> 
            <h3>Home Page</h3>
            <p>Welcome to rate that course! Use the links below to navigate the website.</p>

            <Link to="/login">Login/Signup</Link> <br/>
            <Link to="/reviews">Read reviews</Link> <br/>
            <Link to="/writereview">Write reviews</Link>

            {checkLogin()}

        </div>
    )
}