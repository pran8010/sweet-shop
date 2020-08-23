import React from 'react';

class Confirmation extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            // none
        }
        this.tabHandle = this.tabHandle.bind(this)
        this.tableGen = this.tableGen.bind(this)
    }
    tabHandle = ()=>{
        this.props.setTab(1)
    }

    tableGen = ()=>{
        var cart = this.props.cart
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

    render(){
        return(
            <div>
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Confirmation</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
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
                        {this.tableGen()}
                    </tbody>
                    </table>

                    <h4>Total: ₹{this.props.total}</h4>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={this.tabHandle} >Prev</button>
                    <button  className="btn btn-success ml-auto" >Pay</button>
                </div>
            </div>
        )
    }
}

export default Confirmation;