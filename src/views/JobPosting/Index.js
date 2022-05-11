import React, { useState, useEffect } from "react";
import {
  updateNewPostingAction,
  updateIsAddPostingClickedAction,
  updatePostingsAction,
  updateIsEditPostingClickedAction,
  updatePostingsDataTableAction,
  updateIsViewPostingClickedAction

} from "../../redux/jobPosting/jobPosting.actions";
import { useSelector, useDispatch } from "react-redux";
import ViewjobPosting from "./ViewjobPosting/ViewJobposting"
import Addposting from "./addjobPosting/jobPosting";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import { MDBDataTable } from "mdbreact";
import { jobPostingRequests } from "src/API/JobPostingApi";

function JobPosting() {
  debugger;
  var action = "";

  const hrState = useSelector((state) => state.jobPosting);
  const dispatch = useDispatch();
  const [columnsAndRows, setColumnsAndRows] = useState({});

  useEffect(() => {
    debugger;
    handleGetjobPostingApi();
  }, []);
  useEffect(() => {
    if (
      hrState.isAddPostingClicked === false ||
      hrState.isEditPostingClicked === false
    ) {
      handleGetjobPostingApi();
    }
  }, [hrState.isAddPostingClicked, hrState.isEditPostingClicked]);

  useEffect(() => {
    debugger;
    setColumnsAndRows(hrState.postingsDataTable);
  }, [hrState.postingsDataTable]);

  function setSelectedRow(rowData) {
    debugger;
    if (action == "") {
      return;
    } else {
      switch (action) {
        case "delete":
          debugger;
          handleDelete(rowData);
          break;
        case "view":
          handleView(rowData);
          break;
        case "edit":
          handleEdit(rowData);
          break;

        default:
          break;
      }
    }
    console.log("rowData", rowData);
    console.log("action", action);
  }

  const handleDelete = async (positions) => {
    debugger;
    try {
      const res = await jobPostingRequests.deletejobPostingApi(positions.id);
      if (res.error === false) {
        handleGetjobPostingApi();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (positions) => {
    debugger;
    dispatch(updateNewPostingAction(positions));
    dispatch(updateIsEditPostingClickedAction(true));
  };
  const handleView = async(positions) => {
    debugger;
    
        dispatch(updateIsViewPostingClickedAction(true));
        dispatch(updateNewPostingAction(positions));
      
  }; 
  const handleGetjobPostingApi = async () => {
    try {
      const res = await jobPostingRequests.getjobPostingsApi();
      debugger;
      if (res.error === false) {
        dispatch(updatePostingsAction(res.data));
        var tempArr = [];
        res.data.map((x) => {
          tempArr.push({
            ...x,
            action: (
              <>
                <FiEye
                  onClick={() => (action = "view")}
                  style={{ color: "blue", cursor: "pointer" }}
                />
                <FiEdit
                  onClick={() => (action = "edit")}
                  style={{
                    color: "orange",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                />
                <FiTrash
                  // onClick={() => (action = "delete")}
                  style={{
                    color: "red",
                    marginLeft: "20px",
                    cursor: "not-allowed",
                  }}
                />
              </>
            ),
            clickEvent: setSelectedRow,
          });
        });
        debugger;
        console.log("eventarr", tempArr);
        var tempObj = { ...hrState.postingsDataTable, rows: tempArr };
        dispatch(updatePostingsDataTableAction(tempObj));
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleAddPositions() {
    dispatch(updateIsAddPostingClickedAction(true));
  }
  console.log("hrState", hrState);

  return (
    <>
      {hrState.isViewPostingClicked ? (
        <ViewjobPosting />
      ) : hrState.isAddPostingClicked === true ||
        hrState.isEditPostingClicked === true ? (
        <>
          <Addposting />
        </>
      ) : (
        <div className="card mt-0">
          <button
            type="button"
            className="btn btn-outline-primary col-sm-2"
            onClick={()=>handleAddPositions()}
          >
            Add Job Positions
          </button>

          <MDBDataTable
            className="mdbDataTableDesign"
            infoLabel={["Showing", "to", "of", "jobPosting"]}
            bordered
            displayEntries={false}
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={columnsAndRows}
          />
        </div>
      )}
    </>
  );
}
export default JobPosting;
