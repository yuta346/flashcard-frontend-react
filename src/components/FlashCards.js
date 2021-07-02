import React, {useState} from "react";
import axios from 'axios';
import FlashCard from "./FlashCard"

const FlashCards = () =>{

    const [flashCards, setFlashCards] = useState([]);
    const length = flashCards.length;
    const [current, setCurrent] = useState(0);

    const generateCards = () =>{
        axios.get("http://127.0.0.1:5000/api/display_all")
        .then(res => {
            setFlashCards(res.data.result)
            // setCards(res)
        })
    }

    const nextFlashCard = () =>{
        setCurrent(current === length -1 ? 0 : current + 1);
    }

    const prevFlashCard = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }



    return (<div>
        {/* navbar */}
        <button onClick={generateCards}> Display</button>
        <div className="slider">
            {flashCards.map((flashCard, index) => {
            return <FlashCard index={index} flashCard={flashCard} length={length} key={index}/>
        })}
        </div>
        
    </div>)

}

export default FlashCards;