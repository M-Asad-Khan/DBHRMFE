import {
    updateNewPosting,
    updateIsAddPostingClicked,
    updatePostings,
    updateIsEditPostingClicked,
      updatePostingsDataTable,
      updateIsViewPostingClicked,
  } from "./jobPosting.types";
  
  const INITIAL_STATE = {
    postings: [],
    newPosting: {},
    isAddPostingClicked: null,
    isEditPostingClicked: null,
    postingsDataTable: {
      columns: [ 
        {
          label: "Job Title",
          field: "jobTitle",
          width: 270,
        },
        {
          label: "Work Experience",
          field: "workExperience",
          width: 200,
        },
        {
          label: "Vacant Positions",
          field: "vacantPositions",
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
      isViewPostingClicked:null
  
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case updateNewPosting:
        return {
          ...state,
          newPosting: action.payload,
        };
  
      case updatePostings:
        return {
          ...state,
          postings: action.payload,
        };
  
      case updateIsAddPostingClicked:
        return {
          ...state,
          isAddPostingClicked: action.payload,
        };
  
      case updateIsEditPostingClicked:
        return {
          ...state,
          isEditPostingClicked: action.payload,
        };
      case updatePostingsDataTable:
        return {
          ...state,
          postingsDataTable: action.payload,
              };
              case updateIsViewPostingClicked:
                  return {
                      ...state,
                      isViewPostingClicked: action.payload,
                  };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  