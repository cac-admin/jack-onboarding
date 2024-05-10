import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            axios.post('http://localhost:8000/api/reviews/',{ReviewScore : score, ReviewDifficulty : diff, ReviewContent : content, ReviewCourse: course, ReviewAuthor : loggedIn})
            .then(function (response){alert(response)})
            .catch(function (error) {alert(error)})
        }
    }

    render(){
        return(
            <div> 
            <h3>Write a review!</h3>
            <p>Enter your review in the provided text boxes. Only logged in users can leave reviews.</p>
            <form>
            <label>
                Which course are you writing a review for?
                <select name="course">
                    <option key="404" onClick={() => this.setState({ reviewCourse : ''})}>Select a course</option>
                    {(this.state.allCourses.map(reviewCourse => (<option key={reviewCourse.CourseID} onClick={() => this.setState({ reviewCourse : reviewCourse.CourseCode })}>{reviewCourse.CourseCode}</option>)))}
                </select>
                <br/>
                Description:
                <input type="text" name="desc" value={this.state.reviewContent} onChange={e => this.setState({reviewContent : e.target.value})} size="100"/> <br/>
                In terms of difficulty, I give this course a
                <input type="number" value={this.state.reviewDiff} onChange={x => this.setState({reviewDiff : x.target.value})} name="diff" maxLength="1" size="2" min="1" max="5"></input> /5.<br/>
                Overall, I give this course a
                <input type="number" value={this.state.reviewScore} onChange={x => this.setState({reviewScore : x.target.value})} name="score" maxLength="1" size="2" min="1" max="5"></input> /5.
            </label> 
            <br/>
            </form>

            <input type="submit" value="Leave Review" onClick={() => this.handleSubmit(this.state.reviewContent, this.state.reviewScore, this.state.reviewDiff, this.state.reviewCourse)}/><br/>
            <Link to="/">Return to the home page</Link>
            </div>
        );
    }
}




// import React, { useState } from 'react';
// import axios from 'axios';

// export default function WriteReview() {  
   
//     const [reviewContent, setContent] = useState('');
//     const [reviewScore, setScore] = useState();
//     const [reviewDiff, setDiff] = useState();
//     const [reviewCourse, setCourse] = useState('');
//     const [allCourses, setCourses] = useState([]);

// //courses.map(courses => (<option key={courses.CourseID} onClick={() => setCourse(courses.CourseCode)}>{courses.CourseCode}</option>))


//     return(
//         <div> 
//             <h3>Write a review!</h3>
//             <p>Enter your review in the provided text boxes</p>
//             <form>
//             <label>
//                 Which course are you writing a review for?
//                 <select name="course">
//                     {axios.get('http://localhost:8000/api/courses')
//                     .then(res =>{setCourses(res.data)}, (allCourses.map(x => (<option key={x.CourseID} onClick={() => setCourse(x.CourseCode)}>{x.CourseCode}</option>))))}
//                 </select>
//                 <br/>
//                 Description:
//                 <input type="text" name="desc" value={reviewContent} onChange={x => setContent(x.target.value)} size="100"/><br/>
//                 In terms of difficulty, I give this course a
//                 <input type="number" value={reviewDiff} onChange={x => setDiff(x.target.value)} name="diff" maxLength="1" size="2" min="1" max="5"></input> /5.<br/>
//                 Overall, I give this course a
//                 <input type="number" value={reviewScore} onChange={x => setScore(x.target.value)} name="score" maxLength="1" size="2" min="1" max="5"></input> /5.
//             </label>
//             <br/>
//             <br/>
//             </form>

//             <input type="submit" value="write" onClick={() => console.log(reviewContent, reviewScore, reviewDiff, reviewCourse)}/>
//         </div>
//     )
// }

// gonna have to use useEffect()?