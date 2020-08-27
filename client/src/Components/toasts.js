import React from "react";
import { useToasts } from "react-toast-notifications";

const Toasts = (content, appearance)=>{
    const { addToast } = useToasts()
    addToast(content, {appearance})
}

export default Toasts