import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import { useToasts } from 'react-toast-notifications'

const Logout = ({logFn})=>{

    const [ logStat, setLogStat ] = useState('')
    const { addToast } = useToasts()

    useEffect(()=>{
        Axios({
            method: 'get',
            url: '/api/logout',
        }).then((res)=>{
            if (res.data==='out') {
                logFn()
                setLogStat(false)
                addToast('You have Logged Out', {appearance: 'warning', autoDismiss: true})
            }
        })
    },[logStat, logFn])
    return (
        <div>
            {!logStat ? <Redirect to='/home' /> : null}
            loggin out.....
        </div>
    )
}

export default Logout