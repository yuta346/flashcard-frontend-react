import React from "react";
import {useHistory} from "react-router-dom";

const StudyExit = () => {

    const history = useHistory()

    const clickHandler =(e) =>{

        if(e.target.name === "study"){
            history.push("/study/top")
        }else{
            history.push("/quiz")
        };
    }

    return (<div className="study-exit-container">   
                <h1 className="study-exit-title">End of Study Deck</h1> 
                <div className="study-exit-continue">
                    <p>Continue Studying?</p>
                    <button className="study-exit-continue-btn" onClick={clickHandler} name="study">BACK TO STUDY</button>
                </div>
                <div className="study-exit-quiz">
                    <p>Ready for a Quiz?</p>
                    <button className="study-exit-quiz-btn" onClick={clickHandler} name="quiz">TAKE A QUIZ</button>
                </div>
            </div>)
}

export default StudyExit;