import React, {useState} from "react";
import '../App.css'


const FlashCard =({flashCard}) =>{

    const {word, speech, definition, example} = flashCard;
    const [flip, setFlip] = useState(false);
    
    return (<div className="flashCard">

                {flip ? <div>
                            <div className="flashCard-top"/>
                            <div className="flashCard-middle">
                                <p><span className="flashCard-definition">Definition: </span>{definition}</p>
                                <p><span className="flashCard-p">Speech: </span> {speech}</p>
                                <p><span className="flashCard-p">Usage: </span>{example}</p>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="flashCard-top"/>
                            <div className="flashCard-middle">
                                <p className="flashCard-word">{word}</p>
                            </div>
                        </div>      
                }
                <div className="flashCard-bottom">
                    <button >Back</button>
                    <button className="flashCard-btn" onClick={()=> setFlip(!flip)}>Flip Card</button>
                    <button >Next</button>
                </div>
                
            </div>)

}

export default FlashCard;