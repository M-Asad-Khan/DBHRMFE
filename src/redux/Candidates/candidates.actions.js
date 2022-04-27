import {
    updateNewCandidate,
    updateIsAddCandidateClicked,
    updateCandidates,
    updateIsEditCandidateClicked,
    updateCandidatesDataTable,
    updateIsViewCandidateClicked
    
  } from "./candidates.types";
  export const updateNewCandidateAction = (params) => {
    return {
      type: updateNewCandidate,
      payload: params,
    };
  };
  export const updateIsAddCandidateClickedAction = (params) => {
      debugger;
    return {
      type: updateIsAddCandidateClicked,
      payload: params,
    };
  };
  
  export const updateCandidatesAction = (params) => {
    return {
      type: updateCandidates,
      payload: params,
    };
  };
  export const updateIsEditCandidateClickedAction = (params) => {
    return {
      type: updateIsEditCandidateClicked,
      payload: params,
    };
  };
  export const updateCandidatesDataTableAction = (params) => {
    return {
      type: updateCandidatesDataTable,
      payload: params,
    };
  };
  export const updateIsViewCandidateClickedAction = (params) => {
      return {
        type: updateIsViewCandidateClicked,
        payload: params,
      };
    };