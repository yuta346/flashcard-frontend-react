import React, {useState, useEffect, useContext} from "react";
import { useHistory, useLocation } from "react-router";
import { AuthContext } from "../../AuthContext";
import axios from 'axios';
import FlashCardStudy from "../FlashCard/FlashCard"
import NoFlashCards from "../FlashCard/NoFlashCards";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StudyFlashCardTable from "./StudyFlashCardTable"

const Study = () => {
    const location = useLocation();
    const history = useHistory();
    const {auth} = useContext(AuthContext);
    const [numCards, setNumCards] = useState(location.state.numCards)
    const [flashCards, setFlashCards] = useState([]);
    const length = flashCards.length;
    const [current, setCurrent] = useState(0);
    const [keyDown, setKeyDown] = useState(0)

    useEffect(()=>{
        const f = async ()=>{
            const response = await axios.post('http://127.0.0.1:5000/api/display/generated/flashcards', {"session_id":sessionStorage.getItem("session_id"), "num_cards":numCards});
            setFlashCards(response.data.word_list)
        }
        f() 
    },[])

    const userInputHandler = (e) => {
        setNumCards(e.target.value)
    }

    const generateFlashCards = async () => {
        const response = await axios.post('http://127.0.0.1:5000/api/display/generated/flashcards', {"session_id":sessionStorage.getItem("session_id"), "num_cards":numCards});
        setFlashCards(response.data.word_list)
    }
    
    const nextFlashCard = () =>{
        if(current == length - 1){
            history.push("/study/exit")
        }
        else{
            setCurrent(current + 1);
        }
    }


    return (<div>
            <div className="slider">
                    {flashCards.length > 0 && <ArrowForwardIosIcon className="forward-icon" onClick={nextFlashCard} style={{ fontSize: 50, color:"grey"}} />}
                    {flashCards.length > 0 ? flashCards.map((flashCard, index) => {
                        flashCard["type"] = "study"
                        return (<div>
                        {index === current && <FlashCardStudy
                                        key={index}
                                        index={index} 
                                        flashCard={flashCard} 
                                        nextFlashCard={nextFlashCard}
                                        />}
                                </div>)
                        })
                        :
                         <NoFlashCards/>
                    }
                    <p style={{textAlign:"center", marginTop:"10px"}}>Progress {current+1} of {length}</p>
            </div>
            <StudyFlashCardTable flashCards={flashCards}/>
            </div>)


}

export default Study;