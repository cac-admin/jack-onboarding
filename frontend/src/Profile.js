import React, {useState, useEffect}from 'react';
import axios from 'axios';
import './styles.css'

export default function Profile (){    

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('default_icon.png');


    useEffect(() => {
        console.log(file);
        console.log(fileName);
    }, [file]);


    function checkDisplay(){
        const loggedIn = localStorage.getItem('curUser');
        if (!loggedIn){
            return(<div align="center"><h align="center">Error: Must be logged in to view this page</h></div>)
        }
        else{
            return(<div>
                <input type='file' onChange={handleChange}/>
                <input type='submit' onClick={handleClick}/>
                <img alt="uploaded image" src={'C:\\Users\\jack.admin\\Desktop\\idk\\newProj\\ui\\frontend\\src\pfps\\' + fileName} />
            </div>);
        }
    }

    function handleClick(){
        console.log("")
    }

    function handleChange(e){
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileName(e.target.files[0].name);
    }

    return(
        <div className='wrapper-main'>
            <div className='topnav'>
            <a href="/writereview">Write a Review</a>
            <a href="/reviews">Read Reviews</a>
            <a class="active" href="#profile">Profile</a>
            <a href="/login">Login/Signup</a>
            <a href="/">Home</a>
            </div>
            {checkDisplay()}
        </div>
    );
}