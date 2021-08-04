import React, {useState} from "react";
import {Link} from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import axios from "axios";




const CreateCustomFlashCard = () =>{

    const [userInput, setUserInput] = useState({"word":null, "definition":null, "example":null})
    const [statusMessage, setStatusMessage] = useState("")
    const [status, setStatus] = useState('')


    const userInputHandler = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/api/add/word/custom', {"session_id":sessionStorage.getItem("session_id"),"userInput":userInput});    
        const status  = response.data.status;
        if(status === "success"){
            setStatus("success")
            setStatusMessage("Added Successfully!")
        }else{
            setStatus("fail")
            setStatusMessage("Word with this definition already exists")
        }
    }

    return (<div className="create-flashcard-container">
                <h1 style={{margin:"15px 0 15px 0"}}>Create A Flashcard</h1>
                <form onSubmit={submitHandler}>
                    <div className="create-flashcard-top-container">
                        <div className="word">
                        <p>Word</p>
                            <TextField 
                                onChange={userInputHandler}
                                style={{width:"100%", margin:"10px 0 5px 0"}}
                                id="outlined-basic" 
                                variant="outlined" 
                                name="word"
                            />
                        </div>
                    </div>
                    
                    <div className="create-flashcard-bottom-container">
                        <p>Definition(Optional)</p>
                        <TextField
                            onChange={userInputHandler}
                            style={{width:"100%", margin:"10px 0 5px 0"}}
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="definition"
                            inputProps={{ maxLength: 50 }}
                        />

                        <p>Example Sentence (Optional)</p>
                        <TextField
                            onChange={userInputHandler}
                            style={{width:"100%", margin:"10px 0 5px 0"}}
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="example"
                            inputProps={{ maxLength: 50 }}
                        />
                        <p style={status == "success" ? {fontSize:"1rem", color:"#22bb33"} : {fontSize:"1rem", color:"#F32013"}}>{statusMessage}</p>
                        <div className="create-flashcard-button-container">
                            <button className="create-flashcard-btn" onClick={submitHandler}>CREATE</button>
                        </div>
                        <p style={{fontSize:"20px", textAlign:"center"}}>Create with dictionary lookup? <Link style={{textDecoration:"none"}} to="/create/flashcard">Click here</Link></p>
                    </div>   
                </form>       
            </div>)
}

export default CreateCustomFlashCard;