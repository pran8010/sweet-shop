import React from "react";
import { useToasts } from "react-toast-notifications";
const ToastEn = (Component, props)=>{
    const Temp = ()=>{
      const { addToast } = useToasts()
      // let tos = addToast(content, {appearance})
      return <Component addToast={addToast} props = {props} />
    }
    return Temp
  }

export default ToastEn