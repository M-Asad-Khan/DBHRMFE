import {  useEffect } from 'react';
import './index.css'
import { useSelector } from "react-redux";
import { employeeRequests } from 'src/API/EmployeeApi'

function ViewLeaves() {

  const state = useSelector((state) => state.employees);

  useEffect(() => {
    getEmployeeLeaves();
  }, []);

  const getEmployeeLeaves = async () => {
    const result = await employeeRequests.getAllEmployeesLeavesApi()
  }

  return (
    <>
      <div>
  

        <div className="row">
          <div className="col-sm-12">
             <div className="card" >
             <h6 className="d-flex w-full" style={{ color: "black",borderBottomColor:"black",borderBottom:"solid 1px" }}>
                    Availed Leaves
                  </h6>
             {state.newEmployeeLeaves&&state.newEmployeeLeaves.map(leave=>{
              return (
                <div className="d-flex justify-content-between">
                <div className="d-flex">
                  {/* <BiTimeFive className="icon-design" /> */}
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    {leave.leaveType}
                  </h6>
                </div>
                <div className='w-50 text-right'>{leave.availed?leave.availed:0}</div>
              </div>
              )
             })}
           <div className="d-flex justify-content-between" style={{ color: "dimgrey",borderTopColor:"black",borderTop:"solid 1px" }}>
                <div className="d-flex" >
                  {/* <BiTimeFive className="icon-design" /> */}
                  <h6 className="d-flex w-full" style={{ color: "black" }}>
                    Allowed Leaves
                  </h6>
                </div>
                <div className='w-50 text-right'>15</div>
              </div>

     
          </div>
        </div>

      </div>
      </div>
    </>
  );
}

export default ViewLeaves;




