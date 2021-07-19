import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom"
import axios from "axios"
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
        root: {
            '& .super-app-theme--header': {
            fontSize:"1.2rem"
            },
        },
        });

const PendingWords = () =>{

    const [pendingWords, setPendingWords] = useState([])
    const [selected, setSelected] = useState([])
    const [statusMessage, setStatusMessage] = useState("")
    const history = useHistory()
    const columns = [
    { field: 'word', headerName: 'Word', width: 130, headerClassName: 'super-app-theme--header' },
    { field: 'short_definition', headerName: 'Definition', width: 500, headerClassName: 'super-app-theme--header' },
    { field: 'example', headerName: 'Example', width: 500, headerClassName: 'super-app-theme--header' },
    ];

    const classes = useStyles();

    useEffect(()=>{
            const f = async ()  =>{
                const response = await axios.post('http://127.0.0.1:5000/api/display/words/pending', {"session_id":sessionStorage.getItem("session_id")});
                const pending_words= response.data.pending_words
                setPendingWords(pending_words)
        }
        f()
    },[])

    const addHandler = async () =>{
        setStatusMessage(false)
        const response = await axios.post("http://127.0.0.1:5000/api/update/pending",{"session_id":sessionStorage.getItem("session_id"), "selected":selected.slice(-1)[0]})
        const pending_words= response.data.pending_words
        setPendingWords(pending_words)
    }

    const removeHandler = () =>{
        
    }

    return (
    <div>
        <h1 style={{ margin:"60px 0 0 146px", fontSize:"2.2rem"}}>Pending Words</h1>
        <div style={{ height: 550, width: '80%', margin:"60px auto"}}>
        <DataGrid rows={pendingWords} 
                  columns={columns} 
                  pageSize={10} 
                  rowHeight={55}
                  checkboxSelection={true} 
                  onSelectionModelChange={(e) => {
                        const selectedIDs = new Set(e.selectionModel);
                        const selectedRowData = pendingWords.filter((row) =>
                            selectedIDs.has(row.id)
                        );
                        setSelected(oldArray => [...oldArray, selectedRowData]);
                        }}
                  className={classes.root}
        />
        <button className="pending-add-btn"
                onClick={addHandler}>APPROVE</button>
        </div>
    </div>
  );

}

export default PendingWords;

