import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StudyFlashCardTable = ({flashCards}) =>{

    return (
        <div>
            <div style={{ width: "80%" , margin:" 20px auto"}} >
                <h1 style={{fontSize:"20px"}}>{flashCards.length} Flashcards in this Set</h1>
            </div>
            
            <TableContainer style={{ width: "80%" , margin:" 20px auto"}} component={Paper}>
            <Table aria-label="simple table">
            <TableHead style={{backgroundColor:"#0F5298"}}>
              <TableRow>
                <TableCell style={{fontSize:"1.2rem",color:"#FFFF"}}>Word</TableCell>
                <TableCell style={{fontSize:"1.2rem",color:"#FFFF"}} align="left">Definition</TableCell>
                <TableCell style={{fontSize:"1.2rem",color:"#FFFF"}} align="left">Example</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flashCards.map((row) => (
                <TableRow key={row.word}>
                  <TableCell style={{fontSize:"1.2rem", fontWeight:"bold"}} component="th" scope="row">
                    {row.word}
                  </TableCell>
                  <TableCell style={{fontSize:"1rem"}} align="left">{row.definition}</TableCell>
                  <TableCell style={{fontSize:"1rem"}} align="left">{row.example ? row.example : "Not Available"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        
      );

}

export default StudyFlashCardTable;