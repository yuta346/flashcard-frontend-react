import React, {useState, useEffect} from "react";
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
// import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";

// const columns = [
//   { field: 'id', headerName: 'ID', width: 130 },
//   { field: 'word', headerName: 'Word', width: 150 },
//   { field: 'short_definition', headerName: 'Definition', width: 500 },
//   { field: 'isMastered', headerName: 'Status', width: 150 },
//   { field: 'pending', headerName: 'Pending Word', width: 200 }
// ];
const columns = [
  {
    id: 'word',
    label: 'Word',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'short_definition',
    label: 'Definition',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'isMastered',
    label: 'Status',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Last Studied Date',
    minWidth: 100,
    align: 'left',

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


export default function ActivityWordsTable({userWords}) {

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


  console.log(userWords)

  // return (
  //   <div style={{ height: 400, width: '80%' ,margin:"auto"}}>
  //     <DataGrid rows={userWords} columns={columns} pageSize={5} checkboxSelection />
  //   </div>
  // );
  return (
    <div>
    <Paper className={classes.root} >
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{backgroundColor:"#0088FE"}}>
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
            {userWords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
        count={userWords.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}
