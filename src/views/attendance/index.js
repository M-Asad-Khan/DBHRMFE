import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact'
import { CButton } from '@coreui/react';
import { attendanceRequests } from 'src/API/attendanceApi';
import { useSelector } from "react-redux";
import moment from 'moment';
const Attendance = () => {
    const [columnsAndRows, setColumnsAndRows] = useState([])
    const [dateState, setDateState] = useState(new Date());

    const currentUser = useSelector((state) => state.login.currentUser);

    useEffect(() => {

        getAttendance();
    }, [])


    const getAttendance = async () => {
        const result = await attendanceRequests.getEmployeeAttendanceApi(currentUser?.Profile?.id);


        var tempArr = []
        result.data.map(x => {

            tempArr.push(
                {
                    date: moment(x.date).format("DD MMM YYYY hh:mm:A"),
                    checkin: moment(x.checkin).format("DD MMM YYYY hh:mm:A")

                }
            )
        })


        var attendenceData = {
            columns: [
                {
                    label: "Date",
                    field: "date",
                    width: 270,
                },
                {

                    label: "Check-In",
                    field: "checkin",
                    width: 270,
                },
                {
                    label: "Break-In",
                    field: "breakin",
                    width: 200,
                },
                {
                    label: "Break-Out",
                    field: "breakout",
                    width: 200,
                },
                {
                    label: "Check-Out",
                    field: "checkout",
                    width: 200,
                },

                {
                    label: "Required",
                    field: "ApplicationStatus",
                    width: 200,
                },
                {
                    label: "Hours",
                    field: "ApplicationStatus",
                    width: 200,
                }




            ], rows:tempArr
        };
        setColumnsAndRows(attendenceData);

    }

    const markAttendance = async (type) => {

        await attendanceRequests.addAttendanceApi({ date: new Date(), employeeid: currentUser?.Profile?.id, checkin: new Date() })

    }


    useEffect(() => {
        setInterval(() => setDateState(new Date()), 10000);
    }, []);

    return (
        <div className='app'>
            <div className="row justify-content-between text-left">

                <div className="form-group col-sm-2 flex-column d-flex" >

                    <CButton
                        color="danger"
                        // className="btn-block btn-primary"
                        onClick={() => markAttendance("Check In")}
                    >
                        Check In {<p style={{ fontSize: "12px" }}>
                            {' '}
                            {dateState.toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                            {' '}
                            {dateState.toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                        </p>}
                    </CButton>
                </div>
                <div className="form-group col-sm-2 flex-column d-flex" >

                    <CButton
                        color="danger"
                        // className="btn-block btn-primary"
                        onClick={() => markAttendance("Check In")}
                    >
                        Break In
                        {<p style={{ fontSize: "12px" }}>
                            {' '}
                            {dateState.toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                            {' '}
                            {dateState.toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                        </p>}
                    </CButton>
                </div>


                <div className="form-group col-sm-2 flex-column d-flex" >

                    <CButton
                        color="danger"
                        // className="btn-block btn-primary"
                        onClick={() => markAttendance("Check In")}
                    >
                        Break Out
                        {<p style={{ fontSize: "12px" }}>
                            {' '}
                            {dateState.toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                            {' '}
                            {dateState.toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                        </p>}
                    </CButton>

                </div>

                <div className="form-group col-sm-2 flex-column d-flex" >

                    <CButton
                        color="danger"
                        // className="btn-block btn-primary"
                        onClick={() => markAttendance("Check In")}
                    >
                        Check Out
                        {<p style={{ fontSize: "12px" }}>
                            {' '}
                            {dateState.toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                            {' '}
                            {dateState.toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                        </p>}
                    </CButton>
                </div>

            </div>

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

        </div>
    )
}

export default Attendance;