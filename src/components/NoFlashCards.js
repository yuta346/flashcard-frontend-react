import React from "react";
import {Link} from "react-router-dom"

const NoFlashCards = () =>{
    return (<div className="no-flash-card">
                <h1>Flashcards Not Found</h1>
                <p>Need a Flashcard Now? <Link style={{textDecoration:"none"}}>Create Flash Card</Link></p>
            </div>)

}

export default NoFlashCards