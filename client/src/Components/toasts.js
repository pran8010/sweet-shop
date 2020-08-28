import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";

const Toast = ()=>{
    const { addToast } = useToasts()
    useEffect(() => {
    addToast('You are now Logged OUT', {appearance: 'warning', autoDismiss: true})
    })
    return (
        <div></div>
    )
}
export default Toast