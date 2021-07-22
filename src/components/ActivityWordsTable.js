import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles({
  root: {
    width: '80%',
    margin: '20px auto'
  },
  container: {
    maxHeight: 800,
  },
});

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
    minWidth: 200,
    align: 'left',

    format: (value) => value.toLocaleString('en-US'),
  }
];

export default function SimpleTable({userWords}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  console.log(userWords)

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, userWords.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
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
          {userWords
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" style={{fontSize:"1.2rem", fontWeight:"bold"}}>
                  {row.word}
                </TableCell>
                <TableCell align="left" style={{fontSize:"1rem"}}>{row.short_definition}</TableCell>
                <TableCell align="left" style={{fontSize:"1rem"}}>{row.isMastered}</TableCell>
                <TableCell align="left" style={{fontSize:"1rem"}}>{row.date}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={userWords.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
