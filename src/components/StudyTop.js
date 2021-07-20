import React,{useState} from "react";
import { useHistory } from "react-router";


const StudyTop = () =>{

    const [numCards, setNumCards] = useState(0)
    const [flashCards, setFlashCards] = useState([]);
    const history = useHistory()

    const userInputHandler = (e) => {
        setNumCards(e.target.value)
    }

    const generateFlashCards = () => {
        if(numCards === 0){
            history.push({ pathname:'/study/top'})
        }else{
            history.push({ pathname:'/study',state:{numCards:numCards}})
        }
    }
    
    return (<div className="study-top-container">
                <p>Create a study deck</p>
                <div style={{textAlign:"center",marginTop:"30px"}}>
                    <label className="generate-label" for="quantity">Enter Number of Questions</label>
                    <br/>
                    <input  className="generate-input" onChange={userInputHandler} type="number" id="quantity" name="quantity" min="1"/>
                    <div className="create-flashcard-button-container">
                        <button className="generate-btn" onClick={generateFlashCards}>CREATE</button>
                    </div>
                </div>
            </div>)
}

export default StudyTop;