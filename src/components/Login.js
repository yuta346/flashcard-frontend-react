import React, {useState, useContext} from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext, PendingContext } from "../AuthContext";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

const Login = () => {

    const {setAuth} = useContext(AuthContext);
    const {setPendingLength} = useContext(PendingContext)
    console.log(setPendingLength)
    const [userInput, setUserInput] = useState({"username":"","password":""})
    const [helperMessage, setHelperMessage] = useState("")
    const history = useHistory();

    const inputHandler = (e) => {
        const key = e.target.name;
        setUserInput({...userInput, [key]:e.target.value});
    }

    const submitHandler = async (e) => {
        const response = await axios.post('http://127.0.0.1:5000/api/login', userInput);
        const userData = await response.data
        if (userData.status === "success"){

            sessionStorage.setItem("pending_length", userData.pending_length)
            setPendingLength(userData.pending_length)

            sessionStorage.setItem("session_id", userData.session_id)
            setAuth(userData.session_id)
            history.push("/account");
            // sessionStorage.setItem("pending_length", userData.pending_length)
            // setPendingLength(userData.pending_length)
            // setTimeout(()=>{
            //     history.push("/account");
            // }, 3000)
            // 
        }else{
            setHelperMessage("Invalid credentials")
            history.push("/login");
        }
    }

    return (<div className="login-page">
    <div className="form-container-login">
        <div className={"form"}>
        <h1 className="login-title">Login</h1>
            <div className="form-container-input">
                <TextField
                    onChange={inputHandler} 
                    name = "username" 
                    required
                    id="outlined-required"
                    label="Username"
                    variant="outlined"
                    style = {{width: "100%"}}
                />
            </div>
            <div className="form-container-input">
                <TextField
                    onChange={inputHandler} 
                    name = "password"
                    required
                    id="outlined-required"
                    label="Password"
                    variant="outlined"
                    type="password"
                    style = {{width: "100%"}}
                />
            </div>
            <button className="login-btn" onClick={submitHandler}>Login</button>
            <p style={{margin:"18px 0 10px 0", color:"#F32013"}}>{helperMessage}</p>
            <p style={{margin:"20px 0 10px 0"}}>Do you have an account yet?  <Link style={{textDecoration:"none"}} to="signup">Signup</Link></p>
        </div>
    </div>
    </div>) 
}

export default Login;