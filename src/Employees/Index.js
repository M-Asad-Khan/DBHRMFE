import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import AddEmployee from './addEmployee/AddEmployee';



function index() {
	const [employees, setEmployees] = useState([

		{ Id: 101, fname: 'Aysha', email: 'Lahore', mob: 12345 },

		{ Id: 102, fname: 'Asad', email: 'Lahore', mob: 23456, },

		{ Id: 103, fname: 'Mubashir', email: 'Lahore', mob: 34567 }

	]);
	const [state, setState] = useState({
		fname: "",
		lname: "",
		email: "",
		mob: "",
		DOB: "",
		jdate: "",
		Designation: "",
		Salary: "",
		Education: "",
		Experience: "",
	})
	const [isAddEmployee, setIsAddEmployee] = useState(false);
	let history = useHistory();

	function handleAddEmployee() {
		setState({
			fname: "",
			lname: "",
			email: "",
			mob: "",
			DOB: "",
			jdate: "",
			Designation: "",
			Salary: "",
			Education: "",
			Experience: "",
		});
		setIsAddEmployee(true);
	}

	console.log(state)
	return (<>
		{isAddEmployee ?
			<AddEmployee
				setState={setState}
				state={state}
				isAddEmployee={isAddEmployee}
				setIsAddEmployee={setIsAddEmployee}
				setEmployees={setEmployees} />
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
						{employees && employees.map((employee) => {
							return (

								<tr key={employee.Id}>
									<th scope="row">{employee.Id}</th>
									<td>{employee.fname}</td>
									<td>{employee.email}</td>
									<td>{employee.mob}</td>
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


export default index;
