import React from "react";

const FlashCardFront = ({word, definition, example}) =>{
    return (<div>
                <div className="flashCard-top"/>
                <div className="flashCard-middle">
                    <p className="flashCard-word">{word}</p>
                    <p><span className="flashCard-definition">Definition: </span>{definition}</p>
                    <p><span className="flashCard-p">Usage: </span>{example ? example:"Not Available"}</p>
                </div>
            </div>)
}

export default FlashCardFront;