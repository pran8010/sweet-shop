import React, { useState } from 'react';
import Axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import { Redirect, Link } from 'react-router-dom'

const Confirmation = (props)=>{
    const tabHandle = ()=>{
        props.setTab(1)
    }
    const { addToast } = useToasts()

    const tableGen = ()=>{
        var cart = props.cart
        console.log('try',cart)
        var list = cart.map((item)=>{
            return(
                <tr className='row'>
                    <td className='col-sm-3'>
                        {cart.indexOf(item)}
                    </td> 
                    <td className='col-sm-6'>
                        {item.prod_id}
                    </td>
                    <td className='col-sm-3'>
                        {item.quantity}
                    </td>
                </tr>
            )
        })
        return list
    }

    const [ redirect, setRedirect ] = useState(false)

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const handlePay = ()=>{
        Axios({
            method: 'get',
            url: '/api/users/orders'
        }).then(async(res)=>{
            const scriptO = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

            if (!scriptO) {
                addToast('Razorpay API failed to load. Are you online?', { appearance: 'error' })
                return
            }
            const options = {
                key: process.env.RAZOR_KEY_ID,
                currency: res.data.currency,
                amount: res.data.amount,
                order_id: res.data.id,
                name: 'Sweet Online Retail',
                description: `OrderID: ${res.data.receipt}`,
                image: '',
                handler: function (response) {
                    // alert(response.razorpay_payment_id)
                    // alert(response.razorpay_order_id)
                    // alert(response.razorpay_signature)
                    addToast(`PAYID : ${response.razorpay_payment_id}`, {appearance: 'info', autoDismiss: true})
                    addToast(`OrderID : ${response.razorpay_order_id}`, {appearance: 'info', autoDismiss: true})
                    window.location.replace('/home')
                },
                prefill: {
                    name: res.data.name,
                    email: res.data.email,
                    phone_number: res.data.phone
                }
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
            // console.log(res.data)
    
        })
    }

    return(
        [
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Confirmation</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>,
            <div className="modal-body p-4">
                <table class="table table-striped table-hover text-center">
                <thead>
                    <tr className='row'>
                        <td className='col-sm-3'>
                            #
                        </td>
                        <td className='col-sm-6'>
                            Product ID
                        </td>
                        <td className='col-sm-3'>
                            Quantity
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {tableGen()}
                </tbody>
                </table>

                <h4>Total: ₹{props.total}</h4>
            </div>,
            <div className="modal-footer">
                <button className="btn btn-primary" onClick={tabHandle} >Prev</button>
                <Link to='/home'><button  className="btn btn-success ml-auto" data-dismiss="modal" aria-label="Close" onClick={ handlePay } >Pay</button></Link>
            </div>
        ]
    )
}

export default Confirmation;