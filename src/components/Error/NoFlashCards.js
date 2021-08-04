import React from "react";
import {Link} from "react-router-dom"

const NoFlashCards = ({type}) =>{
    if(type == "quiz"){
        return(<div className="no-flash-card">
                    <h1>Flashcards Not Found</h1>
                    <p>You need to have minimum 4 cards to take a Quiz!</p>
                    <p>Need more Flashcard Now? <Link style={{textDecoration:"none"}}>Create a Flashcard</Link></p>
                </div>)
    }else{
        return( <div className="no-flash-card">
                    <h1>Flashcards Not Found</h1>
                    <p>Need a Flashcard Now? <Link style={{textDecoration:"none"}}>Create Flashcard</Link></p>
                </div>)
    }    
    }
export default NoFlashCards