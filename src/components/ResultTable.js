import React,{useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const ResultTable = () =>{
    const isMastered = JSON.parse(sessionStorage.getItem("isMastered"));
    const location = useLocation();
    const flashcards = location.state;

    let numCorrect = 0;
    let score = 0
    let results = []

    for (const [key, value] of Object.entries(isMastered)) {
        console.log(`${key}: ${value[1]}`);
        if (value[1] === true){
             results.push({"id": value[0],"word":key, "result":"Correct"})
             numCorrect ++;
        }else{
            results.push({"id": value[0],"word":key, "result":"Wrong"})
        }
        console.log(results)
      }
    results.sort((a, b) => (a.id > b.id) ? 1 : -1)

    let result_merged = [];

    for(let i=0; i<results.length; i++) {
        result_merged.push({
        ...results[i], 
        ...flashcards[i]
        });
    }

    let length = result_merged.length;
    score = Math.round(numCorrect/length * 100)

    console.log(result_merged)


    return (
        <div>
            <div style={{ width: "80%" , margin:" 50px auto"}} >
                <h1>Performance</h1>
                <h2>Your Score: {isNaN(score)===true ? 0 : score} %</h2>
            </div>
            
            <TableContainer style={{ width: "80%" , margin:" 50px auto"}} component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize:"1.2rem"}}>Attempted Words</TableCell>
                <TableCell style={{fontSize:"1.2rem"}} align="left">Speech</TableCell>
                <TableCell style={{fontSize:"1.2rem"}} align="left">Definition</TableCell>
                <TableCell style={{fontSize:"1.2rem"}} align="right">Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result_merged.map((row) => (
                <TableRow key={row.word}>
                  <TableCell style={{fontSize:"1rem"}} component="th" scope="row">
                    {row.word}
                  </TableCell>
                  <TableCell style={{fontSize:"1rem"}} align="left">{row.speech}</TableCell>
                  <TableCell style={{fontSize:"1rem"}} align="left">{row.short_definition}</TableCell>
                  <TableCell style={{fontSize:"1rem"}} align="right">{row.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        
      );
}

export default ResultTable;