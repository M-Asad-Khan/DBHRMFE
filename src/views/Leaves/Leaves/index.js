import { useState, useEffect, useRef } from 'react';
import moment from "moment"
import './index.css'
import { useSelector, useDispatch } from "react-redux";
import { employeeRequests } from 'src/API/EmployeeApi'
import { MDBDataTable, MDBDate } from "mdbreact";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTable, CButton } from "@coreui/react"
import {
  updateEmployeesLeavesDataTableAction
} from "../../../redux/Employees/employees.actions";

import { FiCheck, FiX } from "react-icons/fi";
import Select from "react-select";
import { DownloadTableExcel } from 'react-export-table-to-excel';


function EmployeeLeaves() {
  const tableRef = useRef(null);
  var action = "";
  const [employees, setEmployees] = useState([]);

  const [columnsAndRows, setColumnsAndRows] = useState([]);
  const [columnsAndRowsAll, setColumnsAndRowsAll] = useState([]);
  const [columnsAndRowsEmployee, setColumnsAndRowsEmployee] = useState([]);


  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  })
  const [employee, setEmployee] = useState("")
  const [activeKey, setActiveKey] = useState(1)
  const dispatch = useDispatch();



  const state = useSelector((state) => state.employees);

  useEffect(() => {
    getEmployeeLeaves();
    handleGetEmployeesApi()
  }, []);

  const handleGetEmployeesApi = async () => {
    try {
      const res = await employeeRequests.getEmployeesApi();

      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
          return { ...x, value: x.name, label: x.name };
        });
        console.log("tempArr", tempArr);
        setEmployees(tempArr);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const updateStatus = async (data, status) => {
    await employeeRequests.updateEmployeeLeavesApi({ ...data, ApplicationStatus: status });
    await getEmployeeLeaves()
  }

  function setSelectedRow(rowData) {
    if (action == "") {
      return;
    } else {
      switch (action) {
        case "reject":
          updateStatus(rowData, "Rejected")
          break;
        case "view":
          // handleView(rowData);
          break;
        case "approved":
          updateStatus(rowData, "Approved")
          break;

        default:
          break;
      }
    }
  }

  useEffect(() => {
    setColumnsAndRows(state.employeesLeavesDataTable);
  }, [state.employeesLeavesDataTable]);

  const getEmployeeLeaves = async () => {
    const result = await employeeRequests.getAllEmployeesLeavesApi()
    var tempArr = [];
    var allLevaes = [];
    result.data.map((x) => {
      allLevaes.push({
        ...x,
        name: x.employee.name,
        ApplicationStatus: (<div style={{ color: x.ApplicationStatus == "Approved" ? "green" : x.ApplicationStatus == "Rejected" ? "red" : "gray" }}>{x.ApplicationStatus}</div>),
        LeavesDates: x.LeavesDates,
        totalLeaves: x.LeavesDates.length,
        ApplicationDate: moment(x.ApplicationDate).format("DD MMM YYYY"),
        daysLeaves: x.LeavesDates.map(leave => { return moment(leave).format("Do MMM YY") + " , " }),

      });
      if (x.ApplicationStatus == 'Applied') {
        tempArr.push({
          ...x,
          name: x.employee.name,
          LeavesDates: x.LeavesDates,
          totalLeaves: x.LeavesDates.length,
          ApplicationDate: moment(x.ApplicationDate).format("DD MMM YYYY"),
          daysLeaves: x.LeavesDates.map(leave => { return moment(leave).format("Do MMM YY") + " , " }),
          action: (
            <>

              <>
                <FiCheck
                  onClick={() => (action = "approved")}
                  style={{
                    color: "orange",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                />

                <FiX
                  onClick={() => (action = "reject")}
                  style={{
                    color: "red",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                />
              </>
            </>
          ),
          clickEvent: setSelectedRow
        });
      }
    
    })

    var tempObj = { ...state.employeesLeavesDataTable, rows: tempArr };
    dispatch(updateEmployeesLeavesDataTableAction(tempObj))

    var tempObjAll = {
      columns: [{
        label: "Employee Name",
        field: "name",
        width: 270,
      },
      {
        label: "Leaves Days (MM DD YY)",
        field: "daysLeaves",
        width: 200,
      },
      {
        label: "Leave Type",
        field: "LeaveType",
        width: 200,
      },
      {
        label: "Applied Date",
        field: "ApplicationDate",
        width: 200,
      },

      {
        label: "Status",
        field: "ApplicationStatus",
        width: 200,
      },




      ], rows: allLevaes
    };
console.log(tempObjAll)
    setColumnsAndRowsAll(tempObjAll)
  }

  const fiterData = () => {
    if (dateRange.from && dateRange.to && employee) {
      let employeeLeaves = [];
      let availedLeaves = 0;
      const applied = JSON.parse(JSON.stringify(columnsAndRows));
      applied.rows.filter(row => {
        if (row.EmployeeId == employee) {
          let leaves = [];
          row.LeavesDates.filter(r => {
            if (moment(r) >= moment(dateRange.from) && moment(r) <= moment(dateRange.to)) {
              leaves.push(r);
            }

          })
          row.daysLeaves = leaves.map(leave => { return moment(leave).format("Do MMM YY") + " , " }),
            row.totalLeaves = leaves.length;
          availedLeaves = availedLeaves + row.LeavesDates.length;
          if (leaves.length > 0) {
            employeeLeaves.push(row)
          }
        }
      })
      const approved = JSON.parse(JSON.stringify(columnsAndRowsAll));
      approved.rows.filter(row => {
        if (row.EmployeeId == employee) {
          let leaves = [];
          row.LeavesDates.filter(r => {
            if (moment(r).isAfter(dateRange.from) && moment(r).isBefore(dateRange.to)) {
              leaves.push(r);
            }

          })
          row.daysLeaves = leaves.map(leave => { return moment(leave).format("Do MMM YY") + " , " }),
            row.totalLeaves = leaves.length;
          availedLeaves = availedLeaves + row.LeavesDates.length;
          if (leaves.length > 0) {
            employeeLeaves.push(row)
          }
        }
      })

      var tempObjAll = {
        columns: [{
          label: "Employee Name",
          key: "name",
          field: "name",
          filter: true,
        },
        {
          label: "Leaves Days (MM DD YY)",
          key: "daysLeaves",
          field: "daysLeaves",
          filter: true,
        },
        {
          label: "Total Leaves",
          key: "totalLeaves",
          field: "totalLeaves",
          filter: true,

        },
        {
          label: "Leave Type",
          key: "LeaveType",
          field: "LeaveType",
          filter: true,
          sorter: true,
        },
        {
          label: "Status",
          key: "ApplicationStatus",
          field: "ApplicationStatus",
          sorter: false,
          filter: true,

        },
        {
          label: "Applied Date",
          key: "ApplicationDate",
          field: "ApplicationDate",
          filter: true,

        },




        ], rows: employeeLeaves
      };

      setColumnsAndRowsEmployee(tempObjAll)
    }
    else {
      alert("please select date range and employee")
    }
  }

  const handleClientSelectChange = (param) => {
    setEmployee(param.id)

  };

  const handleChange = (evt, name) => {
    const value = evt.target.value;
    setDateRange({ ...dateRange, [name]: moment(value).format("MM/DD/YYYY") });

  }

  return (
    <div className='app'>



      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink data-tab="applied" active={activeKey === 1}
            onClick={() => setActiveKey(1)}>
            Applied Leaves
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink data-tab="approved" active={activeKey === 2}
            onClick={() => setActiveKey(2)}>
            All Leaves
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink data-tab="applied" active={activeKey === 3}
            onClick={() => setActiveKey(3)}>
            Employee Leaves
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <MDBDataTable
            className="mdbDataTableDesign"
            infoLabel={["Showing", "to", "of", "Records"]}
            bordered
            displayEntries={false}
            hover
            entries={100}
            pagesAmount={4}
            data={columnsAndRows}
          />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
          <MDBDataTable
            className="mdbDataTableDesign"
            infoLabel={["Showing", "to", "of", "Records"]}
            bordered
            displayEntries={false}
            hover
            entries={100}
            pagesAmount={4}
            data={columnsAndRowsAll}
          />
        </CTabPane>


        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 3}>

          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-3 flex-column d-flex" style={{ marginTop: "12px" }}>
              <label className="form-control-label">
                Employee Name
              </label>
              <Select
                placeholder='select employee'
                id="teamLead"
                name="teamLead"
                onChange={handleClientSelectChange}
                options={employees}
              ></Select>
            </div>
            <div className="form-group col-sm-3 flex-column d-flex" style={{ marginTop: "12px" }}>
              <label className="form-control-label">
                From
              </label>
              <input
                style={{ marginTop: "0px" }}
                onChange={(evt) => handleChange(evt, 'from')}
                type="date"
                dateFormat="yyyy"
                placeholder="Team start Date"
              />
            </div>
            <div className="form-group col-sm-3 flex-column d-flex" style={{ marginTop: "12px" }}>
              <label className="form-control-label">
                To
              </label>
              <input
                onChange={(evt) => handleChange(evt, 'to')}
                type="date"
                style={{ marginTop: "0px" }}
                dateFormat="yyyy"
                placeholder="Team start Date"
              />
            </div>

            <div className="form-group col-sm-3 flex-column d-flex" style={{ marginTop: "32px" }}>
              <CButton
                color="warning"
                // className="btn-block btn-primary"
                onClick={() => fiterData()}
              >
                Apply Filters
              </CButton>
            </div>

          </div>


          {columnsAndRowsEmployee && columnsAndRowsEmployee?.rows?.length > 0 ?
            <>          <CTable
              ref={tableRef} columns={columnsAndRowsEmployee.columns} items={columnsAndRowsEmployee.rows} />

              <DownloadTableExcel
                filename="Employee Leaves"
                sheet="leaves"
                currentTableRef={tableRef.current}
              >
                <div className="form-group col-sm-2 ">
                  <CButton
                    color="success"

                  >
                    Export To Excel
                  </CButton>
                </div>
              </DownloadTableExcel>
            </>

            :
            <></>
          }
        </CTabPane>






      </CTabContent>



    </div>
  );
}

export default EmployeeLeaves;




