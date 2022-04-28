import {
    updateNewCandidate,
    updateIsAddCandidateClicked,
    updateCandidates,
    updateIsEditCandidateClicked,
    updateCandidatesDataTable,
    updateIsViewCandidateClicked,
    
  } from "./candidates.types";
  
  const INITIAL_STATE = {
    candidates: [],
    newCandidate: {},
    isAddCandidateClicked: null,
    isEditCandidateClicked: null,
    candidatesDataTable:{
      columns: [
        {
          label: "Candidate Name",
          field: "name",
          width: 270,
        },
        {
          label: "Post Applied For",
          field: "postAppliedFor",
          width: 200,
        },
        {
          label: "Action",
          field: "action",
          width: 100,
        },
      ],
      rows: [],
    },
    isViewCandidateClicked:null
    
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case updateNewCandidate:
        return {
          ...state,
          newCandidate: action.payload,
        };
  
      case updateCandidates:
        return {
          ...state,
          candidates: action.payload,
        };
  
          case updateIsAddCandidateClicked:
              debugger;
        return {
          ...state,
          isAddCandidateClicked: action.payload,
        };
  
      case updateIsEditCandidateClicked:
        return {
          ...state,
          isEditCandidateClicked: action.payload,
        };
        case updateCandidatesDataTable:
          return {
            ...state,
            candidatesDataTable: action.payload,
          };
          case updateIsViewCandidateClicked:
            return {
              ...state,
              isViewCandidateClicked: action.payload,
            };
     
  
      default:
        return state;
    }
  };
  
  export default reducer;
  