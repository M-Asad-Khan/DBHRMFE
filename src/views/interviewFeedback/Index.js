import React, { useState, useEffect } from "react";
import {
  updateNewFeedbackAction,
  updateIsAddFeedbackClickedAction,
  updateFeedbacksAction,
  updateIsEditFeedbackClickedAction,
  updateFeedbacksDataTableAction,
  updateIsViewFeedbackClickedAction,
} from "../../redux/interviewFeedback/interviewFeedback.actions";
import { useSelector, useDispatch } from "react-redux";
import ViewFeedback from "./ViewinterviewFeedback/viewFeedback";

import AddinterviewFeedback from "./addinterviewFeedback/interviewFeedback";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import { MDBDataTable } from "mdbreact";
import { interviewFeedbackRequests } from "src/API/interviewFeedbackApi";

function Feedbacks() {
  debugger;
  var action = "";

  const hrState = useSelector((state) => state.interviewFeedback);
  const dispatch = useDispatch();
  const [columnsAndRows, setColumnsAndRows] = useState({});

  useEffect(() => {
    debugger;
    handleGetFeedbackApi();
  }, []);
  useEffect(() => {
    if (
      hrState.isAddFeedbackClicked === false ||
      hrState.isEditFeedbackClicked === false
    ) {
      handleGetFeedbackApi();
    }
  }, [hrState.isAddFeedbackClicked, hrState.isEditFeedbackClicked]);

  useEffect(() => {
    debugger;
    setColumnsAndRows(hrState.feedbacksDataTable);
  }, [hrState.feedbacksDataTable]);

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

  const handleDelete = async (feedback) => {
    debugger;
    try {
      const res = await interviewFeedbackRequests.deleteFeedbackApi(
        feedback.id
      );
      if (res.error === false) {
        handleGetFeedbackApi();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (feedback) => {
    debugger;
    dispatch(updateNewFeedbackAction(feedback));
    dispatch(updateIsEditFeedbackClickedAction(true));
  };
  /* const handleView = async(feedback) => {
    debugger;
    try {
      const res = await interviewFeedbackRequests.GetClientProjectsApi(client.id);
      if (res.error === false) {
        dispatch(updateIsViewClientClickedAction(true));
        dispatch(updateNewClientAction({client:client,projects:res.data}));
      }
    } catch (err) {
      console.log(err);
    }
  }; */
  const handleGetFeedbackApi = async () => {
    try {
      const res = await interviewFeedbackRequests.getFeedackApi();
      debugger;
      if (res.error === false) {
        dispatch(updateFeedbacksAction(res.data));
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
        var tempObj = { ...hrState.feedbacksDataTable, rows: tempArr };
        dispatch(updateFeedbacksDataTableAction(tempObj));
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleAddFeedback() {
    dispatch(updateIsAddFeedbackClickedAction(true));
  }
  console.log("hrState", hrState);

  return (
    <>
      {hrState.isViewFeedbackClicked ? (
        <ViewFeedback />
      ) : hrState.isAddFeedbackClicked === true ||
        hrState.isEditFeedbackClicked === true ? (
        <>
          <AddinterviewFeedback />
        </>
      ) : (
        <div className="card mt-0">
          <button
            type="button"
            className="btn btn-outline-primary col-sm-2"
            onClick={() => handleAddFeedback()}
          >
            Add Feedback
          </button>

          <MDBDataTable
            className="mdbDataTableDesign"
            infoLabel={["Showing", "to", "of", "feedbacks"]}
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
export default Feedbacks;