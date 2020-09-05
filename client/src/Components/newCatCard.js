import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import Axios from 'axios'

const Card = ({name, rate, prod_id, storeQty,supplier})=>{

    let [ qtyUnit, setQtyUnit ] = useState('kg')
    let [ cartingStat, setCartingStat ] = useState(false)
    let [quantity, setQuantity ] = useState(0)

    const { addToast } = useToasts()

    const handleChange = (e)=>{
        if (e.target.value>storeQty) {
            setCartingStat(true)
            addToast('Item Out Of Stock or Quantiy is not available', {appearance: 'error', autoDismiss: true})
        }
        else {
            setCartingStat(false)
            setQuantity(parseFloat(e.target.value))
        }
    }

    const handleCarting = (e)=>{
        // console.log(this.state)
        if (quantity===0){
            addToast('Please set quantity', {appearance: 'error', autoDismiss: true})
        } else {
            Axios({
                method: "post",
                url: '/api/user/addCart',
                data: {
                    prod_id,
                    quantity,
                    supplier
                }
            }).then((res)=>{
                console.log(res)
                if (res.data ==='Not Logged In'){
                    addToast('Please login to add item to cart', {appearance: 'error', autoDismiss: true})
                }
                else if (res.data==='Success') {
                    // e.target.value = 'In Cart'
                    setCartingStat(true)
                    addToast('Added to Cart successfully', {appearance: 'success', autoDismiss: true})
                }
            })}
    }

    return(
        <div className="card align-items-center justify-content-center" style={{width: "15rem"}}>
            <img src={`/uploads/${name}.jpg`} className="card-img-top img-150" alt={`${name}`} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <div className="input-group input-group-sm mb-1">
                    <span className="input-group-text"><strong>Rate</strong></span>
                    <span className="input-group-text">₹</span>
                    <input type="text" aria-label="Rate" className="form-control bg-light" value={rate} readOnly />
                </div>
                <div className="input-group input-group-sm mb-1">
                    <label className="input-group-text" htmlFor="quantity"><strong>Quantity</strong></label>
                    <select className="form-select p-1" id="quantity" onChange={handleChange} disabled={cartingStat} >
                        <option disabled selected>Quantity</option>
                        <option value="0.25">{qtyUnit ==='kg' ? '0.25 kg': '250 gms'}</option>
                        <option value="0.50">{qtyUnit ==='kg' ? '0.50 kg': '500 gms'}</option>
                        <option value="0.75">{qtyUnit ==='kg' ? '0.75 kg': '750 gms'}</option>
                        <option value="1.00">{qtyUnit ==='kg' ? '1.00 kg': '1000 gms'}</option>
                        <option value="2.00">{qtyUnit ==='kg' ? '2.00 kg': '2000 gms'}</option>
                    </select>
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">{qtyUnit}</button>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <li><a className="dropdown-item"  disabled onClick={()=>setQtyUnit('kg')}>Kg</a></li>
                        <li><a className="dropdown-item"  disabled onClick={()=>setQtyUnit('gms')}>gms</a></li>
                    </ul>
                </div>
                <button className="btn btn-warning" onClick={handleCarting} disabled={cartingStat||(quantity>storeQty)}>Add to Cart <span>🛒</span></button>
            </div>
        </div>
    )
}

export default Card