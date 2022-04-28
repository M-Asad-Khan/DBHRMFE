import {
    updateNewPosting,
    updateIsAddPostingClicked,
    updatePostings,
    updateIsEditPostingClicked,
      updatePostingsDataTable,
      updateIsViewPostingClicked
  } from "./jobPosting.types";
  
  export const updateNewPostingAction = (params) => {
    return {
      type: updateNewPosting,
      payload: params,
    };
  };
  export const updateIsAddPostingClickedAction = (params) => {
      debugger;
    return {
      type: updateIsAddPostingClicked,
      payload: params,
    };
  };
  
  export const updatePostingsAction = (params) => {
    return {
      type: updatePostings,
      payload: params,
    };
  };
  
  export const updateIsEditPostingClickedAction = (params) => {
    return {
      type: updateIsEditPostingClicked,
      payload: params,
    };
  };
  export const updatePostingsDataTableAction = (params) => {
    return {
      type: updatePostingsDataTable,
      payload: params,
    };
  };
  export const updateIsViewPostingClickedAction = (params) => {
        return {
          type: updateIsViewPostingClicked,
          payload: params,
        };
      };
  