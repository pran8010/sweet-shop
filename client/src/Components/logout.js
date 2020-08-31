import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import { useToasts } from 'react-toast-notifications'

const Logout = ({logFn})=>{

    const [ logStat, setLogStat ] = useState(true)
    const { addToast } = useToasts()

    useEffect(()=>{
        let source = Axios.CancelToken.source();
        const loadData = ()=>{
            Axios({
                method: 'get',
                url: '/api/logout',
                cancelToken: source.token
            }).then((res)=>{
                if (res.data==='out') {
                    addToast('You have Logged Out', {appearance: 'warning', autoDismiss: true})
                    setLogStat(false)
                    logFn()
                }
            }).catch(err=>{
                if (Axios.isCancel(err)) {
                    console.log(`call for logout was cancelled`);
                  } else {
                    throw err;
                  }
            })    
        }

        loadData()
        return () => {
            // Let's cancel the request on effect cleanup
            source.cancel();
          };

    },[logFn])

    if (logStat) return (
        <div className='d-flex align-items-center justify items-center flex-column m-5 p-5'>
            <h1 className='text-center'>..... Logging Out .....</h1>
            <div className=" spinner-border " style={{"width": "7rem", height: "7rem", "marginTop": '5rem', margin: 'auto', "fontSize": "xx-large", color: "red"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
    else return (
        <div>
            <Redirect to='/home' />
        </div>
    )
}

export default Logout