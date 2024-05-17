import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import Reviews from './Reviews';
import Login from './Login';
import WriteReview from './WriteReview';
import Admin from './adminpanel';
import Profile from './Profile';
import './index.css';

//import App from './App';
// import reportWebVitals from './reportWebVitals';



import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App(){
  return(
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home/>}/>
          <Route path='/reviews' element={<Reviews/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/writereview' element={<WriteReview/>}/>
          <Route path="/adminpanel" element={<Admin/>}/>
          <Route path ="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
  )
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // {/* </React.StrictMode> */}
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
