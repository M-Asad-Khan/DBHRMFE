import {
    addTicket,
    isAddTicketClicked,
    isViewTicketClicked,
    viewTicketData,
    viewTicketComments,
    newTicketComments
} from "./helpDesk.types";

const INITIAL_STATE = {

    ticketDataTable: {
        columns: [{
            label: "title",
            field: "title",
            width: 270,
        },
        {
            label: "category",
            field: "category",
            width: 200,
        },
        {
            label: "description",
            field: "description",
            width: 200,
        },
        {
            label: "date",
            field: "date",
            width: 200,
        },
        {
            label: "status",
            field: "status",
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
    ticket: {},
    isViewTicketClicked: null,
    isAddTicketClicked: null,
    viewTicketData: {},
    ticketComments: [],
    newTicketComment: {}
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case addTicket:
            return {
                ...state,
                ticket: action.payload,
            };

        case isAddTicketClicked:
            return {
                ...state,
                isAddTicketClicked: action.payload,
            };

        case isViewTicketClicked:
            return {
                ...state,
                isViewTicketClicked: action.payload,
            };

        case viewTicketData:
            return {
                ...state,
                viewTicketData: action.payload,
            };

        case viewTicketComments:
            return {
                ...state,
                ticketComments: action.payload,
            };

        case newTicketComments:
            return {
                ...state,
                newTicketComment: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;