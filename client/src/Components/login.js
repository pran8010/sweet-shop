import React from 'react'
import axios from 'axios'

class Login extends React.Component{
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            logStat: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    handleSubmit = (e) => {
        const {email, password} = this.state
        console.log(this.state)

        e.preventDefault()
        axios({
            method: 'post',
            url: '/api/register',
            data: {
              email: email,
              password: password
            }
            // headers: {"Access-Control-Allow-Origin": "*"}
          }).then((res)=>{
            console.log(res)
            if (res.data === 'user already registered') alert(res.data)
            else alert('registered successfully')
        }).catch (err => console.log(err))
        
    }
    handleChange = (e) => {
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name = 'email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange = {this.handleChange} required />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name = 'password' id="exampleInputPassword1" onChange = {this.handleChange} required />
            </div>
            <input type="submit" className="btn btn-primary" value='Register' />
            </form>
        )
    }
}

export default Login