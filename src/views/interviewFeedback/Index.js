import React, { useState, useEffect } from "react";
import {
  updateNewFeedbackAction,
  updateIsAddFeedbackClickedAction,
  updateFeedbacksAction,
  updateIsEditFeedbackClickedAction,
  updateFeedbacksDataTableAction,
  updateIsViewFeedbackClickedAction,
} from "../../redux/interviewFeedback/interviewFeedback.actions";
import ViewFeedback from "./viewInterviewFeedback/viewFeedback";
import { useSelector, useDispatch } from "react-redux";
import AddinterviewFeedback from "./addinterviewFeedback/interviewFeedback";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import { MDBDataTable } from "mdbreact";
import { interviewFeedbackRequests } from "src/API/interviewFeedbackApi";
import { interviewFeedbackFormRequests } from "src/API/interviewFeedbackFormApi";
function Feedbacks() {
  
  var action = "";

  const hrState = useSelector((state) => state.interviewFeedback);
  const dispatch = useDispatch();
  const [columnsAndRows, setColumnsAndRows] = useState({});
  const currentUser = useSelector((state) => state.login.currentUser);


  useEffect(() => {
    
    handleGetFeedbackFormApi();
  }, []);
  useEffect(() => {
    if (
      hrState.isAddFeedbackClicked === false ||
      hrState.isEditFeedbackClicked === false
    ) {
      handleGetFeedbackFormApi();
    }
  }, [hrState.isAddFeedbackClicked, hrState.isEditFeedbackClicked]);

  useEffect(() => {
    
    setColumnsAndRows(hrState.feedbacksDataTable);
  }, [hrState.feedbacksDataTable]);

  function setSelectedRow(rowData) {
    debugger
    
    if (action == "") {
      return;
    } else {
      switch (action) {
        case "delete":
          
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
   /*  console.log("rowData", rowData);
    console.log("action", action); */
  }

  const handleDelete = async (feedback) => {
    
    try {
      const res = await interviewFeedbackFormRequests.deleteinterviewFeedbackFormApi(feedback.candidateId,currentUser.access_token);
      if (res.error === false) {
        handleGetFeedbackFormApi();
      }
    } catch (err) {
     // console.log(err.response.data);
    }
  };
  const handleView = async (feedback) => {
     
    try{
      const res =await interviewFeedbackFormRequests.getOneByIdApi(feedback.candidateId,currentUser.access_token);
      if(res.error === false){
         
        dispatch(updateNewFeedbackAction(res.data));
        
        dispatch(updateIsViewFeedbackClickedAction(true));
      }
    } catch(err){
     // console.log(err);
    }
 
     
  };
  const handleEdit = (feedback) => {
    debugger
   
    
    dispatch(updateNewFeedbackAction(feedback));
    dispatch(updateIsEditFeedbackClickedAction(true));
  };
   
  const handleGetFeedbackFormApi = async () => {
        try {
      const res = await interviewFeedbackFormRequests.getinterviewFeedbackFormApi(currentUser.access_token);
      
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
               
                {/* <FiEdit
                  onClick={() => (action = "edit")}
                  style={{
                    color: "orange",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                /> */}
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
            interviwer: x?.interViewer.name,
            candidateName:x?.candidate.FirstName + " " + x?.candidate.lastName,
            candidateId:x?.candidate.id,
          });
        });
        debugger
       // console.log("test value", tempArr);
        var tempObj = { ...hrState.feedbacksDataTable, rows: tempArr };
        dispatch(updateFeedbacksDataTableAction(tempObj));
      }
    } catch (err) {
      //console.log(err);
    }
  };

  function handleAddFeedback() {
    dispatch(updateIsAddFeedbackClickedAction(true));
  }
 // console.log("hrState", hrState);

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
