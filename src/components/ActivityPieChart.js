import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ActivityPieChart = ({numMastered}) => {

    const COLORS = ['#0088FE','#FFBB28'];

    console.log(numMastered)
    let count = 0
    for(let i=0; i<numMastered.length; i++){
        if(numMastered[i].isMastered == true){
            count++;
        }
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }

        return null;
    };

        return (
            <PieChart width={300} height={300} style={{margin: "0 auto"}}>
                <Pie data={numMastered} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                    {
                        numMastered.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<CustomTooltip/>} />
                <Legend />
            </PieChart>
        )
}

export default ActivityPieChart;
