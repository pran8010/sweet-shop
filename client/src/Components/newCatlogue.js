import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Card from './newCatCard'
import { Link } from 'react-router-dom'

const Catalogue = ()=>{
    const [sweetList, setSweetList] = useState([])
    const [hotList, setHotList] = useState([])
    const [nutsList, setNutsList] = useState([])
    const [bakeryList, setBakeryList] = useState([])
    const [eggsList, setEggsList] = useState([])

    useEffect(()=>{
        Axios({
            method: 'get',
            url: '/api/display/Sweet'
        }).then((res)=>{
            setSweetList(res.data)
        })
        Axios({
            method: 'get',
            url: '/api/display/Hot'
        }).then((res)=>{
            setHotList(res.data)
        })
        Axios({
            method: 'get',
            url: '/api/display/Nuts'
        }).then((res)=>{
            setNutsList(res.data)
        })
        Axios({
            method: 'get',
            url: '/api/display/Bakery'
        }).then((res)=>{
            setBakeryList(res.data)
        })
        Axios({
            method: 'get',
            url: '/api/display/Eggs'
        }).then((res)=>{
            setEggsList(res.data)
        })
    },[])

    const cardGen = (products)=>{
        var list = products.map((item)=>(
            <div  className='ml-2' key={item._id} id={item._id}>
                <Card name = {item.name} prod_id = {item._id} rate = {item.rate} storeQty = {item.qty} /> 
            </div>
        ))

        return (list)
    }

    return(
        <>
            <div className='row p-2 m-2 bg-white rounded-lg align-items-center justify-content-center'>
                <div className='d-flex m-2'>
                    <h3>Sweets</h3>
                    <Link to='/catalogue/sweets' className='ml-auto'><button className='btn btn-primary btn-sm ml-auto'>Show more</button></Link>
                </div>
                <div className='d-flex justify-content-between overflow-auto'>
                    {cardGen(sweetList)}
                </div>
            </div>
            <div className='row p-2 m-2 bg-white rounded-lg align-items-center justify-content-center'>
                <div className='d-flex m-2'>
                    <h3>Hot</h3>
                    <Link to='/catalogue/hots' className='ml-auto'><button className='btn btn-primary btn-sm ml-auto'>Show more</button></Link>
                </div>
                <div className='d-flex justify-content-between'>
                    {cardGen(hotList)}
                </div>
            </div>
            <div className='row p-2 m-2 bg-white rounded-lg align-items-center justify-content-center'>
                <div className='d-flex m-2'>
                    <h3>Nuts</h3>
                    <Link to='/catalogue/nuts' className='ml-auto'><button className='btn btn-primary btn-sm ml-auto'>Show more</button></Link>
                </div>
                <div className='d-flex justify-content-between'>
                    {cardGen(nutsList)}
                </div>
            </div>
            <div className='row p-2 m-2 bg-white rounded-lg align-items-center justify-content-center'>
                <div className='d-flex m-2'>
                    <h3>Bakery</h3>
                    <Link to='/catalogue/bakery' className='ml-auto'><button className='btn btn-primary btn-sm ml-auto'>Show more</button></Link>
                </div>
                <div className='d-flex justify-content-between'>
                    {cardGen(bakeryList)}
                </div>
            </div>
            <div className='row p-2 m-2 bg-white rounded-lg align-items-center justify-content-center'>
                <div className='d-flex m-2'>
                    <h3>Eggs</h3>
                    <Link to='/catalogue/eggs' className='ml-auto'><button className='btn btn-primary btn-sm ml-auto'>Show more</button></Link>
                </div>
                <div className='d-flex justify-content-between'>
                    {cardGen(eggsList)}
                </div>
            </div> 
        </>
    )
}
export default Catalogue