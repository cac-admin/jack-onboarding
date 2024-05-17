import React from 'react';
import axios from 'axios';

export default class DisplayReviews extends React.Component{

  state = {
    courses: [],
    allCourses: [],
    curCourse: '',
    reviews : [],
    allReviews: [],
    header: '',
    body: '',
    clicked: false,
    filterLevel: 0,
    filterCode: '',
    dropdowns: [],
    avgDiff: 0,
    avgScore: 0,
    curSearch: '',
    sortBy: '',
  };

  filterCourses = (course) => {
    return((this.state.filterLevel === 0 || (course.CourseLevel > this.state.filterLevel - 1 && course.CourseLevel < this.state.filterLevel + 100)) && (this.state.filterCode === '' || course.CourseProgram === this.state.filterCode));
  }


  changeDisplay (code, title, desc){
    var totalScore = 0;
    var totalDiff = 0;
    var  count = 0;
    const clicked = true;
    this.setState({curCourse: code});
    this.setState({ clicked });
    const header = code + ": " +title;
    this.setState({ header });
    const body = desc;
    this.setState({ body });
    this.setState({reviews : this.state.allReviews.map(
      review => {
        if (review.ReviewCourse === code) {
          totalDiff += review.ReviewDifficulty;
          totalScore += review.ReviewScore;
          count += 1;
          return ((<div><p align='center'>{review.ReviewContent}</p><p align='center'>Difficulty rating: {review.ReviewDifficulty} /5, Overall rating: {review.ReviewScore} /5.</p><p align='center'>Review left by: {review.ReviewAuthor} on {review.ReviewDate}</p><br/></div>))
        }
      }  
    )});
    this.setState({avgDiff : Math.round((totalDiff/count)*10)/10});
    this.setState({avgScore : Math.round((totalScore/count)*10)/10});
  }

  componentDidMount(){
    axios.get('http://localhost:8000/api/courses')
      .then(res => {
        const courses = res.data;
        var codes = []
        this.setState({ courses });
        this.setState({allCourses : courses})
        courses.map(course => {
          var exists = codes.includes(course.CourseProgram);
          if (!exists) {
            codes.push(course.CourseProgram);
          }
        })
        const temp = codes.map(code => {
          return (<option key={code} onClick={() => this.setState({ filterCode : code})}>{code}</option>)
        })
        this.setState({dropdowns : temp})
      });
    axios.get('http://localhost:8000/api/reviews')
      .then(res => {
        const temp = res.data;
        this.setState({ allReviews : temp });
      });
  }

  showReviewsHeader(){
    if (this.state.clicked){
      return (<div>
                <p align='center'>Average Difficulty: {this.state.avgDiff}/5 Average score: {this.state.avgScore}/5</p>
                <h3 align='center'>Reviews</h3>

                <div className='sort-by' align="center">
                  <select className='filter-courses'>
                    <option key="404" onClick={() => this.setState({ sortBy : ''})}>Sort by</option>
                    <option key="100" onClick={() => this.setState({ sortBy : 'ReviewDate'})}>Date written</option>
                    <option key="200" onClick={() => this.setState({ sortBy : 'ReviewScore'})}>Overall Score</option>
                    <option key="300" onClick={() => this.setState({ sortBy : 'ReviewDifficulty'})}>Difficulty Score</option>
                  </select>

                  <select name="sort-order">
                    <option key="404" onClick={() => this.setState({ order : 'desc'})}>Ascending or descending order?</option>
                    <option key="100" onClick={() => this.setState({ order : 'asc'})}>Ascending</option>
                    <option key="200" onClick={() => this.setState({ order : 'desc'})}>Descending</option>
                  </select>
                  <input type="submit" value="Sort" onClick={() => this.sortReviews()}/>
                </div>

              </div>)
    }
  }

  compare = (a, b) => {
    var thing = 1
    if (this.state.order === 'desc') {
      thing = -1
    }
    if (a.sortParam < b.sortParam){
      return (-1 * thing)
    }
    else if (a.sortParam > b.sortParam){
      return (1 * thing)
    }
    else{
      return 0;
    }
  }

