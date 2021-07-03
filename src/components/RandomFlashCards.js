import React, {useState, useEffect} from "react";
import axios from 'axios';
import FlashCard from "./FlashCard"

const RamdomFlashCards = () => {

    const [numCards, setNumCards] = useState(0)
    const [randomFlashCards, setRandomFlashCards] = useState([])

    const userInputHandler = (e) => {
        setNumCards(e.target.value)
    }

    const generateFlashCards = async () => {
        const response = await axios.post('http://127.0.0.1:5000/api/generate_flashcards', {"session_id":"9c8a0ac9-8123-4888-8823-e773b04efa91", "num_cards":numCards});
        console.log(response.data.result)
        setRandomFlashCards(response.data.result)
    }
    


    return (<div>

            <label >Number of Questions</label>  
            <input onChange={userInputHandler} placeholder="0"/>
            <button onClick={generateFlashCards}>Generate</button>
            {randomFlashCards.map((randomFlashCard, index) => {
                return <FlashCard index={index} flashCard={randomFlashCard} key={index}/>
            })}
            </div>)


}

export default RamdomFlashCards;