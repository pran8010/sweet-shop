import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Axios from 'axios'
import AddItems from './addItem'
import DeleteItems from './deleteItem'
import ToastEn from './toastEnabler'
import AddSupplier from './addSupplier'
import AddressSup from './supplierData'
import AddItemsX from './newAddItem'
import SupplierOrder from './supplierOrders'

const Admin = ()=>{

    let [adminStat, setAdminStat ] = useState(false)
    useEffect(()=>{
        Axios({
            method: 'get',
            url: '/api/admin/checkIfAdmin'
        }).then((res)=>{
            console.log(res.data)
            if (res.data === 'ADMIN'){
                setAdminStat('ADMIN')
            }
            else if (res.data === 'SUPPLIER'){
                setAdminStat('SUPPLIER')
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
    else if(adminStat === 'ADMIN') return(
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
                    { adminStat==='ADMIN'&&<Link to='/admin/addSupplier' ><button className='btn btn-warning'>Add Supplier</button></Link> }
                </div>
                <Route path='/admin/items' component={ToastEn(AddItems)} />
                <Route path='/admin/deleteItem' component={DeleteItems} />
                {adminStat==='ADMIN'&& <Route path='/admin/addSupplier' component={AddSupplier} />}
            </Router>
        </>
    )
    else return(
        <>
            
        <Router>
            <div className='text-center'>
                <h1>
                    We offer the following services.
                </h1>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <Link to='/admin/items'><button className='btn btn-success m-5 '>Catalogue Editor</button></Link>
                <Link to='/admin/deleteItem'><button className='btn btn-danger m-5'>Delete from Catalogue</button></Link>
                <Link to='/supplier/address'><button className='btn btn-warning m-5'>Update your Address</button></Link>
                <Link to='/admin/supplier/orders'><button className='btn btn-primary m-5'>View orders</button></Link>
            </div>
            <Route path='/admin/items' component={ToastEn(AddItemsX)} />
            <Route path='/admin/deleteItem' component={DeleteItems} />
            <Route path='/admin/supplier/orders' component={SupplierOrder} />
            {adminStat==='SUPPLIER'&&<Route path = '/supplier/address' component={AddressSup} />}
        </Router>
    </>
    )
}

export default Admin