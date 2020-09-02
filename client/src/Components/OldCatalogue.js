import React from 'react';
import axios from "axios";
import Cards from './cards'


class CatalogueX extends React.Component{
    constructor(){
        super()
        this.state = {
            products: []
        }
        this.cardGen = this.cardGen.bind(this)
    }

    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();

    abortController = new AbortController();

    componentDidMount = ()=>{
        var self = this
        axios({
            method: 'get',
            url: `/api/catalogue/${this.props.type}`,
            cancelToken: this.source.token
            // headers: {"Access-Control-Allow-Origin": "*"}
          }).then((res)=>{
            console.log(res.data)
            self.setState({ products: res.data })
            console.log(self.state)
          })

    }
    componentWillUnmount = ()=>{
        this.source.cancel("Operation canceled by the user.");
    }

    cardGen = ()=>{
        var list = this.state.products.map((item)=>
            <div key={item._id} id={item._id}>
                <Cards name = {item.name} description = {item.description} rate = {item.rate} supplier={item.branch} ID={item._id} storeQty={item.quantity} addToast = {this.props.addToast} /> 
            </div>
        )
        return (list)
    }

    render(){
        return(
            <div>
                <h1>Our Catalogue</h1>
                <div id='cardsWrapper' className='d-flex flex-wrap justify-content-center align-items-center'>
                    {this.cardGen()}
                </div>
            </div>
        )
    }
}
export default CatalogueX