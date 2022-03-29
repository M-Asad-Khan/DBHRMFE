import React, { useState, useEffect } from "react";
import "./addteams.css";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  updateNewTeamAction,
  updateIsAddTeamClickedAction,
  updateTeamsAction,
  updateIsEditTeamClickedAction,
  // updateClientsAction,
  // updateEmployeesAction
} from "../../../redux/Teams/teams.actions";
// import {
// 		updateClientsAction
// } from '../../../redux/Clients/clients.actions'
// import {
// 	updateEmployeesAction
// } from '../../../redux/Employees/employees.actions'
import { getClientsApi } from "../../../API/getClientsApi";
import { getEmployeesApi } from "../../../API/GetEmployeesApi";
import employees from "src/views/Employees/Index";

const Addteams = () => {
  const dispatch = useDispatch();
  const teamsState = useSelector((state) => state.teams);
  // const clients = useSelector((state) => state.clients.clients);
  // const employees = useSelector((state) => state.employees.employees);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    handleGetEmployeesApi();
    handleGetClientsApi();
  }, []);
  const handleGetClientsApi = async () => {
    try {
      const res = await getClientsApi();
      debugger;
			if (res.error === false) {
				var tempArr = [];
				var tempArr=res.data.map(x => {
					return({...x,
						value : x.name,
						label : x.name
					})
					
				});
				console.log("tempArr",tempArr)
        setClients(tempArr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetEmployeesApi = async () => {
    try {
      const res = await getEmployeesApi();
      debugger;
      if (res.error === false) {
				var tempArr = [];
				var tempArr=res.data.map(x => {
					return({...x,
						value : x.name,
						label : x.name
					})
					
				});
				console.log("tempArr",tempArr)
        setEmployees(tempArr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(evt) {
    debugger;
    const value = evt.target.value;
    dispatch(
      updateNewTeamAction({
        ...teamsState.newTeam,
        [evt.target.name]: value,
      })
    );
	}
	
  const handleCancle = () => {
    dispatch(updateNewTeamAction({}));
    dispatch(updateIsAddTeamClickedAction(false));
    dispatch(updateIsEditTeamClickedAction(false));
  };
  const addAndUpdateTeam = async () => {
    if (teamsState.isEditTeamClicked === true) {
      try {
        debugger;
        const res = await updateTeamApi(clientsState.newClient);
        console.log("updateTeam Response", res);

        debugger;
        if (res.error === false) {
          debugger;
          alert("team Updated");
          let temp = teamsState.teams.filter((item) => item.id != res.data.id);
          dispatch(updateTeamsAction([...temp, res.data]));
          dispatch(updateIsAddTeamClickedAction(false));
          dispatch(updateIsEditTeamClickedAction(false));
        }
      } catch (e) {
        debugger;
      }
    } else {
      try {
        debugger;
        const res = await addTeamApi(teamsState.newTeam);
        console.log("addTeamApi Response", res);

        debugger;
        if (res.error === false) {
          debugger;
          alert("team Created");
          dispatch(updateTeamsAction([...teamsState.teams, res.data]));
          dispatch(updateIsAddTeamClickedAction(false));
        }
      } catch (e) {
        debugger;
      }
    }
  };
  const options = [
    { value: "andy", label: "Andy" },
    { value: "Aysha", label: "Aysha" },
    { value: "Amna", label: "Amna" },
    { value: "Nancy", label: "Nancy" },
    { value: "El", label: "Eleven" },
    { value: "cadillac", label: "Cadillac" },
  ];
  const team = [
    { value: "Ali", label: "1" },
    { value: "Amir", label: "2" },
    { value: "Hussain", label: "3" },
  ];
  const employee = [
    { value: "Asad", label: "1" },
    { value: "Mubashir", label: "2" },
    { value: "Wajeeha", label: "3" },
  ];

  console.log("teamsState", teamsState);
  console.log("clients", clients);
  console.log("employees", employees);

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="card">
          <div className="form-card">
            <div className="row justify-content-between text-left">
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  {" "}
                  <label className="form-control-label px-3">
                    Team Name<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    // value={teamsState.newTeam.teamName}
                    onChange={handleChange}
                    type="text"
                    id="teamName"
                    name="teamName"
                    placeholder=""
                  />{" "}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  {" "}
                  <div className="form-group">
                    {" "}
                    <label for="form_need">Client *</label>
                    <Select
                      id="clientId"
                      name="clientId"
                      // onChange={}
                      // className="selectpicker"
                      // data-style="btn-inverse"
                      // style="display: none;"
                      options={clients}
                    ></Select>
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="form-group">
                      {" "}
                      <label for="form_need">ProjectManager *</label>
											<Select
												id="manager"
												name="manager"
                        // onChange={}
                        // className="selectpicker"
                        // data-style="btn-inverse"
                        // style="display: none;"
                        options={employees}
                      ></Select>
                    </div>
                  </div>

                  <div className="form-group col-sm-6 flex-column d-flex">
                    {" "}
                    <div className="form-group">
                      {" "}
                      <label for="form_need">Employees *</label>
                      <Select
                        // onChange={}
                        // className="selectpicker"
                        // data-style="btn-inverse"
                        // style="display: none;"
                        options={employees}
                      ></Select>
                    </div>
                  </div>
                  <div className="row justify-content-between text-left">
                    <div className="form-group col-sm-6 flex-column d-flex">
                      {" "}
                      <div className="form-group">
                        {" "}
                        <label for="form_need">Team Lead *</label>
												<Select
													id="teamLead"
													name='teamLead'
                          // className="selectpicker"
                          // data-style="btn-inverse"
                          // style="display: none;"
                          employee={employees}
                        >
                        </Select>
                      </div>
                    </div>
                    <div className="form-group col-sm-6 flex-column d-flex">
                      {" "}
                      <label className="form-control-label px-3">
                        Enter Start Date<span className="text-danger"> *</span>
                      </label>{" "}
                      <input
                        onChange={handleChange}
                        type="date"
                        id="startDate"
                        name="startDate"
                        placeholder="Enter start Date"
                      />{" "}
                    </div>
                  </div>
                  <div className="row justify-content-between text-left">
                    <div className="form-group col-sm-6 ">
                      <button
                        className="btn-block btn-primary"
                        onClick={handleCancle}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="form-group col-sm-6 ">
                      <button
                        className="btn-block btn-primary"
                        onClick={addAndUpdateTeam}
                      >
                        {teamsState.isEditTeamClicked
                          ? "Update Team"
                          : "Add Team"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addteams;
