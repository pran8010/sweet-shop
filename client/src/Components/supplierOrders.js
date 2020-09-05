import React, { useState, useEffect } from 'react'
import Axios from 'axios'


const OrderCard = ({props})=>{
    return(
        <div class="card" style="width: 18rem;">
            <div class="card-header">
                {props.product}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{props.quantity}</li>
                <li class="list-group-item">{props.status}</li>
            </ul>
        </div>
    )
}



const SupplierOrder = ()=>{

    let [ products, setProducts ] = useState([])

    useEffect(()=>{
        Axios({
            method: 'get',
            url: `/api/admin/SupplierOrders`
        }).then((res)=>{
            setProducts(res.data)
        })
    },[])

    const cardGen = ()=>{
        let list = products.map((item)=>{
            return(
                <div key={item._id}>
                    <OrderCard props={item} />
                </div>
            )
        })
    }

    return(
        <div>
            {cardGen()}
        </div>
    )
}

export default SupplierOrder