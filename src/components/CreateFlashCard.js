import React, {useState} from "react";
import {Link} from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));


const CreateFlashCard = () =>{

    const [wordInput, setWordInput] = useState("")
    const [definition_choice, setDefinitionChoice] = useState([])
    const [radioValue, setRadioValue] = useState('');
    const [status, setStatus] = useState('')
    const [statusMessage, setStatusMessage] = useState("")
    const [wordNotFoundMessage, setWordNotFoundMessage] = useState("")
    const [searchStatus, setSearchStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

                                                
    console.log(definition_choice)
    const userInputHandler = (e) => {
        setWordInput(e.target.value)
    }

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };

    const searchWordHandler = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/api/serach/definitions', {"session_id":sessionStorage.getItem("session_id"),"word":wordInput});    
        const data = response.data
        if(data.status === "success"){
            console.log(data.definition_choice)
            setSearchStatus(true)
            setDefinitionChoice(data.definition_choice)
        }else{
            console.log("failed")
            setSearchStatus(false)
            setWordNotFoundMessage("This Word Does Not Exist ")
        }
        setIsLoading(false)
    }

    const submitHandler = async () =>{
        const response = await axios.post('http://127.0.0.1:5000/api/add/word/dictionary', {"session_id":sessionStorage.getItem("session_id"), "radioValue":radioValue, "word_info_list":definition_choice});    
        const data = response.data
        if(data.status == "success"){
            setStatus("success")
            setStatusMessage("Added Successfully!")
        }else{
            setStatus("fail")
            setStatusMessage("Word with this definition already exists")
        }
    }

    return (<div className="create-flashcard-container">
                <h1 style={{width:"100%"}}>Create A Flashard</h1>
                    <form onSubmit={searchWordHandler} style={{marginTop:"50px"}}>
                        <div>
                            <div>
                                <p style={{fontSize:"1.3rem", margin:"0 0 8px 3px"}}>Word</p>
                                <TextField 
                                    onChange={userInputHandler}
                                    style={{width:"100%"}}
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    name="word"
                                    label="Type a word..."
                                />
                            </div>
                            <div className="create-flashcard-button-container">
                                {! searchStatus ? <p>{wordNotFoundMessage}</p>:null}
                                <button className="create-flashcard-btn" onClick={searchWordHandler}>SEARCH</button>
                            </div>
                        </div>   
                    </form>  

                <FormControl component="fieldset" style={{marginTop:"30px"}}>
                    <FormLabel component="legend" style={{marginBottom:"10px", fontSize:"1.3rem"}}>Choose a definition</FormLabel>
                    {isLoading ? <BeatLoader size={30} color={"#24a0ed"}/> : <RadioGroup aria-label="definition" name="gender1" value={radioValue} onChange={handleRadioChange}>
                        {definition_choice.map((choice, index)=> {
                            if(choice["short_definition"] != null)
                            return  (
                                <FormControlLabel onChange={handleRadioChange} value={choice["short_definition"]} control={<Radio />} label={choice["short_definition"]} key={index} />
                        )
                        }
                       )}
                    <p style={status == "success" ? {fontSize:"1rem", color:"#22bb33"} : {fontSize:"1rem", color:"#F32013"}}>{statusMessage}</p>
                    </RadioGroup>}
                    </FormControl>
                    <div className="create-flashcard-button-container">
                        <button className="create-flashcard-btn" onClick={submitHandler}>CREATE</button>
                    </div>
                    <p style={{margin:"30px 0 10px 0", fontSize:"20px", textAlign:"center"}}>Create a flashcard manually? <Link style={{textDecoration:"none"}} to="/create/custom/flashcard">Click here</Link></p>

            </div>)
}

export default CreateFlashCard;