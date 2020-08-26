import React from 'react';
import './css/addressHandle.css'
import Axios from 'axios';
import Message from './customAlert';
class AddressHandle extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
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
            message: '',
            next: false
        }
        this.tabHandle = this.tabHandle.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount = ()=>{
        Axios({
            method: 'get',
            url: '/api/users/address'
        }).then((res)=>{
            if(res.data==='Error') {
                this.setState({
                    message: 'Error'
                })

            }
            else if(res.data==='no address'){
                this.setState({
                    message: 'Please fill out the address'
                })
            }
            else{
                console.log(res.data)
                var address = res.data
                this.setState({
                    ...address,
                    addCheck: true,
                    next: true
                })
            }
        })
    }
    
    tabHandle = ()=>{
        this.props.setTab(2)
    }

    handleChange = (e)=>{
        if (e.target.id === 'addCheck'){
            this.setState(prevState=>({
                addCheck: !prevState.addCheck
            }))
            console.log(this.state.addCheck)
        }
        else{
            this.setState({
                [e.target.id] : e.target.value
            })
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        let {name, plotNo, street, area, addressO, landmark, city, state, country, pin} = this.state
        Axios({
            method: 'post',
            url: '/api/users/address',
            data: {
                name, plotNo, street, area, addressO, landmark, city, state, country, pin
            }
        }).then((res)=>{
            console.log(res.data)
            this.setState({
                message: res.data,
                addCheck: true,
                next: true
            })
        })
    }
        
    render(){
        let { addCheck, message, name, plotNo, street, area, addressO, landmark, city, state, country, pin, next } = this.state
        return(
                [
                <div className="modal-header pt-4">
                    <h4 className="modal-title" id="staticBackdropLabel">Your Address</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>,
                <div className="modal-body p-4">
                { message ? <Message msg={message} /> : null}
                    <form className="row g-3" onSubmit={this.handleSubmit}>
                        <h6>To</h6>
                        <div className="col-md-12">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" value={name} onChange={this.handleChange} readOnly={addCheck} required={!addCheck} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="plotNo" className="form-label">Plot No./ House No.</label>
                            <input type="text" className="form-control" id="plotNo" value={plotNo} placeholder='Plot No./ House No.' onChange={this.handleChange} readOnly={addCheck} required={!addCheck} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="street" className="form-label">Street/ Road name</label>
                            <input type="text" className="form-control" id="street" value={street} onChange={this.handleChange} readOnly={addCheck} required={!addCheck} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="area" className="form-label">Area</label>
                            <input type="text" className="form-control" id="area" value={area} onChange={this.handleChange} readOnly={addCheck} required={!addCheck} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="addressO" className="form-label">Address (Optional) </label>
                            <input type="text" className="form-control" id="addressO" value={addressO} onChange={this.handleChange} readOnly={addCheck} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="landmark" className="form-label">Landmark (Optional)</label>
                            <input type="text" className="form-control" id="landmark" value={landmark} onChange={this.handleChange} readOnly={addCheck} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="city" className="form-label">City/Town/Village</label>
                            <input type="text" className="form-control" id="city" value={city} onChange={this.handleChange} readOnly={addCheck} required={!addCheck} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="state" className="form-label">State</label>
                            <input type="text" className="form-control" id="state" value={state} onChange={this.handleChange} readOnly={addCheck} required={!addCheck} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="country" value={country} onChange={this.handleChange} readOnly={addCheck} required={!addCheck} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="pin" className="form-label">Pin</label>
                            <input type="number" className="form-control" id="pin" value={pin} onChange={this.handleChange} readOnly={addCheck} maxLength='6' minLength='6' required={!addCheck} />
                        </div>
                        <div className="col-12">
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="addCheck" onChange={this.handleChange} />
                            <label className="form-check-label" htmlFor="addCheck">
                                Edit this address
                            </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <input className="btn btn-primary" type="submit" value='Save' />
                        </div>
                    </form>
                </div>,
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                    <button className="btn btn-warning ml-auto" onClick={this.tabHandle} disabled={!next} >Next</button>
                </div>]
        )
    }
}

export default AddressHandle;