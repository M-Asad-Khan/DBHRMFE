import React from 'react'
import './addemployee.css'

const addemployee = () => {
  return (
    <div className="container-fluid px-1 py-5 mx-auto">
    <div className="row d-flex justify-content-center">
       
            
            <div className="card">
                
                <form className="form-card" onsubmit="event.preventDefault()">
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">First name<span className="text-danger"> *</span></label> <input type="text" id="fname" name="fname" placeholder="Enter your first name" onblur="validate(1)"/> </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Last name<span className="text-danger"> *</span></label> <input type="text" id="lname" name="lname" placeholder="Enter your last name" onblur="validate(2)"/> </div>
                    </div>
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Business email<span className="text-danger"> *</span></label> <input type="text" id="email" name="email" placeholder="" onblur="validate(3)"/> </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Phone number<span className="text-danger"> *</span></label> <input type="text" id="mob" name="mob" placeholder="" onblur="validate(4)"/> </div>
                    </div>
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Date of Birth<span className="text-danger"> *</span></label> <input type="text" id="DOB" name="DOB" placeholder="" onblur="validate(10)"/> </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Joining Date<span className="text-danger"> *</span></label> <input type="text" id="jdate" name="jdate" placeholder="Enter your Joining date" onblur="validate(9)"/> </div>
                    </div>
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Designation<span className="text-danger"> *</span></label> <input type="text" id="job" name="job" placeholder="" onblur="validate(5)"/> </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Salary<span className="text-danger"> *</span></label> <input type="text" id="job" name="job" placeholder="" onblur="validate(8)"/> </div>
                    </div>
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Education<span className="text-danger"> *</span></label> <input type="text" id="ans" name="ans" placeholder="" onblur="validate(6)"/> </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Work Experience<span className="text-danger"> *</span></label> <input type="text" id="ans" name="ans" placeholder="" onblur="validate(7)"/> </div>
                    </div>
                    
                    <div className="form-group">
                                            <div className="maxl">
                                                <label className="radio inline"> 
                                                    <input type="radio" name="gender" value="male" checked/>
                                                    <span> Male </span> 
                                                </label>
                                                <label className="radio inline"> 
                                                    <input type="radio" name="gender" value="female"/>
                                                    <span>Female </span> 
                                                </label>
                                            </div>
                                        </div>
                    <div className="row justify-content-end">
                        <div className="form-group col-sm-6"> <button type="submit" className="btn-block btn-primary">Add Employee</button> </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

  )
}

export default addemployee;
