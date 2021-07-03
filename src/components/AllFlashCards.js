import React, {useState, useEffect} from "react";
import axios from 'axios';
import FlashCard from "./FlashCard"

const AllFlashCards = () =>{

    const [flashCards, setFlashCards] = useState([]);
    const length = flashCards.length;
    const [current, setCurrent] = useState(0);

    useEffect(()=>{
            axios.get("http://127.0.0.1:5000/api/display_all_flashcards")
                    .then(res => {
                        setFlashCards(res.data.result)
                    })
    },[])
    

    // const nextFlashCard = () =>{
    //     setCurrent(current === length -1 ? 0 : current + 1);
    // }

    // const prevFlashCard = () => {
    //     setCurrent(current === 0 ? length - 1 : current - 1);
    // }

    return (<div>
        <div className="slider">
            {flashCards.map((flashCard, index) => {
            return <FlashCard index={index} flashCard={flashCard} length={length} key={index}/>
        })}
        </div>
        
    </div>)

}

export default AllFlashCards;