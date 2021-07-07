import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";




const CreateFlashCard = () =>{

    const [userInput, setUserInput] = useState({"word":null, "speech":null, "definition":null, "usage":null})


    const userInputHandler = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/api/add_word', {"session_id":sessionStorage.getItem("session_id"),"userInput":userInput});    
        const data  = response.data;
        
    }



    return (<div className="create-flashcard-container">
                <h1>Create A Custom Card</h1>
                <form onSubmit={submitHandler}>
                    <div className="create-flashcard-top-container">
                        <div>
                            <p>Word</p>
                            <TextField 
                                onChange={userInputHandler}
                                style={{width:"100%"}}
                                id="outlined-basic" 
                                variant="outlined" 
                                name="word"
                            />
                        </div>
                        <div>
                            <p>Speech(Optional)</p>
                            <TextField 
                                onChange={userInputHandler}
                                style={{width:"100%"}}
                                id="outlined-basic" 
                                variant="outlined" 
                                name="speech"
                            />
                        </div>
                    </div>
                    
                    <div className="create-flashcard-bottom-container">
                        <p>Definition(Optional)</p>
                        <TextField
                            onChange={userInputHandler}
                            style={{width:"100%"}}
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="definition"
                        />
                        <p>Usage(Optional) </p>
                        <TextField
                            onChange={userInputHandler}
                            style={{width:"100%"}}
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="usage"
                        />
                        <div className="create-flashcard-button-container">
                            <Button 
                                onClick={submitHandler}
                                style={{backgroundColor:"#007EA7", color:"#FFFF", width:"30%"}}
                                variant="contained">
                                Submit
                            </Button>
                        </div>
                    </div>   
                </form>       
            </div>)
}

export default CreateFlashCard;