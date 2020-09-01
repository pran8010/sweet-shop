import React from 'react'
import './css/footer.css'
import { Link } from 'react-router-dom'
function Footer(){
    return(
        <footer>
            <div className='row'>
                <div className='col-sm-7 p-4'>
                    <Link to='/admin'><button className='btn btn-warning'>Admin</button></Link>
                </div>
                <div className='col-sm-5 p-4'>
                    Created By: PRAN
                    <br></br>
                    github <br></br>
                    mail<br></br>
                    contact
                </div>
            </div>
        </footer>
    )
}

export default Footer