import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import axios from "axios";




const CreateCustomFlashCard = () =>{

    const [userInput, setUserInput] = useState({"word":null, "definition":null, "example":null})


    const userInputHandler = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(userInput)
        const response = await axios.post('http://127.0.0.1:5000/api/add/word/custom', {"session_id":sessionStorage.getItem("session_id"),"userInput":userInput});    
        const data  = response.data;
        console.log(data)
    }

    return (<div className="create-flashcard-container">
                <h1 style={{margin:"30px 0 30px 0"}}>Create A Custom Flashcard</h1>
                <form onSubmit={submitHandler}>
                    <div className="create-flashcard-top-container">
                        <div className="word">
                        <p style={{fontSize:"1.3rem", margin:"0 0 8px 3px"}}>Word</p>
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
                        <p style={{fontSize:"1.3rem", margin:"10px 0 5px 3px"}}>Definition(Optional)</p>
                        <TextField
                            onChange={userInputHandler}
                            style={{width:"100%", margin:"10px 0 5px 0"}}
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="definition"
                        />

                        <p style={{fontSize:"1.3rem", margin:"10px 0 5px 3px"}}>Example Sentence (Optional)</p>
                        <TextField
                            onChange={userInputHandler}
                            style={{width:"100%", margin:"10px 0 5px 0"}}
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="example"
                        />
                        <div className="create-flashcard-button-container">
                            <button className="create-flashcard-btn" onClick={submitHandler}>CREATE</button>
                        </div>
                    </div>   
                </form>       
            </div>)
}

export default CreateCustomFlashCard;