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
import Select from "react-select";

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 150) : text}
            <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "...read more" : " show less"}
            </span>
        </p>
    );
};

const AdminHelpDesk = () => {


    const [columnsAndRows, setColumnsAndRows] = useState([])
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.login.currentUser);
    const state = useSelector((state) => state.helpDesk);
    const [ticketsStatusCount, setTicketsStatusCount] = useState({});

    useEffect(() => {
        fetchAllTickets();

    }, [])

    const handleView = (ticket) => {

        dispatch(
            viewTicketDataAction(ticket)
        );

        dispatch(isViewTicketClickedAction(true));
    };

    const updateStatus = async (param, x) => {
        x.status = param.value;
        await helpDeskRequests.addTicketApi(x);
        fetchAllTickets();
    }


    const fetchAllTickets = async () => {
        const result = await helpDeskRequests.getAllTicketsApi();

        const ticketStatus = {
            review: 0,
            progress: 0,
            resolved: 0,
            declined: 0
        };
        var tempArr = []
        result.data.map(x => {
            if (x.status == "In Review") {
                ticketStatus.review = ticketStatus?.review + 1;
            }
            if (x.status == "In Progress") {
                ticketStatus.progress = ticketStatus?.progress + 1;
            }
            if (x.status == "Resolved") {
                ticketStatus.resolved = ticketStatus?.resolved + 1;
            }
            if (x.status == "Declined") {
                ticketStatus.declined = ticketStatus?.declined + 1;
            }
            tempArr.push(
                {
                    ...x,
                    name: x.employee.name,
                    date: moment(x.date).format("DD MMM YYYY hh:mm:A"),
                    statusValue: x.status,
                    description: (<ReadMore>
                        {x.description}
                    </ReadMore>),
                    status: (
                        <Select
                            // styles={customStyles}
                            value={{
                                label: x.status
                                    ? x.status

                                    : null,
                                value: x.status
                            }}

                            options={[
                                { label: "In Review", value: "In Review", field: "category" },
                                { label: "In Progress", value: "In Progress", field: "category" },
                                { label: "Resolved", value: "Resolved", field: "category" },
                                { label: "Declined", value: "Declined", field: "category" },

                            ]}
                            onChange={(param) => updateStatus(param, x)}
                        ></Select>
                    ),
                    action: (
                        <>
                            <FiEye
                                onClick={() => handleView(x)}
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
                    // clickEvent: setSelectedRow

                }
            )
        })
        setTicketsStatusCount(ticketStatus)

        var ticketsData = {
            columns: [
                {
                    label: "Employee Name",
                    field: "name",
                    width: 120,
                },
                {
                    label: "Title",
                    field: "title",
                    width: 140,
                },
                {

                    label: "Category",
                    field: "category",
                    width: 100,
                },
                {
                    label: "Description",
                    field: "description",
                    width: 400,
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
                    width: 30,
                },




            ], rows: tempArr
        };
        setColumnsAndRows(ticketsData);

    }


    return (

        <div className='app'>
            <>
                {state.isViewTicketClicked ?
                    <ViewTicket /> :
                    <>

                        <div className="container-fluid px-1 mx-auto">
                            <div className="card">
                                <div className="row justify-content-between text-left" style={{ paddingLeft: "120px", paddingRight: "120px" }}>

                                    <div className="form-group col-sm-3 flex-column d-flex" style={{ backgroundColor: "#3399FF", justifyContent: "center", border: "solid 1px white", borderRadius: "20px", width: "110px", height: "110px" }}>
                                        <p style={{ textAlign: "center", color: "white" }}>In Review</p>
                                        <p style={{ textAlign: "center", color: "white" }}>{ticketsStatusCount?.review}</p>

                                    </div>
                                    <div className="form-group col-sm-3 flex-column d-flex" style={{ backgroundColor: "#E59F14", justifyContent: "center", border: "solid 1px white", borderRadius: "20px", width: "110px", height: "110px" }}>
                                        <p style={{ textAlign: "center", color: "white" }}>In Process</p>
                                        <p style={{ textAlign: "center", color: "white" }}>{ticketsStatusCount?.progress}</p>

                                    </div>
                                    <div className="form-group col-sm-3 flex-column d-flex" style={{ backgroundColor: "green", justifyContent: "center", border: "solid 1px white", borderRadius: "20px", width: "110px", height: "110px" }}>
                                        <p style={{ textAlign: "center", color: "white" }}>Resolved</p>
                                        <p style={{ textAlign: "center", color: "white" }}>{ticketsStatusCount.resolved}</p>

                                    </div>
                                    <div className="form-group col-sm-3 flex-column d-flex" style={{ backgroundColor: "#E55353", justifyContent: "center", border: "solid 1px white", borderRadius: "20px", width: "110px", height: "110px" }}>
                                        <p style={{ textAlign: "center", color: "white" }}>Declined</p>
                                        <p style={{ textAlign: "center", color: "white" }}>{ticketsStatusCount?.declined}</p>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <MDBDataTable
                            className='mdbDataTableDesign'
                            infoLabel={['Showing', 'to', 'of', 'Records']}
                            bordered
                            displayEntries={false}
                            entries={100}
                            pagesAmount={4}
                            sortable={true}
                            striped
                            scrollX
                            data={columnsAndRows}
                        />
                    </>
                }
            </>
        </div>
    )
}

export default AdminHelpDesk;