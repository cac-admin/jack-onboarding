import React from 'react';
import { Link } from 'react-router-dom';

import {loginSuccess} from './Login';

const checkLogin = () => {
    console.log(loginSuccess);
    if (loginSuccess){
        console.log("glad to see youre logged in :)")
    } else {
        console.log("WHY ARENT YOU LOGGED IN >:(")
    }
}

export default function Home() {
    return(

        <div> 
            <h3>Home Page</h3>
            <p>Welcome to rate that course! The perfect place to see opinions from your fellow students on your upcoming classes. Click the button below to read some reviews!</p>

            <Link to="/reviews">Go!</Link> <br/>
            <Link to="/login">Go! 2</Link>

            {checkLogin()}

        </div>
    )
}