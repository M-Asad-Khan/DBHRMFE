import { useState, useEffect } from 'react';
import moment from "moment"
import './index.css'
import { useSelector, useDispatch } from "react-redux";
import { employeeRequests } from 'src/API/EmployeeApi'
import { MDBDataTable } from "mdbreact";
import {
  updateEmployeesLeavesDataTableAction
} from "../../../redux/Employees/employees.actions";
import { FiCheck, FiX } from "react-icons/fi";


function EmployeeLeaves() {
  var action = "";
  const [employees, setEmployees] = useState([]);

  const [columnsAndRows, setColumnsAndRows] = useState([]);
  const [columnsAndRowsAll, setColumnsAndRowsAll] = useState([]);
  const [showall, setShowall] = useState(false);

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
    var allLevaes=[];
    result.data.map((x) => {
      if (x.ApplicationStatus == 'Applied') {
        tempArr.push({
          ...x,
          name: x.employee.name,
          LeavesDates: x.LeavesDates,
          totalLeaves: x.LeavesDates.length,
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
      else{
        allLevaes.push({
          ...x,
          name: x.employee.name,
          LeavesDates: x.LeavesDates,
          totalLeaves: x.LeavesDates.length,
          daysLeaves: x.LeavesDates.map(leave => { return moment(leave).format("Do MMM YY") + " , " }),
     
        });
      }
    })

    var tempObj = { ...state.employeesLeavesDataTable, rows: tempArr };
    dispatch(updateEmployeesLeavesDataTableAction(tempObj))

    var tempObjAll = { columns: [{
      label: "Employee Name",
      field: "name",
      width: 270,
  },
  {
      label: "Leaves Days (MM DD YY)",
      field: "daysLeaves",
      width: 200,
  },
 
 
], rows: allLevaes };
  
    setColumnsAndRowsAll(tempObjAll)
  }



  const handleClientSelectChange = (param) => {
    alert(param.id)
    console.log(state.employeesLeavesDataTable)
  };

  const handleChange = (evt) => {

    const value = evt.target.value;

  }
  const filterData = () => {

  }

  return (
    <div className='app'>
      <div class="bouncing-text">
        <div class="b">A</div>
        <div class="o">P</div>
        <div class="u">P</div>

        <div class="n">L</div>
        <div class="c">I</div>
        <div class="e">E</div>
        <div class="e">D</div>

        <div class="shadow"></div>
        <div class="shadow-two"></div>
      </div>

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
 <div className="form-group col-sm-2 ">
                  <button
                    className="btn-block btn-primary"
                    onClick={() => setShowall(!showall)}
                  >
          {showall?"Hide All":"Show All"}  
                  </button>
                </div>
{showall?
      <MDBDataTable
        className="mdbDataTableDesign"
        infoLabel={["Showing", "to", "of", "Records"]}
        bordered
        displayEntries={false}
        hover
        entries={5}
        pagesAmount={4}
        data={columnsAndRowsAll}
      />:<></>
}
    </div>
  );
}

export default EmployeeLeaves;




