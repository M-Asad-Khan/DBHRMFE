import React, { useState, useEffect } from 'react'
import AddEmployee from './addEmployee/AddEmployee';
import {
	updateNewEmployeeAction,
	updateIsAddEmployeeClickedAction
} from "../../redux/Employees/employees.actions"
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeeApi } from 'src/API/GetEmployeesApi';





function employees(props) {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.employees)
	function handleAddEmployee() {
		dispatch(updateIsAddEmployeeClickedAction(true));
	}
	useEffect(() => {
		handleGetEmployeeApi()
	}, []);
	const handleGetEmployeeApi = async() => {
		debugger;
		try {
			const res =await getEmployeeApi();
			debugger;
			console.log('getEmployeeApiResponse', res)
			console.log('getEmployeeApiResponse', res.json())
			console.log('getEmployeeApiResponse', res.text())
		} catch (err) {
			console.log("",)
		}
	}

	console.log("state:", state)
	return (<>
		{state.isAddEmployeeCicked ?
			<AddEmployee/>
			:
			<>
				<button type="button" className="btn btn-outline-primary" onClick={handleAddEmployee}>Add Employee</button>
				<br /><br />
				<table className="table table-bordered table-hover">
					<thead className="thead-dark">
						<tr>
							<th scope="col"> ID</th>
							<th scope="col"> Name</th>
							<th scope="col"> Email</th>
							<th scope="col"> Mobile</th>
						</tr>
					</thead>
					<tbody>
						{state.employees && state.employees.map((employee) => {
							return (

								<tr key={employee.Id}>
									<th scope="row">{employee.Id}</th>
									<td>{employee.fName}</td>
									<td>{employee.email}</td>
									<td>{employee.mobile}</td>
								</tr>
							)
						})
						}
					</tbody>
				</table>

			</>
		}

	</>
	)
}


export default employees;
