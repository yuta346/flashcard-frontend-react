import React, {useState,useEffect} from "react";
import axios from "axios";
import { PieChart, Pie, Text } from 'recharts'

const UserActivity = () =>{
    const [userActivity, setUserActivity] = useState([])

    useEffect(()=>{
        const f = async ()  =>{
            const response = await axios.post('http://127.0.0.1:5000/api/get_activity', {"session_id":sessionStorage.getItem("session_id")});
            console.log(response.data.activities)
            setUserActivity(response.data.activities)
        }
        f()
    },[])

    let count = 0
    for(let i=0; i<userActivity.length; i++){
        if(userActivity[i].isMastered == true){
            count++;
        }
    }

    return (<div>
            <PieChart width={730} height={250}>
            <Pie data={userActivity} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label/>
            </PieChart>
            
            </div>)
}

export default UserActivity;