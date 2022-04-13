import './App.css';
import News from './components/News'

/////Class based component
import React, { useState} from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
// import LoadingBar from 'react-top-loading-bar'


export default function App () {
  const pageSize=6;
  const apikey= process.env.REACT_APP_NEWS_API                  //// we have setted the api key as an environment variable in .env.local which will not be pushed in git due to gitignore
  // const [Progress, setProgress] = useState(0);

                                                            
    return (
      <div>
        <Router>
        {/* <LoadingBar
        color='#f11946'
        progress={Progress}
        height={4}
        /> */}
        <Navbar/>
        <Routes>
          <Route exact path="/"  element={<News  apikey={apikey} key="general"  pageSize={pageSize} country="in" category="general"/>}></Route>
          <Route exact path="/business"  element={<News  apikey={apikey} key='business'  pageSize={pageSize} country="in" category="business"/>}></Route>
          <Route exact path="/entertainment"  element={<News  apikey={apikey} key='entertainment'  pageSize={pageSize} country="in" category="entertainment"/>}></Route>
          <Route exact path="/health" element={<News  apikey={apikey} key='health'  pageSize={pageSize} country="in" category="health"/>}></Route>
          <Route exact path="/science"  element={<News  apikey={apikey} key='science'  pageSize={pageSize} country="in" category="science"/>}></Route>
          <Route exact path="/technology"  element={<News  apikey={apikey} key='technology'  pageSize={pageSize} country="in" category="technology"/>}></Route>          
          <Route exact path="/sports"  element={<News  apikey={apikey} key='sports'  pageSize={pageSize} country="in" category="sports"/>}></Route>
        </Routes>
        </Router>

      </div>
    )
  
}

