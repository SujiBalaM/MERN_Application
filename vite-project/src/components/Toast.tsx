import { useEffect } from "react";


type ToastProps = {
    message:string;
    type:"SUCCESS" | "ERROR",
    onClose:()=>void
}

const Toast = ({message,type,onClose}:ToastProps) => {
    useEffect(() =>{
        const timer = setTimeout(()=>{
            onClose()
        },5000)
        return (()=>{
            clearTimeout(timer)
        })
    },[onClose])
    const styles = type === "SUCCESS" ? "fixed top-4 right-4 p-4 text-white bg-green-600 rounded-md max-w-md z-50":
    "fixed top-4 right-4 p-4 text-white bg-red-600 rounded-md max-w-md z-50"
    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
            <span className="font-semibold text-center text-lg">{message}</span>
            </div>
        </div>
    )
}

export default Toast;