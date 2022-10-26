import {
    addTicket,
    isAddTicketClicked,
    isViewTicketClicked,
    viewTicketData,
    viewTicketComments,
    newTicketComments
} from "./helpDesk.types";

export const addTicketAction = (params) => {
    return {
        type: addTicket,
        payload: params,
    };
};

export const isAddTicketClickedAction = (params) => {
    return {
        type: isAddTicketClicked,
        payload: params,
    };
};

export const isViewTicketClickedAction = (params) => {
    return {
        type: isViewTicketClicked,
        payload: params,
    };
};

export const viewTicketDataAction = (params) => {
    return {
        type: viewTicketData,
        payload: params,
    };
};

export const viewTicketCommentsAction = (params) => {
    return {
        type: viewTicketComments,
        payload: params,
    };
};


export const newTicketCommentActions = (params) => {
    return {
        type: newTicketComments,
        payload: params,
    };
};
