import React, {useState, useContext} from "react";
import {useHistory, Link} from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

const Signup = () => {

    const {auth, setAuth} = useContext(AuthContext);
    const [userInput, setUserInput] = useState({"username":"", "email":"","password":""})
    const [helperMessage, setHelperMessage] = useState("")
    const history = useHistory()

    const inputHandler = (e) => {
        const key = e.target.name;
        setUserInput({...userInput, [key]:e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/api/signup', userInput);
        const userData = response.data
        console.log(userData)
        if (userData.status === "success"){
            setAuth({...auth, username:userData.username, session_id:userData.session_id})
            sessionStorage.setItem("session_id", userData.session_id)
            history.push("/create/flashcard")
        }else{
            setHelperMessage("This account already exists")
            history.push("/signup")
        }
    }

    return (<div className="signup-page">
            <div className="form-container-signup">
                <form className="form" onSubmit={submitHandler}>
                <h1 className="signup-title">Sign up</h1>
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
                            name = "email"
                            required
                            id="outlined-required"
                            label="Email"
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
                    <button className="signup-btn">Sign up</button>
                    <p style={{margin:"15px 0 15px 0", color:"#F32013"}}>{helperMessage}</p>
                    <p style={{margin:"0 0 10px 0"}}>Already have an account? <Link style={{textDecoration:"none"}} to="login">Login</Link></p>
                </form>
            </div>
            </div>) 
}

export default Signup;