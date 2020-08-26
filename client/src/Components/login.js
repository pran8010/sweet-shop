import React from 'react'
import axios from 'axios'
// import {Redirect} from 'react-router-dom'

class Login extends React.Component{
    constructor() {
        super()
        this.state = {
            emailLog: '',
            passwordLog: '',
            emailReg:'',
            passwordReg:'',
            logStat: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRegSubmit = this.handleRegSubmit.bind(this)
        
    }

    handleRegSubmit = (e) => {
        const {emailReg, passwordReg} = this.state
        console.log(this.state)

        e.preventDefault()
        axios({
            method: 'post',
            url: '/api/register',
            data: {
              email: emailReg,
              password: passwordReg
            }
            // headers: {"Access-Control-Allow-Origin": "*"}
          }).then((res)=>{
            console.log(res)
            if (res.data === 'user already registered') alert(res.data)
            else {
                alert('registered successfully')
                window.location.replace('/home')
                // this.setState({
                //     logStat: true
                // })
            }
        }).catch (err => console.log(err))
        
    }

    handleLogSubmit = (e)=>{
        const {emailLog, passwordLog} = this.state

        e.preventDefault()
        axios({
            method: 'post',
            url: '/api/login',
            data: {
                email: emailLog,
                password: passwordLog
            }
        }).then(res=>{
            if (res.data === 'success'){
                window.location.replace('/home')
                // this.setState({
                //     emailLog: '',
                //     passwordLog: '',
                //     logStat: true
                // })
            }
            else if (res.data === 'noUser'){
                alert('Your Credentials are either wrong or do not exist in our database!')
            }
        })
    }

    handleChange = (e) => {
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){

        // if (this.state.logStat) return <Redirect to='/home' />
        return(
            <div className='col-sm-8 m-4 p-4 bg-light rounded-lg'>
                <h2>LOGIN</h2>
                <form className='mb-5' onSubmit={this.handleLogSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                        <input type="email" className="form-control" name = 'emailLog' placeholder='Enter your email' id="exampleInputEmail2" aria-describedby="emailHelp" onChange = {this.handleChange} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword3" className="form-label">Password</label>
                        <input type="password" className="form-control" name = 'passwordLog' placeholder='Enter your password' id="exampleInputPassword3" onChange = {this.handleChange} required />
                    </div>
                    <input type="submit" className="btn btn-primary" value='Login' />
                </form>
                <hr className='my-4 mx-2'></hr>
                <h2 className='text-center m-2'>
                    Or <br/> Register Here
                </h2>
                <form onSubmit={this.handleRegSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name = 'emailReg' placeholder='Enter your email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange = {this.handleChange} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name = 'passwordReg' placeholder='Enter your password' id="exampleInputPassword1" onChange = {this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                        <input type="password" className="form-control" name = 'passwordReg2' id="exampleInputPassword2" placeholder='Confirm your password' onChange = {this.handleChange} required />
                    </div>
                    <span id='msg' style={{color: "red"}}></span>
                    <input type="submit" className="btn btn-outline-danger" value='Register' />
                </form>
            </div>
        )
    }
}

export default Login