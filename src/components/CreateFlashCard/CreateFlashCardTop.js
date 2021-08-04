import React, {useState} from "react";
import CreateFlashCard from "./CreateFlashCard";
import CreateCustomFlashCard from "./CreateCustomFlashCard";

const CreateFlashCardTop = () =>{

    const [toggle, setToggle] = useState(true)

    const clickHandler = () =>{
        setToggle(!toggle)
    }

    return (<div>
                <div style={{textAlign:"center", margin:"20px 0 0 0"}}>
                    {toggle? <button onClick={clickHandler} className="create-flashcard-top-btn">Click to Create Your Own Custom Flashcard</button>
                            :
                             <button onClick={clickHandler} className="create-flashcard-top-btn">Clcik to Create with Oxford Dictionary</button>}
                </div>
                
                {toggle ? <CreateFlashCard/> : <CreateCustomFlashCard/>}
            </div>)

}

export default CreateFlashCardTop;