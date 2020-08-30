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
            cartingStat: false,
            qtyUnit: 'kg'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCarting = this.handleCarting.bind(this)
        
    }

    componentDidMount = ()=>{
        if (this.props.storeQty <= 0) {
            this.setState({
                cartingStat: true
            })
        }
        Axios({
            method: 'get',
            url: `/api/users/cartCheck/${this.state.prod_id}`
        }).then((res)=>{
            if (res.data === 'Found'){
                this.setState({
                    message: 'Already in Cart',
                    cartingStat: true
                })
            }
        })
    }

    handleChange = (e)=>{
        if (e.target.value>this.props.storeQty) {
            this.setState({
            message: 'Item Out Of Stock or Quantiy is not available',
            cartingStat: true
            })
            this.props.addToast('Item Out Of Stock or Quantiy is not available', {appearance: 'error', autoDismiss: true})
        }
        else this.setState({
            quantity: parseFloat(e.target.value),
            cartingStat: false,
            message: ''
        })
    }

    handleCarting = (e)=>{
        let { prod_id,quantity } = this.state
        // console.log(this.state)
        if (quantity===0){
            this.setState({
                message: 'Please set quantity'
            })
            this.props.addToast('Please set quantity', {appearance: 'error', autoDismiss: true})
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
                    this.props.addToast('Please login to add item to cart', {appearance: 'error', autoDismiss: true})
                }
                else if (res.data==='Success') {
                    // e.target.value = 'In Cart'
                    this.setState({
                        message: 'Added to Cart successfully',
                        cartingStat: true
                    })
                    this.props.addToast('Added to Cart successfully', {appearance: 'success', autoDismiss: true})
                }
            })}
    }

    render(){
        let { prod_id, message, cartingStat, quantity, qtyUnit } = this.state
        return(
            <div className="card m-3" style={{width: "20.5rem", borderColor: cartingStat ? "red": "green"}}>
                <div className="card-header">
                    <p className='text-center lh-lg font-weight-bold align-middle'><strong>ID:</strong>{prod_id}</p>
                </div>
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
                            <select className="form-select p-1" id="quantity" onChange={this.handleChange} disabled={cartingStat||quantity>this.props.storeQty} >
                                <option disabled selected>Pick a Quantity</option>
                                <option value="0.25">{qtyUnit ==='kg' ? '0.25 kg': '250 gms'}</option>
                                <option value="0.50">{qtyUnit ==='kg' ? '0.50 kg': '500 gms'}</option>
                                <option value="0.75">{qtyUnit ==='kg' ? '0.75 kg': '750 gms'}</option>
                                <option value="1.00">{qtyUnit ==='kg' ? '1.00 kg': '1000 gms'}</option>
                                <option value="2.00">{qtyUnit ==='kg' ? '2.00 kg': '2000 gms'}</option>
                            </select>
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">{qtyUnit}</button>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li><a class="dropdown-item"  disabled onClick={()=>this.setState({qtyUnit: 'kg'})}>Kg</a></li>
                                <li><a class="dropdown-item"  disabled onClick={()=>this.setState({qtyUnit: 'gms'})}>gms</a></li>
                            </ul>
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
                    <button className="btn btn-warning" onClick={this.handleCarting} disabled={cartingStat||(quantity>this.props.storeQty)}>Add to Cart 🛒</button>
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