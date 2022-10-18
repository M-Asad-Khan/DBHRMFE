import { useState, useEffect } from 'react';
import moment from "moment"
import './index.css'
import { useSelector, useDispatch } from "react-redux";
import { employeeRequests } from 'src/API/EmployeeApi'
import { MDBDataTable } from "mdbreact";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react"
import {
  updateEmployeesLeavesDataTableAction
} from "../../../redux/Employees/employees.actions";
import { FiCheck, FiX } from "react-icons/fi";
import Select from "react-select";


function EmployeeLeaves() {
  var action = "";
  const [employees, setEmployees] = useState([]);

  const [columnsAndRows, setColumnsAndRows] = useState([]);
  const [columnsAndRowsAll, setColumnsAndRowsAll] = useState([]);
  const [columnsAndRowsEmployee, setColumnsAndRowsEmployee] = useState([]);
  const [showall, setShowall] = useState(false);
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
      else {
        console.log(x)
        allLevaes.push({
          ...x,

          name: x.employee.name,
          LeavesDates: x.LeavesDates,
          totalLeaves: x.LeavesDates.length,
          ApplicationDate: moment(x.ApplicationDate).format("DD MMM YYYY"),
          daysLeaves: x.LeavesDates.map(leave => { return moment(leave).format("Do MMM YY") + " , " }),

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




      ], rows: allLevaes
    };

    setColumnsAndRowsAll(tempObjAll)
  }



  const handleClientSelectChange = (param) => {

    let employeeLeaves = [];
    columnsAndRows.rows.map(row => {
      if (row.EmployeeId == param.id) {
        employeeLeaves.push(row)
      }
    })

    columnsAndRowsAll.rows.map(row => {
      if (row.EmployeeId == param.id) {
        employeeLeaves.push(row)
      }
    })

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
        label: "Status",
        field: "ApplicationStatus",
        width: 200,
      },
      {
        label: "Applied Date",
        field: "ApplicationDate",
        width: 200,
      },




      ], rows: employeeLeaves
    };


    setColumnsAndRowsEmployee(tempObjAll)


  };

  const handleChange = (evt) => {

    const value = evt.target.value;

  }
  const filterData = () => {

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
            Approved Leaves
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
          <Select

            id="teamLead"
            name="teamLead"
            onChange={handleClientSelectChange}
            options={employees}
          ></Select>


          <MDBDataTable
            className="mdbDataTableDesign"
            infoLabel={["Showing", "to", "of", "Records"]}
            bordered
            displayEntries={false}
            hover
            entries={100}
            // pagesAmount={4}
            data={columnsAndRowsEmployee}
            
          />



        </CTabPane>






      </CTabContent>



    </div>
  );
}

export default EmployeeLeaves;




