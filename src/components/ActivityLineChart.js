import React from "react";
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ActivityLineChart = ({activiyTimeSeries}) =>{
        return (
            <div style={{marginTop:"48px"}}>
            <LineChart width={650} 
                       height={250} 
                       data={activiyTimeSeries}
                       margin={{ top: 0, right: 10, left: 45, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Correct" stroke="#0088FE" />
                <Line type="monotone" dataKey="Wrong" stroke="#FF0000" />
            </LineChart>
            </div>
        )
}

export default ActivityLineChart;