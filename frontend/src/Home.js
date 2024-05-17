import React from 'react';
import img1 from './student_writing.jpg'
import './styles.css'

export default function Home() {
    return(
        <div className='wrapper-main'> 
            <div className='topnav'>
                <a href="/writereview">Write a Review</a>
                <a href="/reviews">Read Reviews</a>
                <a href="/profile">Profile</a>
                <a href="/login">Login/Signup</a>
                <a class="active" href="#home">Home</a>
            </div>
            <h3 className='header-home'>Rate that Course</h3>
            <p className='paragraph-home'>Welcome to rate that course!</p>

            <div className='container'>
                <img id='container-left' src={img1} alt="student writing an exam"></img>
                    <p id='container-right'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam vehicula ipsum a arcu cursus vitae. Sed blandit libero volutpat sed cras ornare arcu dui vivamus. Ut lectus arcu bibendum at varius vel pharetra vel. Euismod nisi porta lorem mollis aliquam ut porttitor leo a. Volutpat blandit aliquam etiam erat velit. Enim praesent elementum facilisis leo. Tellus id interdum velit laoreet id donec. Vestibulum morbi blandit cursus risus at ultrices. Cursus mattis molestie a iaculis at erat. Arcu bibendum at varius vel pharetra. Interdum varius sit amet mattis vulputate enim nulla aliquet. Ullamcorper sit amet risus nullam eget felis eget nunc. Velit scelerisque in dictum non consectetur a erat nam.</p>
            </div>

        </div>
    )
}