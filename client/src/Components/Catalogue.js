import React from 'react';
import axios from "axios";
import Cards from './cards'


class Catalogue extends React.Component{
    constructor(){
        super()
        this.state = {
            products: []
        }
        this.cardGen = this.cardGen.bind(this)
    }

    componentDidMount = ()=>{
        var self = this
        axios({
            method: 'get',
            url: '/api/catalogue',
            // headers: {"Access-Control-Allow-Origin": "*"}
          }).then((res)=>{
            console.log(res.data)
            self.setState({ products: res.data })
            console.log(self.state)
          })

    }

    cardGen = ()=>{
        var list = this.state.products.map((item)=>
            <div key={item._id}>
                <Cards name = {item.name} description = {item.description} rate = {item.rate} branch={item.branch} ID={item._id} /> 
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
export default Catalogue