import React, { useState, useEffect } from 'react'
import AddEmployee from './addEmployee/AddEmployee';
import {
	increaseCounter,
	decreaseCounter,
	updateNewEmployeeAction,
	updateIsAddEmployeeClickedAction
} from "../../redux/Employees/employees.actions"
import { useSelector, useDispatch } from 'react-redux';





function employees(props) {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.employees)
	function handleAddEmployee() {
		dispatch(updateIsAddEmployeeClickedAction(true));
	}
	useEffect(() => {
		//api call
		// handleGetEmployeeApi()
	}, []);
	const handleGetEmployeeApi = () => {
		debugger;
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
				mode: "no-cors",
			},
		};
		fetch('http://localhost:4000/api/v1/employees')
			.then(response => response.json())
			.then(data => {
				debugger;
				if (data && data.length > 0) {

				}

			});
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
				{/* <div className="App">
					<div>Count: {state.count}</div>
					<button onClick={() => dispatch(updateNewEmployeeAction({asd:"asd"}))}>updateNewEmployee</button>
					<button onClick={() => dispatch(increaseCounter())}>Increase Count</button>

					<button onClick={() => dispatch(decreaseCounter())}>Decrease Count</button>
				</div> */}
			</>
		}

	</>
	)
}


export default employees;
