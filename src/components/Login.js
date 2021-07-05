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
        if (userData.status === "success"){
            setAuth({...auth, username:userData.username, session_id:userData.session_id})
            sessionStorage.setItem("session_id", userData.session_id)
        }
    }

    return (<div className="login-container">
                <h1>Login</h1>
                <form onSubmit={submitHandler}>
             
                <TextField
                    onChange={inputHandler} 
                    name = "username" 
                    required
                    id="outlined-required"
                    label="Username"
                    variant="outlined"
                />
                <TextField
                    onChange={inputHandler} 
                    name = "password"
                    required
                    id="outlined-required"
                    label="Password"
                    variant="outlined"
                    type="password"
                />
                    <button>Log In</button>
                </form>
            </div>) 
}

export default Login;