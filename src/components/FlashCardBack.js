import React from "react";

const FlashCardBack = ({word, definition, example}) =>{
    return (<div>
                <div className="flashCard-top"/>
                <div className="flashCard-middle">
                    <p className="flashCard-word">{word}</p>
                    <p className="flashCard-definition"><span className="flashCard-span">Definition: </span>{definition}</p>
                    <p className="flashCard-example"><span className="flashCard-span">Usage: </span>{example ? example:"Not Available"}</p>
                </div>
            </div>)
}

export default FlashCardBack;