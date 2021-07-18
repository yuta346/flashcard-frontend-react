import React, {useState, useEffect} from "react";
import ActivityPieChart from "./ActivityPieChart";
import ActivityLineChart from "./ActivityLineChart"
import ActivityWordsTable from "./ActivityWordsTable";
import axios from "axios"

const Account = () =>{

    const [userWords, setUserWords] = useState([])
    const [numMastered, setNumMastered] = useState([])
    const [activiyTimeSeries, setActiviyTimeSeries] = useState([])

    useEffect(()=>{
        const f = async ()  =>{
            const response = await axios.post('http://127.0.0.1:5000/api/get_activity', {"session_id":sessionStorage.getItem("session_id")});
            const activities = response.data.activities
            const numMastered = response.data.numMastered
            const time_series = response.data.time_series

            activities.forEach(e => {
                e.date = new Date(e.date).toString()
                e.date = e.date.split(' ').slice(0, 5).join('-')
            });
            setUserWords(activities)
            setNumMastered(numMastered)
            time_series.forEach(e =>{
                e.name = new Date(e.name).toString()
                e.name = e.name.split(' ').slice(1, 3).join('-')
            })
             setActiviyTimeSeries(time_series)
        }
        f()
    },[])


    return (<div>
                <h1 style={{margin:"40px 0px 0px 150px"}}>Dashboard</h1>
                <div className="chart-container">
                    <ActivityLineChart activiyTimeSeries={activiyTimeSeries}/>
                    <ActivityPieChart numMastered={numMastered}/>
                </div>
                <ActivityWordsTable userWords={userWords}/>
            </div>)
}

export default Account;