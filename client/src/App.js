import React from 'react';
// import ReactDOM from 'react-dom';
import { ToastProvider, useToasts } from "react-toast-notifications";

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import axios from 'axios' 
import NavBar from './Components/NavBar'
import Login from './Components/login'
import Home from './Components/home'
import Catalogue from "./Components/Catalogue";
import AddItems  from "./Components/addItem";
import Footer from './Components/footer';
import Message from './Components/customAlert';
import Cart from './Components/carts'
import Uorders from './Components/orders'

// import logo from './logo.svg';
import './App.css';
import Toast from './Components/toasts';
import ToastEn from './Components/toastEnabler';
import ErrorPage from './Components/errorPage';
import ScrollToTop from './Components/scrollToTop';
import Logout from './Components/logout';
import Admin from './Components/administartor';



// import { useToasts } from "react-toast-notifications"

class Toaster extends React.Component{
  componentDidMount(){
    this.props.addToast('this.props.props.content',{ appearance: 'error', autoDismiss:true} )
  }
  render(){
    return(<div>hi</div>)
  }
}

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      message: '',
      logStatus: false,
      page: ''
    }
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
    this.handleLoggedOut = this.handleLoggedOut.bind(this);
    this.navTemp = this.navTemp.bind(this)
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


    navTemp = ()=>{
      if (!this.state.logStatus){
        return (
          <div id='logger' className='mb-2 mr-2 mb-lg-0' data-toggle="collapse" data-target="#navbarTogglerDemo02">
            <Link to ='/login' ><button className='btn btn-outline-danger'>LOGIN/SIGNUP</button></Link>
        </div>
        )
      }
      else {
        return(
          <div id='logger' className='mb-2 mr-2 mb-lg-0'>
            {/* <select className="form-select" aria-label="Default select example" onChange={this.handleChange}>
              <option value ='' disabled selected>Account</option>
              <option value = '/users/cart'>Cart 🛒</option>
              <option value="/users/Uorders">Your Orders</option>
              <option value="/users/account">Account</option>
              <option value="3">Sign Out</option>
            </select> */}
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                User button
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><Link className="dropdown-item" to='/users/cart' >Cart <span>🛒</span></Link></li>
                <li><Link className="dropdown-item" to='/users/Uorders' >Your Orders </Link></li>
                <li><Link className="dropdown-item" to='/users/account' > Account Details</Link></li>
                <li><Link className="dropdown-item" to='/logout' > Logout </Link></li>
              </ul>
            </div>
          </div>
        )
      }
    }
    handleLoggedIn = ()=> {
    this.setState({
      message: 'You are Logged in...',
      logStatus: true
    })
  }
    handleLoggedOut = ()=>{
      this.setState({
        logStatus: false,
        message: 'Please login to use Carts, wishlist etc.. Features'
      })
    }

  //   handleChange = (e)=>{
  //     let x = e.target.value
  //     if (x === '3'){
  //         axios({
  //             method: 'get',
  //             url: '/api/logout',
  //         }).then((res)=>{
  //           if (res.data==='out') {
  //             this.setState({
  //               logStatus: false,
  //               message: 'Please login to use Carts, wishlist etc.. Features',
  //               page: '/home'
  //             })
  //           }
  //         })
  //     }
  //     else {
  //       this.setState({
  //         page: x
  //       })
  //       // window.location.replace(x)
  //       e.target.value = ''
  //     }
  // }

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
    let { message, logStatus, page } = this.state
    // const redirection = ()=>{
    //   if (page){
    //     let temp = page
    //     this.setState({
    //       page: ''
    //     })
    //   if (temp==='/home')return ([
    //       <Toast />,
    //       <Redirect to= {temp} />
    //     ])
    //   else return (<Redirect to={temp} />)
    //   }
    // }
    return (
      <Router>
        <ScrollToTop />
          <div className="App vw-100">
          { logStatus ? <NavBar logger = {this.navTemp} />: <NavBar logger = {this.navTemp} /> }
          {message ? <Message msg={message} /> : null}
          <ToastProvider >

            {/* {
              redirection()
            } */}

          {/* <ToastEn>
            {content, appearance => } */}
            <Switch>
              <Route path ='/' exact component={Home} />
              <Route path ='/home' component={Home} />
              {logStatus?<Route path='/logout' component={()=><Logout logFn={this.handleLoggedOut} />} />:<Route path='/logout' component={Home} />}
              { !logStatus ? <Route path='/login' component={ToastEn(Login, {logFn: this.handleLoggedIn})} /> : null }
              <Route path='/catalogue' component={ToastEn(Catalogue)} />
              <Route path='/admin' component={ToastEn(Admin)} />
              { logStatus ? <Route path='/users/cart' component={ToastEn(Cart)} /> : null }
              { logStatus ? <Route path='/users/Uorders' component={ToastEn(Uorders)} /> : null }
              <Route component={ErrorPage} />
            </Switch>
          {/* </ToastEn> */}
          </ToastProvider>
          <Footer />
        </div>
      </Router>
    );
  
  }

}
export default App;
