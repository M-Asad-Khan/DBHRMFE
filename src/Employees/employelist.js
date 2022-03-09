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
                <button type="button" class="btn btn-outline-primary" onClick={handleClick}>Add Employee</button>
            
                {
                        
                        
                        
                        employees && employees.map((employee)=>{
                        return(

                            
                            <div className="card col-md-12">
                           
                                
                                <div className="card-body">
                                    <p className="card-text">Employee ID : <b>{employee.Id}</b></p>
                        
                                    <p className="card-text">Employee Name : <b>{employee.Name}</b></p>
                                    
                                    
                                    <p className="card-text">Employee Location : <b>{employee.Location}</b></p>
                                    
                                    <p className="card-text">Employee Salary : <b>{employee.Salary}</b></p>
                                    
                                </div>
                            </div>
                            )
                        })
                }
             </>
            )      
        }


export default DisplayEmployees;
