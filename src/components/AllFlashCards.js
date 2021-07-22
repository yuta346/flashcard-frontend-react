import React, {useState, useEffect, useContext} from "react";
import axios from "axios"
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
        root: {
            '& .super-app-theme--header': {
            fontSize:"1.2rem",
            },
            '& div[data-rowIndex][role="row"]': {
                fontSize: "1rem",
        }
        },
        });

const AllFlashCards = () =>{

    const [allFlashCards, setAllFlashCards] = useState([])
    const [selected, setSelected] = useState([])
    // const {setPendingLength} = useContext(PendingContext)
    const columns = [
    { field: 'word', headerName: 'Word', width: 130, headerClassName: 'super-app-theme--header' },
    { field: 'short_definition', headerName: 'Definition', width: 500, headerClassName: 'super-app-theme--header' },
    { field: 'example', headerName: 'Example', width: 500, headerClassName: 'super-app-theme--header' },
    ];

    const classes = useStyles();

    useEffect(()=>{
            const f = async ()  =>{
                const response = await axios.post('http://127.0.0.1:5000/api/display/all/flashcards', {"session_id":sessionStorage.getItem("session_id")});
                const all_flashcards= response.data.all_flashcards
                setAllFlashCards(all_flashcards)
        }
        f()
    },[])

    return (
    <div>
        <h1 style={{ margin:"60px 0 0 146px", fontSize:"2.2rem"}}>All Flashcards</h1>
        <div style={{ height: 550, width: '80%', margin:"60px auto"}}>
        <DataGrid rows={allFlashCards} 
                  columns={columns} 
                  pageSize={10} 
                  rowHeight={55}
                  checkboxSelection={true} 
                  autoHeight {...allFlashCards}
                  onSelectionModelChange={(e) => {
                        const selectedIDs = new Set(e.selectionModel);
                        const selectedRowData = allFlashCards.filter((row) =>
                            selectedIDs.has(row.id)
                        );
                        setSelected(oldArray => [...oldArray, selectedRowData]);
                        }}
                  className={classes.root}
        />
            {/* <div class="pending-btn-container">
                <button className="pending-approve-btn"
                        onClick={approveHandler}
                >
                    APPROVE
                </button>
                <button className="pending-decline-btn"
                        onClick={declineHandler}
                >
                    DECLINE
                </button>
            </div> */}
        </div>
    </div>
  );

}

export default AllFlashCards;

