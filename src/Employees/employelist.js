import React from 'react'  
import { useHistory } from "react-router-dom";



function DisplayEmployees() {
    let history = useHistory();

    function handleClick() {
      history.push("/addEmployee");
    }
    const employees = [

        {Id:101,Name:'Aysha',Location:'Lahore',Salary:12345},
      
        {Id:102,Name:'Asad',Location:'Lahore',Salary:23456,},
      
        {Id:103,Name:'Mubashir',Location:'Lahore',Salary:34567}
      
      ];


      return (<>
                <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Add Employee</button>
                <br/><br /> 
            
              

                            
                    <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Employee Location</th>
                            <th scope="col">Employee salary</th>
                        </tr>
                    </thead>
                    <tbody>
                   { employees && employees.map((employee)=>{
            return (

                        <tr>
                            <th scope="row">{employee.Id}</th>
                            <td>{employee.Name}</td>
                            <td>{employee.Location}</td>
                            <td>{employee.Salary}</td>
                        </tr>
                        )
        })
    }
                    </tbody>
                </table>
                            {/* // <div className="card col-md-12">
                           
                                
                            //     <div className="card-body">
                            //         <p className="card-text">Employee ID : <b>{employee.Id}</b></p>
                        
                            //         <p className="card-text">Employee Name : <b>{employee.Name}</b></p>
                                    
                                    
                            //         <p className="card-text">Employee Location : <b>{employee.Location}</b></p>
                                    
                            //         <p className="card-text">Employee Salary : <b>{employee.Salary}</b></p>
                                    
                            //     </div>
                            // </div> */}
                            

                       
                
             </>
            )      
        }


export default DisplayEmployees;
