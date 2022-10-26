import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact'
import AddTicket from './addTicket';
import { useSelector, useDispatch } from "react-redux";
import ViewTicket from './viewTicket/viewTicket';
import { helpDeskRequests } from 'src/API/helpDeskApi';
import moment from 'moment';
import { isAddTicketClickedAction } from 'src/redux/HelpDesk/helpDesk.actions';
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import {
    isViewTicketClickedAction,
    viewTicketDataAction,
    viewTicketCommentsAction
} from "src/redux/HelpDesk/helpDesk.actions";

const HelpDesk = () => {
    var action = "";

    const [columnsAndRows, setColumnsAndRows] = useState([])
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.login.currentUser);
    const state = useSelector((state) => state.helpDesk);

    useEffect(() => {
        getEmployeeTickets();
    }, [])

    const handleView = async (ticket) => {
    
        dispatch(
            viewTicketDataAction(ticket)
        );

        dispatch(isViewTicketClickedAction(true));
    };


    function setSelectedRow(rowData) {
        if (action == "") {
            return;
        } else {
            switch (action) {
                case "view":
                    handleView(rowData);
                    break;
                default:
                    break;
            }
        }
        console.log("rowData", rowData);
        console.log("action", action);
    }

    const getEmployeeTickets = async () => {
        const result = await helpDeskRequests.getEmployeeTicketsApi(currentUser?.Profile?.id);


        var tempArr = []
        result.data.map(x => {

            tempArr.push(
                {
                    ...x,
                    date: moment(x.date).format("DD MMM YYYY hh:mm:A"),
                    action: (
                        <>
                            <FiEye
                                onClick={() => (action = "view")}
                                style={{ color: "blue", cursor: "pointer" }}
                            />
                            {/*   <FiEdit
                                onClick={() => (action = "edit")}
                                style={{
                                  color: "orange",
                                  marginLeft: "20px",
                                  cursor: "pointer",
                                }}
                              /> */}
                            {/* <FiTrash
                                // onClick={() => (action = "delete")}
                                style={{
                                  color: "red",
                                  marginLeft: "20px",
                                  cursor: "not-allowed",
                                }}
                              /> */}
                        </>
                    ),
                    clickEvent: setSelectedRow

                }
            )
        })


        var attendenceData = {
            columns: [
                {
                    label: "Title",
                    field: "title",
                    width: 200,
                },
                {

                    label: "Category",
                    field: "category",
                    width: 200,
                },
                {
                    label: "Description",
                    field: "description",
                    width: 100,
                },
                {
                    label: "Date",
                    field: "date",
                    width: 100,
                },
                {
                    label: "Status",
                    field: "status",
                    width: 200,
                },
                {
                    label: "Actions",
                    field: "action",
                    width: 200,
                },




            ], rows: tempArr
        };
        setColumnsAndRows(attendenceData);

    }

    const addTicketAction = () => {
        dispatch(isAddTicketClickedAction(true));
        getEmployeeTickets();
    }

    return (

        <div className='app'>
            <>
                {state.isAddTicketClicked ? (
                    <AddTicket />
                ) : state.isViewTicketClicked ?
                    <ViewTicket /> :
                    <>
                        <button
                            type='button'
                            className='btn btn-outline-primary col-sm-2'
                            onClick={() => addTicketAction()}
                        >
                            Add Ticket
                        </button>
                        <MDBDataTable
                            className='mdbDataTableDesign'
                            infoLabel={['Showing', 'to', 'of', 'Records']}
                            bordered
                            displayEntries={false}
                            hover
                            entries={100}
                            pagesAmount={4}
                            data={columnsAndRows}
                        />
                    </>
                }
            </>
        </div>
    )
}

export default HelpDesk;