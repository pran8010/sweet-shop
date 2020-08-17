import  React  from "react";
import Axios from "axios";
import Message from './customAlert';

// import PropTypes from 'prop-types';


class Cards extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            prod_id: this.props.ID,
            quantity: 0,
            message: '',
            cartingStat: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCarting = this.handleCarting.bind(this)
        
    }

    handleChange = (e)=>{
        this.setState({
            quantity: e.target.value
        })
    }

    handleCarting = (e)=>{
        let { prod_id,quantity } = this.state
        // console.log(this.state)
        if (quantity===0){
            this.setState({
                message: 'Please set quantity'
            })
        } else {
            Axios({
                method: "post",
                url: '/api/user/addCart',
                data: {
                    prod_id,
                    quantity
                }
            }).then((res)=>{
                console.log(res)
                if (res.data ==='Not Logged In'){
                    this.setState({
                        message: res.data
                    })
                }
                else if (res.data=='Success') {
                    // e.target.value = 'In Cart'
                    this.setState({
                        message: 'Added to Cart successfully',
                        cartingStat: true
                    })

                }
            })}
    }

    render(){
        let { message, cartingStat } = this.state
        return(
            <div className="card m-3" style={{width: "20.5rem"}}>
                { message ? <Message msg={message} /> : null}
                <img src={`/uploads/${this.props.name}.jpg`} className="card-img-top" alt={`${this.props.name}`} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.name}</h5>
                    <p className="card-text">
                        {this.props.description}
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="input-group">
                            <span className="input-group-text"><strong>Rate</strong></span>
                            <span className="input-group-text">₹</span>
                            <input type="text" aria-label="Rate" className="form-control bg-light" value={this.props.rate} readOnly />
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="input-group">
                            <label className="input-group-text" htmlFor="quantity"><strong>Quantity</strong></label>
                            <select className="form-select" id="quantity" onChange={this.handleChange} disabled={cartingStat} >
                                <option disabled selected>Choose quantity </option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <span className="input-group-text">₹</span>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="input-group">
                            <span className="input-group-text"><strong>Branch</strong></span>
                            <input type="text" aria-label="Branch" className="form-control bg-light" value={this.props.branch} readOnly />
                        </div>
                    </li>
                </ul>
                <div className="card-body">
                    <button className="btn btn-warning" onClick={this.handleCarting} disabled={cartingStat}>Add to Cart 🛒</button>
                    <button className="btn btn-primary ml-5">Wishlist</button>
                </div>
            </div>
        )
    }
};

// Cards.propTypes = {
//     name: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     rate: PropTypes.string.isRequired
//   };

export default Cards