import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  {
    id: 'word',
    label: 'Attempted Words',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'definition',
    label: 'Correct Definitions',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'example',
    label: 'Examples',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'result',
    label: 'Results',
    minWidth: 100,
    align: 'center',

    format: (value) => value.toLocaleString('en-US'),
  }
];


const useStyles = makeStyles({
  root: {
    width: '80%',
    margin: '20px auto'
  },
  container: {
    maxHeight: 800,
  },
});

export default function QuizResultTable() {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
      }
    results.sort((a, b) => (a.id > b.id) ? 1 : -1)

    let result_merged = [];
    for(let i=0; i<results.length; i++) {
      result_merged.push({
       ...results[i], 
       ...(flashcards.find((itmInner) => itmInner.word_id === results[i].id))}
      );
    }
    let length = result_merged.length;
    score = Math.round(numCorrect/length * 100)

    console.log("result merged")
    console.log(result_merged)


  return (
    <div>
            <div style={{ width: "80%" , margin:" 0px auto"}} >
                <h1>Performance</h1>
                <h2>Your Score: {isNaN(score)===true ? 0 : score} %</h2>
            </div>
    <Paper className={classes.root} >
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{backgroundColor:"#1DA1F2"}}>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  style={{fontSize:"1.2rem",color:"#FFFF"}}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth , fontSize:"1.2rem", backgroundColor:"#1DA1F2", color:"#FFFF"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {result_merged.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} 
                                 align={column.align} 
                                 style={column.id == "word" ? {fontSize:"1.2rem", fontWeight:"bold"}:{fontSize:"1rem"}}
                                  >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={result_merged.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}
