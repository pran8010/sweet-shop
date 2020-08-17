import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios' 
import NavBar from './Components/NavBar'
import Login from './Components/login'
import Home from './Components/home'
import Catalogue from "./Components/Catalogue";
import AddItems  from "./Components/addItem";
import Footer from './Components/footer';
import Message from './Components/customAlert';
import Cart from './Components/carts'

// import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      message: '',
      logStatus: false
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
        <option disabled selected>Account</option>
        <option value = 'cart'>Cart 🛒</option>
        <option value="1">Your Orders</option>
        <option value="2">Account</option>
        <option value="3">Sign Out</option>
      </select>,
      document.getElementById('logger')
    )
    this.setState({
      message: 'You are Logged in...',
      logStatus: true
    })
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
      else if (x === 'cart'){
          window.location.replace('/users/cart')
      }
  }

  componentDidMount = async()=>{
    axios({
      method: 'get',
      url: '/api/checkAuth',
      // headers: {"Access-Control-Allow-Origin": "*"}
    }).then((res)=>{
      if (res.data === 'yes') this.handleLoggedIn();
      else {
        this.setState({
          message: 'Please login to use Carts, wishlist etc.. features'
        })
      }
    })
  }

  render() {
    let { message, logStatus } = this.state
    return (
      <Router>
        <div className="App">
          <NavBar />
          {message ? <Message msg={message} /> : null}
          <Route path ='/' exact component={Home} />
          <Route path ='/home' component={Home} />
          { !logStatus ? <Route path='/login' component={Login} /> : null }
          <Route path='/catalogue' component={Catalogue} />
          <Route path='/admin/addItem' component={AddItems} />
          { logStatus ? <Route path='/users/cart' component={Cart} /> : null }
          <Footer />
        </div>
      </Router>
    );
  
  }

}
export default App;
