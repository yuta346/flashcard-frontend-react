import React, {useState, useEffect} from "react";
import UserActivity from "./UserActivity";
import AllWordsTable from "./AllWordsTable";
import axios from "axios"


const Account = () =>{

    const [userWords, setUserWords] = useState([])
    const [numMastered, setNumMastered] = useState([])

    useEffect(()=>{
        const f = async ()  =>{
            const response = await axios.post('http://127.0.0.1:5000/api/get_activity', {"session_id":sessionStorage.getItem("session_id")});
            setUserWords(response.data.activities)
            setNumMastered(response.data.numMastered)
        }
        f()
    },[])

    console.log(numMastered)

    return (<div>
                <h1>Account Page</h1>
                <UserActivity numMastered={numMastered}/>
                <AllWordsTable userWords={userWords}/>
            </div>)
}

export default Account;