  sortReviews = () => {
    if (this.state.sortBy !== ''){
      var temp = [];
      this.state.allReviews.map(review => {
        if (review.ReviewCourse === this.state.curCourse) {
          if (this.state.sortBy === 'ReviewDate'){
            temp.push({id: review.ReviewID, sortParam: review.ReviewDate, diff: review.ReviewDifficulty, score: review.ReviewScore, content: review.ReviewContent, author: review.ReviewAuthor, date: review.ReviewDate});
          }
          else if (this.state.sortBy === 'ReviewScore'){
            temp.push({id: review.ReviewID, sortParam: review.ReviewScore, diff: review.ReviewDifficulty, score: review.ReviewScore, content: review.ReviewContent, author: review.ReviewAuthor, date: review.ReviewDate});
          }
          else {
            temp.push({id: review.ReviewID, sortParam: review.ReviewDifficulty, diff: review.ReviewDifficulty, score: review.ReviewScore, content: review.ReviewContent, author: review.ReviewAuthor, date: review.ReviewDate});
          }
        }
      })
      temp.sort(this.compare)
      this.setState({reviews : temp.map(
        review => {
          return ((<div><p align='center'>{review.content}</p><p align='center'>Difficulty rating: {review.diff} /5, Overall rating: {review.score} /5.</p><p align='center'>Review left by: {review.author} on {review.date}</p><br/></div>))
        }
      )});
    }
    else {
      alert("Please input the parameter to sort by.")
    }
  }


  searchCourses = (course) => {
    const reg = new RegExp(this.state.curSearch)
    return (reg.test(course.CourseCode));
  }

  render(){
      return(
      <div className="wrapper-main">
        <div className='topnav'>
          <a href="/writereview">Write a Review</a>
          <a class="active" href="#reviews">Read Reviews</a>
          <a href="/profile">Profile</a>
          <a href="/login">Login/Signup</a>
          <a href="/">Home</a>
        </div>
        <h1 className="header-home">Read Reviews!</h1>
        <p className='paragraph-home'>Welcome to the reviews section of rate that course! Click any of the below courses in order to see how students feel about it.</p>
        <p className='paragraph-home'>Select filters and click the button below to filter the shown courses.</p>

        <div className='filter-courses' align="center">
          <select className='filter-courses'>
            <option key="404" onClick={() => this.setState({ filterLevel : 0})}>Course Level</option>
            <option key="100" onClick={() => this.setState({ filterLevel : 100})}>100</option>
            <option key="200" onClick={() => this.setState({ filterLevel : 200})}>200</option>
            <option key="300" onClick={() => this.setState({ filterLevel : 300})}>300</option>
            <option key="400" onClick={() => this.setState({ filterLevel : 400})}>400</option>
            <option key="500" onClick={() => this.setState({ filterLevel : 500})}>500</option>
          </select>

          <select name="course">
            <option key="404" onClick={() => this.setState({ filterCode : ''})}>Course Program</option>
            {this.state.dropdowns}
          </select>
          <input type="submit" value="Filter" onClick={() => this.setState({courses : this.state.allCourses.filter(this.filterCourses)})}/>
        </div>
        <br/>

        <div align='center'>
          <input type='text' value={this.state.curSearch} onChange={x => this.setState({curSearch : x.target.value.toUpperCase()})} name='search'/>
          <input type='submit' name='search' className="oxy-search-form" onClick={() => this.setState({courses : this.state.allCourses.filter(this.searchCourses)})}/>
        </div>
        <br/>
        <div align="center">
        {this.state.courses.map(course => (
          <button key={course.CourseID} type="button" onClick={() => this.changeDisplay(course.CourseCode, course.courseTitle, course.CourseDesc)} >{course.CourseCode}</button>
        ))}
        </div>
        <br/><br/>
        <h3 align="center">
          {this.state.header}
        </h3>
        <p align='center'>
          {this.state.body}
        </p>
        {this.showReviewsHeader()}
        {this.state.reviews}
      </div>  
    );
  }
}