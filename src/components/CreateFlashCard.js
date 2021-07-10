import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from "axios";



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
    const [statusMessage, setStatusMessage] = useState("")
    const [wordNotFoundMessage, setWordNotFoundMessage] = useState("")
    const [searchStatus, setSearchStatus] = useState(null)

                                                
    console.log(definition_choice)
    const userInputHandler = (e) => {
        setWordInput(e.target.value)
    }

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };

    const submitWordHandler = async (e) => {
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
        
    }

    const submitHandler = async () =>{
        const response = await axios.post('http://127.0.0.1:5000/api/add/word', {"session_id":sessionStorage.getItem("session_id"), "radioValue":radioValue, "word_info_list":definition_choice});    
        const data = response.data
        if(data.status == "success"){
            setStatusMessage("Added Successfully!")
        }
    }



    return (<div className="create-flashcard-container">
                {/* <h1 style={{width:"100%"}}>Create A Card</h1> */}
                <div className="create-flashcard-left-container">
                    <form onSubmit={submitWordHandler} style={{marginTop:"50px"}}>
                        <div>
                            <div>
                                <p style={{fontSize:"1.3rem"}}>Word</p>
                                <TextField 
                                    onChange={userInputHandler}
                                    style={{width:"100%"}}
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    name="word"
                                />
                            </div>
                            <div className="create-flashcard-button-container">
                                {! searchStatus ? <p>{wordNotFoundMessage}</p>:null}
                                <Button 
                                    onClick={submitWordHandler}
                                    style={{backgroundColor:"#007EA7", color:"#FFFF", width:"30%", marginTop:"20px"}}
                                    variant="contained">
                                    Search
                                </Button>
                            </div>
                        </div>   
                    </form>  
                </div>

                <div className="create-flashcard-right-container">
                <FormControl component="fieldset" style={{marginTop:"30px"}}>
                    <FormLabel component="legend" style={{marginBottom:"10px", fontSize:"1.3rem"}}>Choose a definition</FormLabel>
                    <RadioGroup aria-label="definition" name="gender1" value={radioValue} onChange={handleRadioChange}>
                        {definition_choice.map((choice, index)=> {
                            if(choice["short_definition"] != null)
                            return  (
                                <FormControlLabel onChange={handleRadioChange} value={choice["short_definition"]} control={<Radio />} label={choice["short_definition"]} key={index} />
                        )
                        }
                       )}
                    <p style={{fontSize:"1rem", color:"#22bb33"}}>{statusMessage}</p>
                    </RadioGroup>
                    </FormControl>
                    <div className="create-flashcard-button-container">
                        <Button 
                            onClick={submitHandler}
                            style={{backgroundColor:"#007EA7", color:"#FFFF", width:"30%", marginTop:"20px"}}
                            variant="contained">
                            Create
                        </Button>
                    </div>
                </div>
                
                   
               
        
        
            
                  
            </div>)
}

export default CreateFlashCard;