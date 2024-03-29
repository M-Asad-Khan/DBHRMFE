import {
    updateNewFeedback,
    updateIsAddFeedbackClicked,
    updateFeedbacks,
    updateIsEditFeedbackClicked,
    updateFeedbacksDataTable,
    updateIsViewFeedbackClicked,
} from "./interviewFeedback.types";

const INITIAL_STATE = {
    feedbacks: [],
    newFeedback: {},
    isAddFeedbackClicked: null,
    isEditFeedbackClicked: null,
    feedbacksDataTable: {
        columns: [
            {
                label: "Candidate Name",
                field: 'candidateName',
                width: 200,
            },
            {
                label: "Candidate Email",
                field: 'candidateEmail',
                width: 200,
            },
            
            {
                label: "Candidate Phone",
                field: 'candidatePhone',
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
    isViewFeedbackClicked: null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case updateNewFeedback:
            return {
                ...state,
                newFeedback: action.payload,
            };

        case updateFeedbacks:
            return {
                ...state,
                feedbacks: action.payload,
            };

        case updateIsAddFeedbackClicked:

            return {
                ...state,
                isAddFeedbackClicked: action.payload,
            };

        case updateIsEditFeedbackClicked:
            return {
                ...state,
                isEditFeedbackClicked: action.payload,
            };
        case updateFeedbacksDataTable:
            return {
                ...state,
                feedbacksDataTable: action.payload,
            };
        case updateIsViewFeedbackClicked:
            return {
                ...state,
                isViewFeedbackClicked: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;