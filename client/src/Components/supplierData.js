import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useToasts } from 'react-toast-notifications'

const AddressSup = ()=>{
    let [ form, setForm ] = useState({
        name: '',
        phone: '',
        plotNo: '',
        street: '',
        area: '',
        addressO: '',
        landmark: '',
        city: '',
        state: '',
        country: '',
        pin: '',
        addCheck: false,
    })

    const { addToast } = useToasts()

    useEffect(()=>{
        Axios({
            method: 'get',
            url: '/api/supplier/address'
        }).then((res)=>{
            if(res.data==='Error') {
                addToast('Error', {appearance: 'error', autoDismiss: true})
            }
            else if(res.data==='no address'){
                addToast('Please fill out the address',{ appearance: 'info', autoDismiss: true })
            }
            else{
                console.log(res.data)
                var address = res.data
                setForm({
                    ...address,
                    addCheck: true
                })
            }
        })
    },[])

    const handleChange = (e)=>{
        if (e.target.id === 'addCheck'){
            setForm(prevState=>({
                ...form,
                addCheck: !prevState.addCheck
            }))
        }
        else{
            setForm({
                ...form,
                [e.target.id] : e.target.value  
            })
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        let {name, phone, plotNo, street, area, addressO, landmark, city, state, country, pin} = form
        Axios({
            method: 'post',
            url: '/api/supplier/address',
            data: {
                name, phone, plotNo, street, area, addressO, landmark, city, state, country, pin
            }
        }).then((res)=>{
            console.log(res.data)
            if (res.data==='Success'){
                setForm({
                addCheck: true,
                })
                addToast('Successfully updated your Address', {appearance: 'success', autoDismiss: true})
            }
        }).catch(err=>addToast(err, { appearance: 'error', autoDismiss: true }))
    }

    let { addCheck, name, phone, plotNo, street, area, addressO, landmark, city, state, country, pin } = form
    return(
        <div className='d-flex mb-5 p-4 justify-content-center'>
            <form className="row g-3 bg-white border border-primary rounded-lg col-md-6 justify-content-center" onSubmit={handleSubmit}>
                <h5>From</h5>
                <div className="col-md-12">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={handleChange} readOnly={addCheck} required={!addCheck} />
                </div>
                <div className="col-md-5">
                    <label htmlFor="phone" className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" id="phone" value={phone} onChange={handleChange} readOnly={addCheck} maxLength='13' minLength='10' required={!addCheck} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="plotNo" className="form-label">Plot No./ House No.</label>
                    <input type="text" className="form-control" id="plotNo" value={plotNo} placeholder='Plot No./ House No.' onChange={handleChange} readOnly={addCheck} required={!addCheck} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="street" className="form-label">Street/ Road name</label>
                    <input type="text" className="form-control" id="street" value={street} onChange={handleChange} readOnly={addCheck} required={!addCheck} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="area" className="form-label">Area</label>
                    <input type="text" className="form-control" id="area" value={area} onChange={handleChange} readOnly={addCheck} required={!addCheck} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="addressO" className="form-label">Address (Optional) </label>
                    <input type="text" className="form-control" id="addressO" value={addressO} onChange={handleChange} readOnly={addCheck} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="landmark" className="form-label">Landmark (Optional)</label>
                    <input type="text" className="form-control" id="landmark" value={landmark} onChange={handleChange} readOnly={addCheck} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="city" className="form-label">City/Town/Village</label>
                    <input type="text" className="form-control" id="city" value={city} onChange={handleChange} readOnly={addCheck} required={!addCheck} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input type="text" className="form-control" id="state" value={state} onChange={handleChange} readOnly={addCheck} required={!addCheck} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" className="form-control" id="country" value={country} onChange={handleChange} readOnly={addCheck} required={!addCheck} />
                </div>
                <div className="col-md-5">
                    <label htmlFor="pin" className="form-label">Pin</label>
                    <input type="text" className="form-control" id="pin" value={pin} onChange={handleChange} readOnly={addCheck} maxLength='6' minLength='5' required={!addCheck} />
                </div>
                <div className="col-12">
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="addCheck" onChange={handleChange} />
                    <label className="form-check-label" htmlFor="addCheck">
                        Edit this address
                    </label>
                    </div>
                </div>
                <div className="col-12 m-5">
                    <input className="btn btn-primary" type="submit" value='Save' />
                </div>
            </form>
        </div>
    )
}

export default AddressSup