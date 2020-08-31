import React from 'react'
import AddressHandle from './addressHandle';
import Confirmation from './confirmation';

class CheckOut extends React.Component{
    constructor() {
        super()
        this.state = {
            page: 1
        }
        this.tabHandler = this.tabHandler.bind(this)
        this.setTab = this.setTab.bind(this)
    }

    setTab = (num) =>{
        this.setState({
            page: num
        })
    }

    tabHandler = ()=>{
        let {page} = this.state
        if (page === 1) return(< AddressHandle key='1' setTab = {this.setTab}/>)
        else if (page === 2) return(< Confirmation key='2' cart={this.props.cart} total={this.props.total} setTab = {this.setTab} />)
        return ('Error')
    }

    render(){
        return(
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl modal-fullscreen-lg-down ">
                <div className="modal-content" style={{height: "90vh"}}>
                    {this.tabHandler()}
                </div>
            </div>
        )
    }
}

export default CheckOut;