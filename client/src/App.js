import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios' 
import NavBar from './Components/NavBar'
import Login from './Components/login'
import Home from './Components/home'
import { Catalogue } from "./Components/Catalogue";
import Footer from './Components/footer';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      tes: ''
    }
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
    // this.logCheck = this.logCheck(this)
  }

  // logCheck = ()=> {
  //   axios({
  //     method: 'get',
  //     url: '/api/checkAuth',
  //     // headers: {"Access-Control-Allow-Origin": "*"}
  //   }).then((res)=>{
  //     if (res.data === 'yes') this.handleLoggedIn()
  //     else return false
  //   })
  //   return true
  // }

    handleLoggedIn = ()=> {
    ReactDOM.render(
      <select className="form-select" aria-label="Default select example" onChange={this.handleChange}>
        <option selected>Account</option>
        <option value="1">Your Orders</option>
        <option value="2">Account</option>
        <option value="3">Sign Out</option>
      </select>,
      document.getElementById('logger')
    )
  }

    handleChange = (e)=>{
      let x = e.target.value
      if (x === '3'){
          axios({
              method: 'get',
              url: '/api/logout',
          }).then((res)=>{
            if (res.data==='out') window.location.replace('/home')
          })
      }
  }

  componentDidMount = async()=>{
    axios({
      method: 'get',
      url: '/api/checkAuth',
      // headers: {"Access-Control-Allow-Origin": "*"}
    }).then((res)=>{
      if (res.data === 'yes') this.handleLoggedIn()
      else return false
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route path ='/' exact component={Home} />
          <Route path ='/home' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/catalogue' component={Catalogue} />
          <Footer />
        </div>
      </Router>
    );
  
  }

}
export default App;
