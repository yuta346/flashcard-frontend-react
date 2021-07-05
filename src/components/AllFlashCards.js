import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom"
import { AuthContext } from "../AuthContext";
import axios from 'axios';
import FlashCard from "./FlashCard"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



const AllFlashCards = () =>{
    const {auth} = useContext(AuthContext);
    const [flashCards, setFlashCards] = useState([]);
    const length = flashCards.length;
    const [current, setCurrent] = useState(0);
    const history = useHistory();

 
    useEffect(()=>{
            axios.post('http://127.0.0.1:5000/api/display_all_flashcards', {"session_id":sessionStorage.getItem("session_id")})
                    .then(res => {
                        console.log(res.data.result)
                        setFlashCards(res.data.result)
                    })
    },[])
    
    const nextFlashCard = () =>{
        setCurrent(current === length -1 ? 0: current + 1);
    }

    const previousFlashCard = () =>{
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    return (<div>
                <div className="slider">
                    {auth && <ArrowForwardIosIcon className="forward-icon" onClick={nextFlashCard} style={{ fontSize: 50, color:"grey"}} />}
                    {auth && <ArrowBackIosIcon className="back-icon" onClick={nextFlashCard} style={{ fontSize: 50, color:"grey"}} />}
                    {flashCards.map((flashCard, index) => {

                        return (<div>
                        {index === current && <FlashCard key={index}
                                        index={index} 
                                        flashCard={flashCard} 
                                        length={length} 
                                        />}
                                </div>)
                        })
                    }
                </div>
            </div>)

}

export default AllFlashCards;