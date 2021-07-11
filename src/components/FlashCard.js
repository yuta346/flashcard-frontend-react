import React, {useState} from "react";
import '../App.css'
import FlashCardFront from "./FlashCardFront";
import FlashCardBack from "./FlashCardBack";


const FlashCard =(props) =>{

    const {word, definition, short_definition, example, choices, type} = props.flashCard;
    const [flip, setFlip] = useState(false);
    
    return (<div className="flashCard">
                {flip ? <FlashCardFront word={word} definition={definition} example={example}/>
                        :
                        <FlashCardBack word={word} short_definition={short_definition} choices={choices}/>
                }
                <div className="flashCard-bottom">
                    {type == "quiz" ?<p style={{height:"20px"}}></p>:<p onClick={()=> setFlip(!flip)}>CLICK TO SEE MEANING</p>}
                </div> 
            </div>)
}

export default FlashCard;