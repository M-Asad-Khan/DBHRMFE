import {
    updateNewFeedback,
    updateIsAddFeedbackClicked,
    updateFeedbacks,
    updateIsEditFeedbackClicked,
    updateFeedbacksDataTable,
    updateIsViewFeedbackClicked
} from "./interviewFeedback.types";

export const updateNewFeedbackAction = (params) => {
    return {
        type: updateNewFeedback,
        payload: params,
    };
};
export const updateIsAddFeedbackClickedAction = (params) => {

    return {
        type: updateIsAddFeedbackClicked,
        payload: params,
    };
};

export const updateFeedbacksAction = (params) => {
    return {
        type: updateFeedbacks,
        payload: params,
    };
};
export const updateIsEditFeedbackClickedAction = (params) => {
    return {
        type: updateIsEditFeedbackClicked,
        payload: params,
    };
};
export const updateFeedbacksDataTableAction = (params) => {
    return {
        type: updateFeedbacksDataTable,
        payload: params,
    };
};
export const updateIsViewFeedbackClickedAction = (params) => {
    return {
        type: updateIsViewFeedbackClicked,
        payload: params,
    };
};