import React, { useState,useEffect} from "react";
import QuizFlashCard from "./QuizFlashCard";
import NoFlashCards from "../Error/NoFlashCards"
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

const Quiz = () =>{

    const [flashCards, setFlashCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [length, setLength] = useState(0)
    const [isMoreThanFour,　setIsMoreThanFour] = useState(null)

    useEffect(()=>{
            setIsLoading(true)
            axios.post('http://127.0.0.1:5000/api/display/generated/flashcards', {"session_id":sessionStorage.getItem("session_id")})
                    .then(res => {
                        setFlashCards(res.data.word_list);  
                        setLength(res.data.word_list.length);
                        if(res.data.word_list.length >= 4){
                            setIsMoreThanFour(true)
                        }else{
                            setIsMoreThanFour(false)
                        }
                        sessionStorage.setItem("isMastered", JSON.stringify(res.data.isMastered_dict))
                    })
            setIsLoading(false)
    },[])

    const output = {
        "false-false": <NoFlashCards type={"quiz"}/>,
        "false-true":<QuizFlashCard flashCards={flashCards} length={length}/>,
        "true-false": <BeatLoader loading/>,
        "true-true":<BeatLoader loading/>
    }

    console.log(`${isLoading}-${isMoreThanFour}`)

    return (<div>
               {output[`${isLoading}-${isMoreThanFour}`]}
            </div>)
}

export default Quiz;