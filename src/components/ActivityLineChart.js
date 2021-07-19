import React from "react";
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ActivityLineChart = ({activiyTimeSeries}) =>{

    activiyTimeSeries.forEach((activity) => {
        activity["% of Correct Answers"] = Math.round(activity['Correct']/(activity['Correct'] + activity['Wrong']) * 100)
    })


    return (
        <div style={{marginTop:"48px"}}>
        <LineChart width={650} 
                    height={250} 
                    data={activiyTimeSeries}
                    margin={{ top: 10, right: 10, left: 45, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Correct" stroke="#0088FE" />
            <Line type="monotone" dataKey="Wrong" stroke="#FF0000" />
            <Line type="monotone" dataKey="% of Correct Answers" stroke="#00b252" />
        </LineChart>
        </div>
    )
}

export default ActivityLineChart;