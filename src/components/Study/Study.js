import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import axios from 'axios';
import NoFlashCards from "../Error/NoFlashCards";
import StudyFlashCard from "./StudyFlashCard";
import BeatLoader from "react-spinners/BeatLoader";


const Study = () => {
    const location = useLocation();
    const [numCards, setNumCards] = useState(location.state.numCards)
    const [flashCards, setFlashCards] = useState([]);
    const [length, setLength] = useState(0)
    const [isLoading, setIsLoading] = useState(true);
    const [isMoreThanOne,　setIsMoreThanOne] = useState(null)

    useEffect(()=>{
        setIsLoading(true)
        axios.post('http://127.0.0.1:5000/api/display/generated/flashcards', {"session_id":sessionStorage.getItem("session_id"), "num_cards":numCards})
                .then(res => {
                    setFlashCards(res.data.word_list);  
                    setLength(res.data.word_list.length);
                    if(res.data.word_list.length >= 1){
                        setIsMoreThanOne(true)
                    }else{
                        setIsMoreThanOne(false)
                    }
                })
        setIsLoading(false)
    },[])

    const output = {
        "false-false": <NoFlashCards type={"study"}/>,
        "false-true":<StudyFlashCard flashCards={flashCards} length={length}/>,
        "true-false": <BeatLoader loading/>,
        "true-true":<BeatLoader loading/>
    }

    return (<div>
               {output[`${isLoading}-${isMoreThanOne}`]}
            </div>)
    


}

export default Study;