import React from 'react'
import Axios from 'axios'
import Cart from './carts'
import { Redirect } from 'react-router-dom'

class CartsCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.ID,
            name: '',
            rate: '',
            branch: '',
            cosQty: this.props.cosQty,
            storeQty: '',
            message: '',
            cartingStat: false
        }
    }

    componentDidMount = ()=>{
        let ID = this.state.id
        let cosQty = this.state.cosQty
        // console.log('id',ID)
        Axios({
            method: 'get',
            url: `/api/getSweet/${ID}`
        }).then((res)=>{
            console.log(res.data)
            let {rate,branch,quantity : storeQty, name} = res.data
            this.setState({
                rate,branch,storeQty,name
            })
            this.props.totGen(rate,cosQty)
        })
    }

    handleDel = (e)=>{
        let { rate, cosQty, id } = this.state
        Axios({
            method: 'get',
            url: `/api/users/removeCart/${id}`
        }).then((res)=>{
            if (res.data ==='Success'){
                this.setState({
                    cartingStat: true
                })
                this.props.totGen(`-${rate}`,cosQty)
                this.props.addToast('Deleted Item from cart', { appearance: 'info', autoDismiss: true })
            }
            else alert(res.data)
        })
    }

    render(){
        let { id, rate, branch, cosQty, message, storeQty, cartingStat, name} = this.state
        if (cartingStat) return null 
        return(
            <div className="card mb-3" style={{"maxWidth": "540px"}}>
            <div className="row g-0">
                <div className="col-md-4 p-2 text-center d-flex align-items-center" onClick={()=> window.location.replace(`/catalogue#${id}`)}>
                    <img src={`../uploads/${name}.jpg`} className = 'text-center'style={{"maxWidth": "185px", width: "100%"}}  alt={name} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                    </div>
                    <hr></hr>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                        <div className="input-group">
                            <span className="input-group-text"><strong>Rate</strong></span>
                            <span className="input-group-text">₹</span>
                            <input type="text" aria-label="Rate" className="form-control bg-light" value={rate} readOnly />
                        </div>
                        </li>
                        <li className="list-group-item">
                            <div className="input-group">
                                <span className="input-group-text" htmlFor="quantity"><strong>Quantity</strong></span>
                                <input type="text" aria-label="Quantity" className="form-control bg-light" value={cosQty}readOnly />
                                <span className="input-group-text">kg</span>
                            </div>
                        </li>
                        <li className="list-group-item">
                            {/* <div className="input-group">
                                <span className="input-group-text"><strong>Branch</strong></span>
                                <input type="text" aria-label="Branch" className="form-control bg-light" value={branch} readOnly />
                            </div> */}
                            <button className='btn btn-outline-danger btn' onClick={this.handleDel}>DELETE</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}

export default CartsCard