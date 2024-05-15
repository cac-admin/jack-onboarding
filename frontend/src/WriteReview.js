import React from 'react';
import axios from 'axios';
import './styles.css'
import Button from '@mui/material/Button';

export default class WriteReview extends React.Component{    

    state= {
        reviewContent: '',
        reviewScore: 5,
        reviewDiff: 5,
        reviewCourse: '',
        allCourses: []
    }

    componentDidMount(){
        axios.get('http://localhost:8000/api/courses')
          .then(res => {
            const allCourses = res.data;
            this.setState({ allCourses });
          });
      }

    handleSubmit(content, score, diff, course){
        const loggedIn = localStorage.getItem('curUser');
        console.log("go")
        if (diff > 5 || diff < 1 || score > 5 || score < 1){
            alert("Please input a number from 1-5.")
        }
        else if (course === ''){
            alert("Please select a course.")
        }
        else if (!loggedIn){
            alert("You must be logged in to leave reviews.")
        }
        else{
            console.log("hi")
            axios.post('http://localhost:8000/api/reviews/',{ReviewScore : score, ReviewDifficulty : diff, ReviewContent : content, ReviewCourse: course, ReviewAuthor : loggedIn})
            .then(function (response){alert(response)})
            .catch(function (error) {alert(error)})
        }
    }

    render(){
        return(
            <div className='wrapper-main'>
                <div className='topnav'>
                    <a class="active" href="#writereview">Write a Review</a>
                    <a href="/reviews">Read Reviews</a>
                    <a href="/login">Login/Signup</a>
                    <a href="/">Home</a>
                </div>
            <h3 className='header-login'>Write a review!</h3>
            <p className='paragraph-home'>Enter your review in the provided text boxes. Only logged in users can leave reviews.</p>
            <form className='write-review-form'>
            <label>
                Which course are you writing a review for?<br/>
                <select name="course">
                    <option key="404" onClick={() => this.setState({ reviewCourse : ''})}>Select a course</option>
                    {(this.state.allCourses.map(reviewCourse => (<option key={reviewCourse.CourseID} onClick={() => this.setState({ reviewCourse : reviewCourse.CourseCode })}>{reviewCourse.CourseCode}</option>)))}
                </select>
                <br/><br/>
                Description:
                <input type="text" name="desc" className='review-input' value={this.state.reviewContent} onChange={e => this.setState({reviewContent : e.target.value})} size="100"/> <br/><br/>
                In terms of difficulty, I give this course a
                <input type="number" value={this.state.reviewDiff} onChange={x => this.setState({reviewDiff : x.target.value})} name="diff" maxLength="1" size="2" min="1" max="5"></input> /5.<br/>
                Overall, I give this course a
                <input type="number" value={this.state.reviewScore} onChange={x => this.setState({reviewScore : x.target.value})} name="score" maxLength="1" size="2" min="1" max="5"></input> /5.
            </label> 
            <br/>
            <Button variant="contained" onClick={() => this.handleSubmit(this.state.reviewContent, this.state.reviewScore, this.state.reviewDiff, this.state.reviewCourse)}>Submit Review</Button> <br/>
            </form>
            </div>
        );
    }
}