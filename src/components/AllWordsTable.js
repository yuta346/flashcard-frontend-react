import React, {useState, useEffect} from "react";
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";

const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'word', headerName: 'Word', width: 150 },
  { field: 'short_definition', headerName: 'Definition', width: 500 },
  { field: 'isMastered', headerName: 'Status', width: 150 },
  { field: 'pending', headerName: 'Pending Word', width: 200 }
];

export default function AllWordsTable({userWords}) {

  console.log(userWords)

  return (
    <div style={{ height: 400, width: '80%' ,margin:"auto"}}>
      <DataGrid rows={userWords} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
