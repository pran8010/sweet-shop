import React from "react";
import Axios from "axios";
import Message from './customAlert';
import CartsCard from './cartsCard';
import CheckOut from "./checkOut";


class Cart extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            message: '',
            total: 0
        }
        this.cardGen = this.cardGen.bind(this)
        this.getTotal = this.getTotal.bind(this)
    }

    componentDidMount = ()=>{
        Axios({
            method: 'get',
            url: '/api/users/cart'
        }).then((res)=>{
            if (res.data ==='Error') return this.setState({ message: res.data })
            console.log(res.data)
            this.setState({
                cart: res.data
            })
        })
    }

    getTotal = ()=>{
        Axios({
            method: 'get',
            url: '/api/users/totalRate'
        })
    }

    cardGen = ()=>{
        var list = this.state.cart.map((item)=>{
            
            return(
                <div key={item.prod_id}>
                <CartsCard ID={item.prod_id} cosQty={item.quantity} totGen={this.totGen} /> 
            </div>
            )
        })
        return (list)
    }

    deleteCard = (items)=>{
        this.setState({
            cart: items
        })
    }

    totGen = (rate,qty)=>{
        console.log(rate,qty)
        this.setState(prevState=>({
            total: prevState.total + parseFloat(rate)*parseFloat(qty)
        }))
    }

    render(){
        let { message,total,cart } = this.state
        return(
            <div>
                <h1>Your Cart</h1>
                { message ? <Message msg={message} /> : null}
                <div className = 'row p-4'>
                    <div className='col-md-8 d-flex flex-wrap'>
                        {this.cardGen()}
                    </div>
                    <div className='col-md-4 p-2 bg-light'>
                        <button className='btn btn-success w-100 mb-3' data-toggle="modal" data-target="#checkOut" >Proceed to Checkout</button>
                        <hr></hr>
                        <div>
                            <span><strong>TOTAL AMT: </strong>₹{total}</span>
                        </div>
                        <div class="modal fade" id="checkOut" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <CheckOut cart={cart} total={total} />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Cart