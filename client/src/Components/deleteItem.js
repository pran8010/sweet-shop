import React, { useState } from 'react'
import Axios from 'axios'
import { useToasts } from 'react-toast-notifications'

const DeleteItems = ()=>{
    let { addToast } = useToasts()
    let [prod_id, setProd_id] = useState('')

    const handleDelete = (e)=>{
        e.preventDefault()
        if(prod_id) {
            Axios({
                method: 'get',
                url: `/api/admin/deleteProduct/${prod_id}`
            }).then((res)=>{
                if (res.data === 'Success'){
                    addToast('Deleted Item successfully', { appearance: 'warning', autoDismiss: true } )
                }
                else addToast(res.data, { appearance: 'warning', autoDismiss: true } )
            })
        }
        else return addToast('please enter product ID', { appearance: 'error', autoDismiss: true })
    }
    return(
        <div className='d-flex align-items-center justify-content-center'>
            <form className='bg-white p-4 rounded-lg m-5 text-center border border-danger'>
            <h4 className='mb-5'>Product ID of the Item</h4>
            <div className="input-group input-group btn-ouline-danger">
                <span className="input-group-text" id="delete">DELETE</span>
                <input type="text" className="form-control" placeholder='Enter ID of a product to delete' onChange={(e)=>setProd_id(e.target.value)} aria-label="delete item" aria-describedby="delete-item-from-DB" style={{width: '350px'}} />
            </div>
            <button onClick={handleDelete} className='btn btn-outline-danger btn-lg mt-3'>DELETE</button>
            </form>
        </div>
    )
}

export default DeleteItems