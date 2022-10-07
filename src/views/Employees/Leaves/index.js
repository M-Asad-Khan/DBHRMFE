import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from "moment"
import './index.css'
import Select from 'react-select'
import { toast } from "react-toastify";
import { CButton, CLink } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { employeeRequests } from 'src/API/EmployeeApi'
import { MDBDataTable } from "mdbreact";
import {
  updateEmployeesLeavesDataTableAction,
  employeeLeavesActionn
} from "../../../redux/Employees/employees.actions";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import ViewLeaves from './viewLeaves.js'


function LeaveCalendar() {
  var action = "";
  const [mark, setMark] = useState([]);
  const [leaveData, setLeavesData] = useState(
    {
      LeaveType: "",
      ApplicationStatus: "Applied",
      Reason: "",
      LeavesDates: []
    }
  )
  const currentUser = useSelector((state) => state.login.currentUser);
  const [columnsAndRows, setColumnsAndRows] = useState([]);
  const [addClick, setAddClick] = useState(false);
  const dispatch = useDispatch();

  const [editLeavesClicked, seteditLeavesClicked] = useState(false);

  const state = useSelector((state) => state.employees);

  useEffect(() => {
    getEmployeeLeaves();
  }, []);

  const handleChange = (evt) => {

    const value = evt.target.value;
    setLeavesData({ ...leaveData, Reason: value })
  }

  function setSelectedRow(rowData) {
    if (action == "") {
      return;
    } else {
      switch (action) {
        case "delete":
          handleDeletLeaves(rowData);
          break;
        case "view":
          handleView(rowData);
          break;
        case "edit":
          setLeavesData(
            {
              id: rowData.id,
              LeaveType: rowData.LeaveType,
              ApplicationStatus: rowData.ApplicationStatus,
              Reason: rowData.Reason,
              LeavesDates: rowData.LeavesDates
            }
          );
          seteditLeavesClicked(true);
          break;

        default:
          break;
      }
    }
  }

  const handleReactSelectChange = (param) => {
    setLeavesData({ ...leaveData, LeaveType: param.value })
  };

  useEffect(() => {
    setColumnsAndRows(state.employeesLeavesDataTable);
  }, [state.employeesLeavesDataTable]);

  const getEmployeeLeaves = async () => {
    const result = await employeeRequests.getEmployeesLeavesApi(currentUser.Profile.id)
    var tempArr = [];
    result.data.map((x) => {
      tempArr.push({
        ...x,
        name: x.employee.name,
        LeavesDates: x.LeavesDates,
        totalLeaves: x.LeavesDates.length,
        daysLeaves: x.LeavesDates.map(leave => { return moment(leave).format("MMM Do YY") + " , " }),
       action:  x.ApplicationStatus == "Applied"? (
          <>

          
            <>
              <FiEdit
                onClick={() => (action = "edit")}
                style={{
                  color: "orange",
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
              />

              <FiTrash
                onClick={() => (action = "delete")}
                style={{
                  color: "red",
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
              />
            
            </>
      
          </>
        ):null,
        clickEvent: x.ApplicationStatus == "Applied"?setSelectedRow:null
      });
    })

    var tempObj = { ...state.employeesLeavesDataTable, rows: tempArr };
    dispatch(updateEmployeesLeavesDataTableAction(tempObj));



    var groupBy = function (xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    let leavesResult = [];
    const groupData = groupBy(result.data, 'LeaveType');
    for (let key in groupData) {
      leavesResult.push({
        leaveType: key,
        availed: groupData[key].reduce(function (accumulator, currentValue) {
          if(currentValue.ApplicationStatus=='Approved'){
          return accumulator + currentValue.LeavesDates.length;
          }
          else{
            return currentValue.ApplicationStatus
          }
        }, 0)
      })

    }

    dispatch(employeeLeavesActionn(leavesResult));
    result.data.map(r => {
      setMark(mark => [...mark, ...r.LeavesDates])
    })
    setLeavesData({
      LeaveType: "",
      ApplicationStatus: "Applied",
      Reason: "",
      LeavesDates: []

    })
  }

  const handleDeletLeaves = async (leaves) => {
    const result = await employeeRequests.deleteLeaves(leaves.id);
    if (result.error) {
      toast.error(result.data);
    } else {
      await getEmployeeLeaves()
      toast.success("Leaves Deleted");
    }
  }


  const onChangeDate = (date) => {
    if (editLeavesClicked) {
      let isAlreadyMarked = mark.find(x => x === date);
      if (isAlreadyMarked) {

        let markerLeaves = mark.filter(m => m != isAlreadyMarked);

        let leaves = leaveData.LeavesDates.filter(m => m != isAlreadyMarked);
        setLeavesData({ ...leaveData, LeavesDates: [...leaves] })
        setMark(markerLeaves);


      }
      else {
        setLeavesData({ ...leaveData, LeavesDates: [...leaveData.LeavesDates, date] })
        // setMark(mark => [...mark, date]);
      }
    }
    else {
      let isAlreadyMarked = leaveData.LeavesDates.find(x => x === date);
      if (isAlreadyMarked) {

        let markerLeaves = mark.filter(m => m != isAlreadyMarked);

        let leaves = leaveData.LeavesDates.filter(m => m != isAlreadyMarked);
        setLeavesData({ ...leaveData, LeavesDates: [...leaves] })
        setMark(markerLeaves);

      }
      else {
        setLeavesData({ ...leaveData, LeavesDates: [...leaveData.LeavesDates, date] })
        // setMark(mark => [...mark, date]);
      }



    }

  }

  const applyLeaves = async () => {
    const leavesData = {

      EmployeeId: currentUser.Profile.id,
      ...leaveData
    }
    setLeavesData({
      LeaveType: "",
      ApplicationStatus: "Applied",
      Reason: "",
      LeavesDates: []
    })

    if (editLeavesClicked) {
      await employeeRequests.updateEmployeeLeavesApi(leavesData);
      seteditLeavesClicked(false);
    }
    else {
      await employeeRequests.addEmployeeLeavesApi(leavesData);
      setAddClick(false)
    }
    await getEmployeeLeaves()
  }

  const onCancel = () => {

    setLeavesData({
      LeaveType: "",
      ApplicationStatus: "Applied",
      Reason: "",
      LeavesDates: []
    })
    setAddClick(false)
    seteditLeavesClicked(false);
  }



  return (
    <div className='app'>
      <>
      <button
              type="button"
              className="btn btn-outline-primary col-sm-2"
              onClick={() => setAddClick(true)}
            >
              Apply Leaves
            </button>
        {/* <ViewLeaves /> */}
      

        {!addClick && !editLeavesClicked ?
          <>
       
            <MDBDataTable
              className="mdbDataTableDesign"
              infoLabel={["Showing", "to", "of", "Records"]}
              bordered
              displayEntries={false}
              hover
              entries={5}
              pagesAmount={4}
              data={columnsAndRows}
            />
          </>
          : <></>
        }
        {addClick ?
          <div className='calendar-container'>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">
                  Leave Type
                </label>
                <Select
                  options={[
                    { label: "Sick Leaves", value: "Sick Leaves" },
                    { label: "Anual Leaves", value: "Anual Leaves" },
                    { label: "Casual Leave", value: "Casual Leave" },
                    { label: "Maternity Leave (ML)s", value: "Maternity Leave (ML)" },
                    { label: "Marriage Leave", value: "Marriage Leave" },
                    { label: "Paternity Leave", value: "Paternity Leave" },
                    { label: "Bereavement Leave", value: "Bereavement Leave" }

                  ]}
                  onChange={handleReactSelectChange}
                  id="LeaveType"
                  name="LeaveType"
                  placeholder="Leave Type"
                ></Select>{" "}
              </div>

              <div className="form-group col-sm-6 flex-column d-flex">

                <label className="form-control-label px-3">
                  Reason
                </label>
                <input

                  value={leaveData.Reason}
                  onChange={handleChange}
                  type="textarea"
                  id="salary"
                  name="salary"
                  placeholder="Leave Reason"

                />
              </div>
            </div>

            <Calendar onChange={(date) => onChangeDate(moment(date).format("MM/DD/YYYY"))}
              tileDisabled={({ date, view }) =>
                (view === "month" && date.getDay() === 0) || (date.getDay() === 6) || (mark.find(x => x === moment(date).format("MM/DD/YYYY")))
              }
              tileClassName={({ date, view }) => {
                if (leaveData.LeavesDates.find(x => x === moment(date).format("MM/DD/YYYY"))) {
                  return 'highlight'
                }
              }}
            />

            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 ">
                <button
                  className="btn-block btn-primary"
                  onClick={() => onCancel()}
                >
                  Cancel
                </button>
              </div>
              <div className="form-group col-sm-6 ">
                <CButton
                  className="btn-block btn-primary"
                  onClick={() => applyLeaves(true)}
                >
                  Submit
                </CButton>
              </div>
            </div>
          </div>
          : <></>
        }


        {/* Edit case */}

        {editLeavesClicked ?
          <div className='calendar-container'>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">
                  Leave Type
                </label>
                <Select
                  options={[
                    { label: "Sick Leaves", value: "Sick Leaves" },
                    { label: "Anual Leaves", value: "Anual Leaves" },
                    { label: "Casual Leave", value: "Casual Leave" },
                    { label: "Maternity Leave (ML)s", value: "Maternity Leave (ML)" },


                    { label: "Marriage Leave", value: "Marriage Leave" },
                    { label: "Paternity Leave", value: "Paternity Leave" },
                    { label: "Bereavement Leave", value: "Bereavement Leave" }

                  ]}
                  onChange={handleReactSelectChange}
                  id="LeaveType"
                  name="LeaveType"
                  placeholder="Leave Type"
                  value={{ label: leaveData.LeaveType }}
                ></Select>{" "}
              </div>

              <div className="form-group col-sm-6 flex-column d-flex">

                <label className="form-control-label px-3">
                  Reason
                </label>
                <input

                  value={leaveData.Reason}
                  onChange={handleChange}
                  type="text"
                  id="salary"
                  name="salary"
                  placeholder="Leave Reason"

                />
              </div>
            </div>

            <Calendar onChange={(date) => onChangeDate(moment(date).format("MM/DD/YYYY"))}
              tileDisabled={({ date, view }) =>
                (view === "month" && date.getDay() === 0) || (date.getDay() === 6) || (mark.find(x => !leaveData.LeavesDates.includes(x) && x === moment(date).format("MM/DD/YYYY")))
              }

              tileClassName={({ date, view }) => {
                if (leaveData.LeavesDates.find(x => x === moment(date).format("MM/DD/YYYY"))) {
                  return 'highlight'
                }
              }}
              activeStartDate={new Date(leaveData.LeavesDates && leaveData.LeavesDates.length > 0 && leaveData.LeavesDates[0])}
            />
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 ">
                <button
                  className="btn-block btn-primary"
                  onClick={() => onCancel()}
                >
                  Cancel
                </button>
              </div>
              <div className="form-group col-sm-6 ">
                <CButton
                  className="btn-block btn-primary"
                  onClick={() => applyLeaves(true)}
                >
                  Update
                </CButton>
              </div>
            </div>
          </div>
          : <></>
        }
      </>



    </div>
  );
}

export default LeaveCalendar;




