import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../AuthContext";
import axios from 'axios';
import FlashCard from "./FlashCard"
import TextField from '@material-ui/core/TextField';

const RamdomFlashCards = () => {

    const {auth} = useContext(AuthContext);
    const [numCards, setNumCards] = useState(0)
    const [randomFlashCards, setRandomFlashCards] = useState([])

    const userInputHandler = (e) => {
        setNumCards(e.target.value)
    }

    const generateFlashCards = async () => {
        const response = await axios.post('http://127.0.0.1:5000/api/generate_flashcards', {"session_id":sessionStorage.getItem("session_id"), "num_cards":numCards});
        console.log(response.data.result)
        setRandomFlashCards(response.data.result)
    }
    


    return (<div>
            <h1>Generate Cards</h1>
            <label>Number of Questions</label>  
            <TextField
                onChange={userInputHandler}
                id="outlined-number"
                defaultValue="0"
                label="Number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ min: 0}}
                variant="outlined"
            />
            <button onClick={generateFlashCards}>Generate</button>
            {randomFlashCards.map((randomFlashCard, index) => {
                return <FlashCard index={index} flashCard={randomFlashCard} key={index}/>
            })}
            </div>)


}

export default RamdomFlashCards;