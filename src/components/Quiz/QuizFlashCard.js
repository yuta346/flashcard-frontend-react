import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../AuthContext";
import axios from 'axios';
import FlashCard from "../FlashCard/FlashCard";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const QuizFlashCard = ({flashCards, length}) =>{
    const {auth} = useContext(AuthContext);
    const [current, setCurrent] = useState(0);
    const history = useHistory();

    
    const nextFlashCard = () =>{
        if(current === length -1){
            axios.post('http://127.0.0.1:5000/api/update_activitiy', 
                        {"session_id":sessionStorage.getItem("session_id"), "isMastered":JSON.parse(sessionStorage.getItem("isMastered"))})
            history.push({pathname:"/quiz/result", state:flashCards})
        }
        setCurrent(current + 1);
    }

    return (<div>
                <div className="slider">
                    {length > 4 && <ArrowForwardIosIcon className="forward-icon" onClick={nextFlashCard} style={{ fontSize: 50, color:"grey"}}/>}
                    {flashCards.map((flashCard, index) => {
                        flashCard["type"] = "quiz"
                        return (<div>
                        {index === current && <FlashCard 
                                                key={index}
                                                index={index} 
                                                flashCard={flashCard} 
                                                nextFlashCard={nextFlashCard}
                                              />}
                                </div>)
                        })
                    }
                    {length > 4 && <p style={{textAlign:"center", marginTop:"10px"}}>{current+1} out of {length}</p>}
                </div>
            </div>)
}

export default QuizFlashCard;