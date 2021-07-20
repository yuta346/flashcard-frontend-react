import { createContext } from "react";

export const AuthContext = createContext({
    auth: "",
    setAuth: ()=>{}
})


export const PendingContext = createContext({
    pendingLength: "",
    setPendingLength: ()=>{console.log("pending function")}
})
