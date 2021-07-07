import React,{useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const ResultTable = () =>{
    const [isMastered, setIsMastered] = useState(JSON.parse(sessionStorage.getItem("isMastered")))
    console.log(isMastered)

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
    let length = results.length;
    score = Math.round(numCorrect/length * 100)
    console.log(length)
    console.log(score)

    return (
        <div>
            <div style={{ width: "25%" , margin:" 50px auto"}} >
                <h1>Performance</h1>
                <h2>Your Score: {isNaN(score)===true ? 0 : score} %</h2>
            </div>
            
            <TableContainer style={{ width: "25%" , margin:" 50px auto"}} component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize:"1.2rem"}}>Attempted Words</TableCell>
                <TableCell style={{fontSize:"1.2rem"}} align="right">Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row) => (
                <TableRow key={row.word}>
                  <TableCell style={{fontSize:"1rem"}} component="th" scope="row">
                    {row.word}
                  </TableCell>
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