import React, { useState, useEffect } from "react";
import "./addteams.css";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  updateNewTeamAction,
  updateIsAddTeamClickedAction,
  updateTeamsAction,
  updateIsEditTeamClickedAction,
} from "../../../redux/Teams/teams.actions";

import { getClientsApi } from "../../../API/getClientsApi";
import { getEmployeesApi } from "../../../API/GetEmployeesApi";
import { addTeamApi } from "../../../API/AddTeamApi";


const Addteams = () => {
  const [tempTeam, setTempTeam] = useState({});
  const dispatch = useDispatch();
  const teamsState = useSelector((state) => state.teams);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    handleGetEmployeesApi();
    handleGetClientsApi();
	}, []);
	useEffect(() => {
		if (teamsState.isEditTeamClicked === true) {
			setTempTeam(teamsState.newTeam)
		}
	}, [teamsState.isEditTeamClicked])
	
  const handleGetClientsApi = async () => {
    try {
      const res = await getClientsApi();
      debugger;
      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
          return { ...x, value: x.name, label: x.name };
        });
        console.log("tempArr", tempArr);
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
        var tempArr = res.data.map((x) => {
          return { ...x, value: x.name, label: x.name };
        });
        console.log("tempArr", tempArr);
        setEmployees(tempArr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(evt) {
    debugger;
    const value = evt.target.value;
      setTempTeam({
        ...tempTeam,
        [evt.target.name]: value,
      })
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
        const res = await updateTeamApi(tempTeam);
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
        const res = await addTeamApi(tempTeam);
        console.log("addTeamApi Response", res);

        debugger;
        if (res.error === false) {
          debugger;
          alert("team Created");
          dispatch(updateTeamsAction([...teamsState.teams, res.data]));
          dispatch(updateIsAddTeamClickedAction(false));
        }
			} catch (e) {
				console.log("error in addTeamApi",e)
        debugger;
      }
    }
  };

  const handleClientSelectChange = (param) => {
    setTempTeam({
      ...tempTeam,
      clientId: param.id,
    });
  };
  const handleProjectManagerSelectChange = (param) => {
    setTempTeam({
      ...tempTeam,
      manager: param.id,
    });
  };
  const handleTeamLeadSelectChange = (param) => {
    setTempTeam({
      ...tempTeam,
      teamLead: param.id,
    });
  };
  const handleEmployeesSelectChange = (param) => {
		debugger;
		setTempTeam({
			...tempTeam,
			members: param.map((item) => item.id)
		})
		// setTempTeam({
    //   ...tempTeam,
    //   clientId: param.id,
    // });
  };

  console.log("teamsState", teamsState);
  console.log("clients", clients);
  console.log("employees", employees);
  console.log("tempTeam", tempTeam);

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
                      options={clients}
                      onChange={handleClientSelectChange}
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
                        options={employees}
                        onChange={handleProjectManagerSelectChange}
                      ></Select>
                    </div>
                  </div>

                  <div className="form-group col-sm-6 flex-column d-flex">
                    {" "}
                    <div className="form-group">
                      {" "}
                      <label for="form_need">Members *</label>
											<Select
													isMulti
												
                        id="members"
                        name="members"
                        options={employees}
                        onChange={handleEmployeesSelectChange}
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
                          name="teamLead"
                          onChange={handleTeamLeadSelectChange}
                          options={employees}
                        ></Select>
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
