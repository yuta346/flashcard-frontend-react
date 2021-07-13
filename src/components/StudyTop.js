import React,{useState} from "react";
import { useHistory } from "react-router";
import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const StudyTop = () =>{

    const [numCards, setNumCards] = useState(20)
    const [flashCards, setFlashCards] = useState([]);
    const history = useHistory()

    const userInputHandler = (e) => {
        setNumCards(e.target.value)
    }

    const generateFlashCards = async () => {
        const response = await axios.post('http://127.0.0.1:5000/api/display_all_flashcards', {"session_id":sessionStorage.getItem("session_id"), "num_cards":numCards});
        setFlashCards(response.data.word_list)
        history.push('/study')
        

    }
    
    return (<div>
    <div style={{textAlign:"center",marginTop:"30px"}}>
                    <TextField
                        // style={{}}
                        onChange={userInputHandler}
                        id="outlined-number"
                        defaultValue="0"
                        label="Number of questions"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{ min: 0}}
                        variant="outlined"
                    />
                    <div className="create-flashcard-button-container">
                            <Button 
                                onClick={generateFlashCards}
                                style={{backgroundColor:"#007EA7", color:"#FFFF"}}
                                variant="contained">
                                Generate
                            </Button>
                        </div>
                </div>
</div>)
}

export default StudyTop;