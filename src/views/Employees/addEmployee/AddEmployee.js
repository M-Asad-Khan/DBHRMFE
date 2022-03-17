import React, { useState } from 'react'
import './addemployee.css'
// import backIcon from '/src/assets/back-icon.png'

const AddEmployee = ({ setState, state, isAddEmployee, setIsAddEmployee, setEmployees }) => {

	function handleChange(evt) {
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value
		});
	}
	const handleCancle = () => {
		setState({})
		setIsAddEmployee(false);
	}
	const handleAddEmployee = () => {
		setEmployees(oldArray => [...oldArray, state]);
		setIsAddEmployee(false)
	}

	return (
		<div className="container-fluid px-1 py-5 mx-auto">
			<div className="row d-flex justify-content-center">
				{/* <img src={require('src/assets/images/avatars/')} /> */}
				{/* <img src={ backIcon}/> */}

				<div className="card">

					<div className="form-card">
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">First name<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="fname" name="fname" placeholder="Enter your first name" onblur="validate(1)" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Last name<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="lname" name="lname" placeholder="Enter your last name" onblur="validate(2)" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Business email<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="email" name="email" placeholder="" onblur="validate(3)" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Phone number<span className="text-danger"> *</span></label> <input type="text" id="mob" name="mob" placeholder="" onblur="validate(4)" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Date of Birth<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="DOB" name="DOB" placeholder="" onblur="validate(10)" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Joining Date<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="jdate" name="jdate" placeholder="Enter your Joining date" onblur="validate(9)" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Designation<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="Designation" name="Designation" placeholder="" onblur="validate(5)" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Salary<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="Salary" name="Salary" placeholder="" onblur="validate(8)" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Education<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="Education" name="Education" placeholder="" onblur="validate(6)" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Work Experience<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="workExperience" name="workExperience" placeholder="" onblur="validate(7)" /> </div>
						</div>

						<div className="form-group">
							<div className="maxl">
								<label className="radio inline">
									<input type="radio" name="gender" value="male" checked />
									<span> Male </span>
								</label>
								<label className="radio inline">
									<input type="radio" name="gender" value="female" />
									<span>Female </span>
								</label>
							</div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 ">
								<button className="btn-block btn-primary" onClick={handleCancle}>Cancle</button>
							</div>
							<div className="form-group col-sm-6 ">
								<button className="btn-block btn-primary" onClick={handleAddEmployee}>Add Employee</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default AddEmployee;
