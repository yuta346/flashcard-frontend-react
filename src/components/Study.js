import React, {useState, useEffect, useContext} from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../AuthContext";
import axios from 'axios';
import FlashCard from "./FlashCard"
import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';

const Study = () => {

    const {auth} = useContext(AuthContext);
    const [numCards, setNumCards] = useState(0)
    const [flashCards, setFlashCards] = useState([]);
    const length = flashCards.length;
    const [current, setCurrent] = useState(0);
    const [keyDown, setKeyDown] = useState(0)

    const userInputHandler = (e) => {
        setNumCards(e.target.value)
    }

    const generateFlashCards = async () => {
        const response = await axios.post('http://127.0.0.1:5000/api/display_all_flashcards', {"session_id":sessionStorage.getItem("session_id"), "num_cards":numCards});
        console.log(response.data.word_list)
        setFlashCards(response.data.word_list)
    }
    
    const nextFlashCard = () =>{
        setCurrent(current === length -1 ? 0 : current + 1);
    }


    return (<div>
            <div className="slider">
                    {flashCards.length > 0 && <ArrowForwardIosIcon className="forward-icon" onClick={nextFlashCard} style={{ fontSize: 50, color:"grey"}} />}
                    {flashCards.map((flashCard, index) => {
                        return (<div>
                        {index === current && <FlashCard 
                                        key={index}
                                        index={index} 
                                        flashCard={flashCard} 
                                        />}
                                </div>)
                        })
                    }
                    {flashCards.length > 0 && <h1 style={{textAlign:"center"}}>{current+1}/{length}</h1>}
            </div>
            <div style={{textAlign:"center",position:"absolute",top:"40px",right:"20px",marginTop:"50px"}}>
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

export default Study;