import React, { useState } from "react";
import { useHistory } from "react-router";
import FlashCardStudy from "../FlashCard/FlashCard"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StudyFlashCardTable from "./StudyFlashCardTable"

const StudyFlashCard = ({flashCards}) => {
    const history = useHistory();
    const length = flashCards.length;
    const [current, setCurrent] = useState(0);

    
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
                    {flashCards.map((flashCard, index) => {
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
                    }
                    {flashCards.length > 0  && <p style={{textAlign:"center", marginTop:"10px"}}>Progress {current+1} of {length}</p>}
            </div>
            {flashCards.length > 0  && <StudyFlashCardTable flashCards={flashCards}/>}
            </div>)


}

export default StudyFlashCard;