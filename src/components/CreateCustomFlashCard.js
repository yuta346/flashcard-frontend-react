import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";




const CreateCustomFlashCard = () =>{

    const [userInput, setUserInput] = useState({"word":null, "speech":null, "definition":null, "usage":null})


    const userInputHandler = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/api/add_word_dictionary', {"session_id":sessionStorage.getItem("session_id"),"userInput":userInput});    
        const data  = response.data;
    }



    return (<div className="create-flashcard-container">
                <h1>Create A Custom Flashcard</h1>
                <form onSubmit={submitHandler}>
                    <div className="create-flashcard-top-container">
                        <div className="word">
                            <p>Word</p>
                            <TextField 
                                onChange={userInputHandler}
                                style={{width:"100%"}}
                                id="outlined-basic" 
                                variant="outlined" 
                                name="word"
                            />
                        </div>
                        <div className="part-of-speech">
                            <p>Parts of Speech(Optional)</p>
                            <select name="speech" className="part-of-speech-dropdown">
                                <option value="noun">Noun</option>
                                <option value="pronoun">Pronoun</option>
                                <option value="verb">Verb</option>
                                <option value="adjective">Adjective</option>
                                <option value="adverb">Adverb</option>
                                <option value="preposition">Preposition</option>
                                <option value="conjunction">Conjunction</option>
                                <option value="interjection">Interjection</option>
                            </select>
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
                        <p>Example Sentence (Optional) </p>
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
                            <button className="create-flashcard-btn" onClick={submitHandler}>CREATE</button>
                        </div>
                    </div>   
                </form>       
            </div>)
}

export default CreateCustomFlashCard;