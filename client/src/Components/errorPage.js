import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const ErrorPage = ()=>{
    const { addToast } = useToasts()
    useEffect(()=>{
        addToast('Error Loading URL',{appearance: 'info', autoDismiss: true})
    },[])
    return(
        <div className='d-flex vh-100 align-items-center justify-items-center flex-column btn-outline-danger'>
           <h2 className='mt-auto'>
                <strong>Error "404" : </strong>
                Your Requested URL does not Exist  !!
           <hr />
           <hr />
           </h2>
           <div className='mb-auto'>
                <Link to='/home'><button className='btn btn-info'>Return to Home Page</button></Link>
           </div>
        </div>
    )
}
export default ErrorPage