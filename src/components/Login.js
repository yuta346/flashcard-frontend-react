import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

const Login = () => {

    const {auth, setAuth} = useContext(AuthContext);
    const [userInput, setUserInput] = useState({"username":"","password":""})
    const history = useHistory();

    const inputHandler = (e) => {
        const key = e.target.name;
        setUserInput({...userInput, [key]:e.target.value});
    }

    const submitHandler = async (e) => {
        const response = await axios.post('http://127.0.0.1:5000/api/login', userInput);
        const userData = response.data
        if (userData.status === "success"){
            sessionStorage.setItem("session_id", userData.session_id)
            setAuth(sessionStorage.getItem("session_id"))
            history.push("/account");
        }
    }

    return (<div className="login-page">
    <div className="form-container">
        <div className={"form"}>
        <h1 className="login-title">Log In</h1>
            <div>
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
            <div>
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
        </div>
    </div>
    </div>) 
}

export default Login;