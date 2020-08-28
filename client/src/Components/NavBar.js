import React from 'react'
import { Link } from 'react-router-dom'
import './css/NavBar.css'
// import Axios from 'axios'

function NavBar(props){
    // const handleChange = (e)=>{
    //     let x = e.target.value
    //     if (x === '3'){
    //         Axios({
    //             method: 'get',
    //             url: '/api/logout',
    //         })
    //     }//
    // }
    return(
        <nav className="navbar sticky-top navbar-expand-lg navbar-light " id = 'main'>
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    
                    <li className="nav-item">
                    <Link className="nav-link" to="/Catalogue">Catalogue</Link>
                    </li>

                </ul>
                
                { props.logger() }
                
                <form className="d-flex">
                    <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-danger" type="submit">Search</button>
                </form>
            </div>
        </div>
        </nav>
    )
}
export default NavBar