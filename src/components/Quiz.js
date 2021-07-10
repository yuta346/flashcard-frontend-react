import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom"
import { AuthContext } from "../AuthContext";
import axios from 'axios';
import FlashCard from "./FlashCard"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



const Quiz = () =>{
    const {auth} = useContext(AuthContext);
    const [flashCards, setFlashCards] = useState([]);
    const length = flashCards.length;
    const [current, setCurrent] = useState(0);
    const history = useHistory();
    const isMastered = sessionStorage.getItem("isMastered")

    console.log(flashCards)
    console.log(auth)

 
    useEffect(()=>{
            axios.post('http://127.0.0.1:5000/api/display_all_flashcards', {"session_id":sessionStorage.getItem("session_id")})
                    .then(res => {
                        setFlashCards(res.data.word_list);  
                        sessionStorage.setItem("isMastered", JSON.stringify(res.data.isMastered_dict))
                    })
    },[])
    
    const nextFlashCard = () =>{
        if(current === length -1){
            axios.post('http://127.0.0.1:5000/api/update_activitiy', 
                        {"session_id":sessionStorage.getItem("session_id"), "isMastered":JSON.parse(sessionStorage.getItem("isMastered"))})
            history.push({pathname:"/result_table", state:flashCards})
        }
        setCurrent(current + 1);
    }


    return (<div>
                <div className="slider">
                <h1 style={{textAlign:"center"}}>{current+1}/{length}</h1>
                    {auth && <ArrowForwardIosIcon className="forward-icon" onClick={nextFlashCard} style={{ fontSize: 50, color:"grey"}} />}
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
                </div>
            </div>)

}

export default Quiz;