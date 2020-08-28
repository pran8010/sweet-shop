import React from 'react'
import Axios from 'axios'
import Progress from './ProgressBar'
import Message from './customAlert'


class AddItems extends React.Component{
    constructor(){
        super()
        this.state = {
            name: '',
            description: '',
            quantity: '',
            rate: '',
            image: '',
            branch: '',
            message: '',
            UpPercent: 0,
            updateOrNot: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange = (e)=>{
        if (e.target.name === 'image'){
            this.setState({image: e.target.files[0]})
        }
        else if(e.target.name === 'updateOrNot'){
            if (!this.state.updateOrNot) this.props.addToast('Update item {Name & Branch} fields required', {appearance: 'info', autoDismiss: true})

            else this.props.addToast('Add a new item all fields required', {appearance: 'info', autoDismiss: true})
            this.setState(prevState => ({updateOrNot : !prevState.updateOrNot}))
        }
        else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        const {name,description,quantity,rate,image,branch,updateOrNot} = this.state
        e.preventDefault();
        var form = new FormData()
        form.append('name',name);
        (description!=='')&&form.append('description',description);
        (quantity!=='')&&form.append('quantity',parseFloat(quantity));
        (rate!=='')&&form.append('rate',rate);
        (image!=='')&&form.append('image',image);
        (branch!=='')&&form.append('branch',branch);
        
        // console.log(form)
        if (updateOrNot === true){
            Axios.post('/admin/api/addItems', form, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                },
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        UpPercent: parseInt(Math.round((ProgressEvent.loaded*100 / ProgressEvent.total)))
                    })
                }
            }).then((res)=>{
                this.props.addToast('Add Item successfull', {appearance: 'success', autoDismiss: true})
                this.setState({
                    message: res.data
                })
               }).catch(err=> console.log(err))
        }
        else{
            Axios.post('/admin/api/updateItems', form, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                },
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        UpPercent: parseInt(Math.round((ProgressEvent.loaded*100 / ProgressEvent.total)))
                    })
                }
            }).then((res)=>{
                if(res.data === 'Sweet does not exist try unchecking update option') this.props.addToast(res.data, {appearance: 'error', autoDismiss: true})
                else this.props.addToast('Update successfull', {appearance: 'success', autoDismiss: true})
                this.setState({
                    message: res.data
                })
               }).catch(err=> console.log(err))
        }

    }


    render(){
        var {updateOrNot, UpPercent, message} = this.state
        return(
            <h1>Admin Page</h1>,
            <form className='col-sm-7 m-4' onSubmit={this.handleSubmit}>
                {message ? <Message msg={message} /> : null}
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name of Sweet</label>
                    <input type="name" className="form-control" id="Name" name ='name' placeholder='Sweet name' aria-describedby="NameHelp" required onChange={this.handleChange} />
                    <div id="NameHelp" className="form-text">Please enter the name of the sweet.</div>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" name='updateOrNot' type="checkbox" value="" id="checker" onChange={this.handleChange} />
                    <label className="form-check-label" htmlFor="checker">
                        is this an update?
                    </label>
                </div>
                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <textarea className="form-control" id="Description" name ='description' placeholder='Describe the sweet' required={updateOrNot} onChange={this.handleChange} />
                </div>
                <div className='mb-3'>
                    <div className="input-group">
                        <span className="input-group-text" >Quantity</span>
                        <input type="number" step='0.1' min='0' id="Quantity" name ='quantity' className="form-control" placeholder=' XXX KGs..' aria-label="Quantity" aria-describedby="QuantityHelp" required={updateOrNot} onChange={this.handleChange} />
                    </div>
                    <div id="QuantityHelp" className="form-text">Please enter dispatch Quantiy of sweet (in kgs..).</div>
                </div>
                <div className='mb-3'>
                    <div className="input-group">
                        <span className="input-group-text">Rate</span>
                        <span className="input-group-text">₹</span>
                        <input type="number" step='0.5' min='0' className="form-control" name='rate' placeholder='₹ XXX  per kg' aria-label="Rate" aria-describedby="RateHelp" required={updateOrNot} onChange={this.handleChange} />
                    </div>
                    <div id="RateHelp" className="form-text"> Please enter Rate of sweet ( per kg ) .</div>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Upload</span>
                    <div className="form-file">
                        <input type="file" className="form-file-input" name='image' id="Image" aria-describedby="inputGroupFileAddon01" required={updateOrNot} onChange={this.handleChange} />
                        <label className="form-file-label" htmlFor="Image">
                            <span className="form-file-text">Choose an Image...</span>
                            <span className="form-file-button">Browse</span>
                        </label>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <label className ="input-group-text" htmlFor="Branch">Branch</label>
                    <select className="form-select" name = 'branch' id="Branch" required onChange={this.handleChange} >
                        <option disabled selected>Choose the Branch...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <Progress percentage={UpPercent} />

                <input className = 'btn btn-success' type='submit' value='Save' />
            </form>
        )
    }
}

export default AddItems;