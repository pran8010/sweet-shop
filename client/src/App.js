import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Login from './Components/login'
import Home from './Components/home'
import Footer from './Components/footer';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      tes: ''
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route path ='/' exact component={Home} />
          <Route path ='/home' component={Home} />
          <Route path='/login' component={Login} />
          <Footer />
        </div>
      </Router>
    );
  
  }

}
export default App;
