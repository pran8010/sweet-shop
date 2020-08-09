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
        
    }

    handleSubmit = (e) => {
        const {email, password} = this.state

        e.preventDefault()
        axios.post('/api/register',{
            email: email,
            password: password
        }).then((res)=>{
            if (res.data -= 'user already registered') alert(res.data)
            else alert('registerd successfully')
        })
        
    }
    handleChange = (e) => {
        this.setState({
           email: e.target.email,
           password: e.target.password
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" name = 'email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange = {this.handleChange} />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" name = 'password' id="exampleInputPassword1" onChange = {this.handleChange} />
            </div>
            <input type="submit" class="btn btn-primary" value='Register' />
            </form>
        )
    }
}

export default Login