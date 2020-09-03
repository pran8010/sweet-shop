import React, { useState } from 'react'
import Axios from 'axios'
import { useToasts } from 'react-toast-notifications'

const AddSupplier = ()=>{
    let [ supplier, setSupplier ] = useState('')

    let { addToast } = useToasts()

    const handleADD = (e)=>{
        e.preventDefault()
        Axios({
            method: 'post',
            url: '/api/admin/addSupplier',
            data: {email : supplier}
        }).then((res)=>{
            if (res.data==='Success') addToast('SuccessFully added Supplier', {appearance: 'success', autoDismiss: true})
            else addToast(res.data, {appearance: 'error', autoDismiss: true})
        })
    }
    return(
        <div className='d-flex align-items-center justify-content-center mb-5'>
            <form className='bg-white p-4 rounded-lg m-1 text-center border border-warning col-md-5'>
            <h4 className='mb-5'>Email ID of Supplier</h4>
            <div className="input-group input-group btn-ouline-danger">
                <span className="input-group-text" id="delete">ADD Supplier to DB</span>
                <input type="text" className="form-control" placeholder='Enter email ID of supplier' onChange={(e)=>setSupplier(e.target.value)} aria-label="addSupplier" aria-describedby="add-supplier-to-DB"/>
            </div>
            <button onClick={handleADD} className='btn btn-outline-danger btn-lg mt-3'>Add Supplier</button>
            </form>
        </div>
    )
}

export default AddSupplier