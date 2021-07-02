import React, {useState} from "react";
import axios from 'axios';

const Signup = () => {

    const [userInput, setUserInput] = useState({"username":"", "email":"","password":""})

    const inputHandler = (e) => {
        const key = e.target.name;
        setUserInput({...userInput, [key]:e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/api/signup', userInput);
        console.log(response)
    }

    return (<div className="signup-container">
                <h1>Sign up</h1>
                <form onSubmit={submitHandler}>
                    <input onChange={inputHandler} name = "username" placeholder = "Username"/>
                    <input onChange={inputHandler} name = "email" placeholder = "Email"/>
                    <input onChange={inputHandler} name = "password" placeholder = "Password"/>
                    <button>Sign up</button>
                </form>
                <p>{userInput.username}</p>
                <p>{userInput.password}</p>
                <p>{userInput.email}</p>
            </div>) 
}

export default Signup;