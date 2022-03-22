import React, { useState } from 'react'
import './addteams.css'
import Select from 'react-select';


const Addteams = ({ setState,
	state,
	isNewTeam,
	setIsNewTeam,
	setTeams }) => {
	function handleChange(evt) {
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value
		});
	}
	const handleCancel = () => {
		setState({})
		setIsNewTeam(false);
	}
	const handleAddTeam = () => {
		setTeams(oldArray => [...oldArray, state]);
		setIsNewTeam(false)
	}
	const options = [
		{ value: 'andy', label: 'Andy' },
		{ value: 'Aysha', label: 'Aysha' },
		{ value: 'Amna', label: 'Amna' },
		{ value: 'Nancy', label: 'Nancy' },
		{ value: 'El', label: 'Eleven' },
		{ value: 'cadillac', label: 'Cadillac' },
	];
	return (
		<div className="container-fluid px-1 py-5 mx-auto">
			<div className="row d-flex justify-content-center">


				<div className="card">

					<div className="form-card" onsubmit="event.preventDefault()">
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex">
							<div className="form-group"> <label for="form_need">Please select Employees *</label>
								<Select
									defaultValue={[options[1], options[2]]}
									isMulti
									name="employees"
									options={options}
									className="basic-multi-select"
									classNamePrefix="select"
								/>
							</div>
							
							</div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Project Manager<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="projectManager" name="projectManager" placeholder="" onblur="validate(2)" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Team Lead<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="teamLead" name="teamLead" placeholder="" onblur="validate(10)" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Project Name<span className="text-danger"> *</span></label> <input onChange={handleChange} type="text" id="projectName" name="projectName" placeholder="" onblur="validate(9)" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Enter Start Date<span className="text-danger"> *</span></label> <input onChange={handleChange} type="date" id="date" name="date" placeholder="" onblur="validate(3)" /> </div>
							<div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Enter End Date<span className="text-danger"> *</span></label> <input onChange={handleChange} type="date" id="edate" name="edate" placeholder="" onblur="validate(4)" /> </div>
						</div>
						<div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 ">
								<button className="btn-block btn-primary" onClick={handleCancel}>Cancel</button>
							</div>
							<div className="form-group col-sm-6 ">
								<button className="btn-block btn-primary" onClick={handleAddTeam}>Create Team</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default Addteams
