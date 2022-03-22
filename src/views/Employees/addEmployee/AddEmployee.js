import React, { useState } from 'react'
import './addemployee.css'
import {
	updateNewEmployeeAction,
	updateEmployeesAction,
	updateIsAddEmployeeClickedAction
} from '../../../redux/Employees/employees.actions'
import { useSelector, useDispatch } from 'react-redux';
import { addEmployeeApi } from 'src/API/AddEmployeeApi';

// import backIcon from '/src/assets/back-icon.png'

const AddEmployee = (
) => {
	const [employeeAdd, setEmployeeAdd] = useState()
	const dispatch = useDispatch();
	const state = useSelector((state) => state.employees)

	function handleChange(evt) {
		const value = evt.target.value;
		dispatch(updateNewEmployeeAction({
			...state.newEmployee,
			[evt.target.name]: value
		}));
	}
	const handleCancel = () => {
		dispatch(updateNewEmployeeAction({}))
		dispatch(updateIsAddEmployeeClickedAction(false));
	}
	const handleAddEmployee = async () => {
		try {
			debugger;
			const res = await addEmployeeApi(state.newEmployee);
			console.log("addEmployeeApi Response", res);

			debugger;
			if (res.status === 201) {
				alert('Employee Created');
				// dispatch(updateEmployeesAction([...state.employees,state.newEmployee]));
				dispatch(updateIsAddEmployeeClickedAction(false));
			}
		} catch (e) { 
			debugger;
		}
	
	}


	return (
		<div className="container-fluid px-1 py-5 mx-auto">
			<div className="row d-flex justify-content-center">
				{/* <img src={require('src/assets/images/avatars/')} /> */}
				{/* <img src={ backIcon}/> */}

				<div className="card">

					<div className="form-card">
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">First name<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="fName" name="fName" placeholder="Enter your first name" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Last name<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="lName" name="lName" placeholder="Enter your last name" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Age<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="age" name="age" placeholder="Enter your age" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Date of Birth<span className="text-danger"> *</span></label> <input onChange={handleChange} type="date" id="dateOfBirth" name="dateOfBirth" placeholder="Enter your date of birth" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Business email<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="email" name="email" placeholder="" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Phone number<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="phoneNumber" name="phoneNumber" placeholder="" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Technology<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="technology" name="technology" placeholder="" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Joining Date<span className="text-danger"> *</span></label> <input onChange={handleChange} type="date" id="joiningDate" name="joiningDate" placeholder="Enter your Joining date" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Designation<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="designation" name="designation" placeholder="" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Salary<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="salary" name="salary" placeholder="" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Education<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="education" name="education" placeholder="" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Work Experience<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="workExperience" name="workExperience" placeholder="" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Address<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="address" name="address" placeholder="" /> </div>
						</div>

						<div className="form-group">
							<div className="maxl">
								<label className="radio inline">
									<input type="radio" name="gender" value="male" checked onChange={() => console.log()} />
									<span> Male </span>
								</label>
								<label className="radio inline">
									<input type="radio" name="gender" value="female" onChange={() => console.log()} />
									<span>Female </span>
								</label>
							</div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 ">
								<button className="btn-block btn-primary" onClick={handleCancel}>Cancle</button>
							</div>
							<div className="form-group col-sm-6 ">
								<button className="btn-block btn-primary" onClick={handleAddEmployee }>Add Employee</button>
								{/* <button className="btn-block btn-primary" onClick={() => { addEmployeeApi('asd') }}>send data</button> */}

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default AddEmployee;
