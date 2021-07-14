import React, {useState,useEffect} from "react";
import axios from "axios";
import { PieChart, Pie, Text } from 'recharts'

const UserActivity = ({numMastered}) =>{

    console.log(numMastered)


    let count = 0
    for(let i=0; i<numMastered.length; i++){
        if(numMastered[i].isMastered == true){
            count++;
        }
    }

    console.log(numMastered)
    console.log(numMastered.length)
    console.log(count)

    return (<div>
            <PieChart width={730} height={250}>
            <Pie data={numMastered} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label/>
            </PieChart>
            </div>)
}

export default UserActivity;