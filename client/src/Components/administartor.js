import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Axios from 'axios'
import AddItems from './addItem'
import DeleteItems from './deleteItem'

const Admin = ()=>{

    let [adminStat, setAdminStat ] = useState(false)
    useEffect(()=>{
        Axios({
            method: 'get',
            url: '/api/admin/checkIfAdmin'
        }).then((res)=>{
            console.log(res.data)
            if (res.data === 'ADMIN'){
                setAdminStat(true)
            }
        })
    }, [])
  
    if (!adminStat) return(
        <div className='text-center'>
            <h1>
                Welcome to Admin page
            </h1>
            <h3>
                Checking if you have administrative privileges
            </h3>
            <div className=" spinner-border " style={{"width": "7rem", height: "7rem", "margin": '10vh', "fontSize": "xx-large", color: "red"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
    else return(
        <>
            
            <Router>
                <div className='text-center'>
                    <h1>
                        We offer the following services.
                    </h1>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <Link to='/admin/items'><button className='btn btn-success m-5 mr-auto'>Catalogue Editor</button></Link>
                    <Link to='/admin/deleteItem'><button className='btn btn-danger m-5'>Delete from Catalogue</button></Link>
                </div>
                <Route path='/admin/items' component={AddItems} />
                <Route path='/admin/deleteItem' component={DeleteItems} />
            </Router>
        </>
    )
}

export default Admin