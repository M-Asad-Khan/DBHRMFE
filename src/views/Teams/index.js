import React, {useState } from 'react'
import { useHistory } from "react-router-dom";
import AddTeams from './Addteams/AddTeams';
import { useSelector, useDispatch } from "react-redux";




function Teams() {
	const [teams, setTeams] = useState([
		{ Id: 1, teamLead: 'Ali', client: 'Andy', project: 12345 },

		{ Id: 2, teamLead: 'Amir', client: 'Nancy', project: 23456, },

		{ Id: 3, teamLead: 'Suleman', client: 'Nathme', project: 34567 }
	]);
	const [state, setState] = useState({})
	const [isNewTeam, setIsNewTeam] = useState(false);
	function handleAddTeam() {
		setState({
			tid: "",
			projectManager: "",
			teamLead: "",
			projectName: "",
			date: "",
			edate: ""
		});
		setIsNewTeam(true);
	}



	return (<>
		{true ?
			<AddTeams
				// setState={setState}
				// state={state}
				// isNewTeam={isNewTeam}
				// setIsNewTeam={setIsNewTeam}
				// setTeams={setTeams}
			/>
			:
			<>
				<button type="button" className="btn btn-outline-primary" onClick={handleAddTeam}>Add Teams</button>
				<br />
				<br />
				<table className="table table-bordered table-hover">
					<thead className="thead-dark">
						<tr>
							<th scope="col">Team ID</th>
							<th scope="col">TeamLead Name</th>
							<th scope="col">Client Name</th>
							<th scope="col">Project</th>
						</tr>
					</thead>
					<tbody>
						{teams && teams.map((team) => {
							return (
								<tr key={team.Id}>
									<th scope="row">{team.Id}</th>
									<td>{team.teamLead}</td>
									<td>{team.client}</td>
									<td>{team.project}</td>
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


export default Teams;
