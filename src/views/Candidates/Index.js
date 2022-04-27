import React, { useState, useEffect } from "react";
import {
  updateNewCandidateAction,
  updateIsAddCandidateClickedAction,
  updateCandidatesAction,
  updateIsEditCandidateClickedAction,
  updateCandidatesDataTableAction,
  updateIsViewCandidateClickedAction,
} from "../../redux/Candidates/candidates.actions";
import { useSelector, useDispatch } from "react-redux";
/* import ViewClient from "./ViewClient/ViewClient"; */
import Addcandidates from "./addCandidate/Candidates";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import { MDBDataTable } from "mdbreact";
import { candidateRequests } from "src/API/CandidateApi";

function Candidates() {
  debugger;
  var action = "";

  const hrState = useSelector((state) => state.candidate);
  const dispatch = useDispatch();
  const [columnsAndRows, setColumnsAndRows] = useState({});

  useEffect(() => {
    debugger;
    handleGetCandidatesApi();
  }, []);
  useEffect(() => {
    if (
      hrState.isAddCandidateClicked === false ||
      hrState.isEditCandidateClicked === false
    ) {
      handleGetCandidatesApi();
    }
  }, [hrState.isAddCandidateClicked, hrState.isEditCandidateClicked]);

  useEffect(() => {
    debugger;
    setColumnsAndRows(hrState.candidatesDataTable);
  }, [hrState.candidatesDataTable]);

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

  const handleDelete = async (candidate) => {
    debugger;
    try {
      const res = await candidateRequests.deleteCandidateApi(candidate.id);
      if (res.error === false) {
        handleGetCandidatesApi();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (candidate) => {
    debugger;
    dispatch(updateNewCandidateAction(candidate));
    dispatch(updateIsEditCandidateClickedAction(true));
  };
  /* const handleView = async(candidate) => {
    debugger;
    try {
      const res = await candidateRequests.GetClientProjectsApi(client.id);
      if (res.error === false) {
        dispatch(updateIsViewClientClickedAction(true));
        dispatch(updateNewClientAction({client:client,projects:res.data}));
      }
    } catch (err) {
      console.log(err);
    }
  }; */
  const handleGetCandidatesApi = async () => {
    try {
      const res = await candidateRequests.getCandidatesApi();
      debugger;
      if (res.error === false) {
        dispatch(updateCandidatesAction(res.data));
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
        var tempObj = { ...hrState.candidatesDataTable, rows: tempArr };
        dispatch(updateCandidatesDataTableAction(tempObj));
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleAddCandidate() {
    dispatch(updateIsAddCandidateClickedAction(true));
  }
  console.log("hrState", hrState);

  return (
    <>
      {hrState.isViewCandidateClicked ? (
        <ViewCandidate />
      ) : hrState.isAddCandidateClicked === true ||
        hrState.isEditCandidateClicked === true ? (
        <>
          <Addcandidates />
        </>
      ) : (
        <div className="card mt-0">
          <button
            type="button"
            className="btn btn-outline-primary col-sm-2"
            onClick={()=>handleAddCandidate()}
          >
            Add Client
          </button>

          <MDBDataTable
            className="mdbDataTableDesign"
            infoLabel={["Showing", "to", "of", "candidates"]}
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
export default Candidates;
