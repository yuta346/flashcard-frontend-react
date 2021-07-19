import React from "react";
import {Link} from "react-router-dom"

const NoFlashCards = () =>{
    return (<div className="no-flash-card">
                <h1>Flashcards Not Found</h1>
                <p>You need to have minimum 4 cards to take a Quiz!</p>
                <p>Need more Flashcard Now? <Link style={{textDecoration:"none"}}>Create Flash Card</Link></p>
            </div>)
}
export default NoFlashCards