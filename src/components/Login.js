import React, {useState, useContext} from "react";
import { AuthContext } from "../AuthContext";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

const Login = () => {

    const {auth, setAuth} = useContext(AuthContext);

    const [userInput, setUserInput] = useState({"username":"","password":""})

    const inputHandler = (e) => {
        const key = e.target.name;
        setUserInput({...userInput, [key]:e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/api/login', userInput);
        const userData = response.data
        console.log(response)
        if (userData.status === "success"){
            // setAuth({...auth, username:userData.username, auth:true})
            sessionStorage.setItem("session_id", userData.session_id)
            setAuth(sessionStorage.getItem("session_id"))
        }
    }

    return (<div className="login-page">
    <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
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
            <button className="login-btn">Login</button>
        </form>
    </div>
    </div>) 
}

export default Login;