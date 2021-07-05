import React, {useState, useContext} from "react";
import { AuthContext } from "../AuthContext";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

const Signup = () => {

    const {auth, setAuth} = useContext(AuthContext);

    const [userInput, setUserInput] = useState({"username":"", "email":"","password":""})

    const inputHandler = (e) => {
        const key = e.target.name;
        setUserInput({...userInput, [key]:e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/api/signup', userInput);
        const userData = response.data
        if (userData.status === "success"){
            setAuth({...auth, username:userData.username, session_id:userData.session_id})
            sessionStorage.setItem("session_id", userData.session_id)
        }
    }

    return (<div className="signup-container">
                <h1>Sign up</h1>
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
                        name = "email"
                        required
                        id="outlined-required"
                        label="Email"
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
                    <button>Sign up</button>
                </form>
                <p>{auth.username}</p>
                <p>{auth.session_id}</p>
            </div>) 
}

export default Signup;