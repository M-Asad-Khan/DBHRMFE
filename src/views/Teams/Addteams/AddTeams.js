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
import { getTeamMembersApi } from "src/API/GetTeamMembersAPI";
import { addTeamMembersApi } from "src/API/AddTeamMembersApi";
import { updateTeamApi } from "src/API/UpdateTeamApi";
import { deleteTeamMemberApi } from "src/API/DeleteTeamMemberApi";

const Addteams = () => {
  //var selectedTeamMembers = [];
  const [tempTeam, setTempTeam] = useState({});
  const dispatch = useDispatch();
  const teamsState = useSelector((state) => state.teams);
  const [employees, setEmployees] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [clients, setClients] = useState([]);
  const [fieldsWithError, setFieldsWithError] = useState({
    teamName: null,
    clientId: null,
    manager: null,
    members: null,
    startDate: null,
    teamLead: null,
  });
  const [errorInfo, setErrorInfo] = useState({});

  useEffect(() => {
    handleGetEmployeesApi();
    handleGetClientsApi();
  }, []);
  useEffect(() => {
    if (teamsState.isEditTeamClicked === true) {
      debugger;
      handleGetTeamMembers(teamsState.newTeam.id);
      setTempTeam(teamsState.newTeam);
    }
  }, []);

  const handleGetTeamMembers = async (teamId) => {
    try {
      const res = await getTeamMembersApi(teamId);
      debugger;
      var arr = [];
      var tempClient;
      if (res.error === false) {
        debugger;
        res.data.map((item) => {
          tempClient = item.client;
          console.log("item", item);
          arr.push({
            label: item.employee.name,
            value: item.employee.name,
            id: item.employee.id,
          });
        });
        setSelectedTeamMembers(arr);
        setSelectedClient({
          label: tempClient.name,
          value: tempClient.name,
          id: tempClient.id,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
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
    });
  }

  const handleCancel = () => {
    dispatch(updateNewTeamAction({}));
    dispatch(updateIsAddTeamClickedAction(false));
    dispatch(updateIsEditTeamClickedAction(false));
  };
  const addAndUpdateTeam = async () => {
    if (!doValidation()) {
      var apiError = false;
      if (teamsState.isEditTeamClicked === true) {
        try {
          debugger;
          const res = await updateTeamApi(tempTeam);
          console.log("updateTeam Response", res);

          debugger;
          if (res.error === false) {
            debugger;
            alert("team Updated");
            let temp = teamsState.teams.filter(
              (item) => item.id != res.data.id
            );
            dispatch(updateTeamsAction([...temp, res.data]));
            // dispatch(updateIsAddTeamClickedAction(false));
            // dispatch(updateIsEditTeamClickedAction(false));
          }
          if (res.error === true) {
            apiError = true;
          }
        } catch (err) {
          apiError = true;
          alert("err in update team", err);
          console.log("err in update team", err);
          debugger;
        }

        // for team member and client
        try {
          debugger;
          const res = await addTeamMembersApi(tempTeam);
          console.log("updateTeam Response", res);

          debugger;
          if (res.error === false) {
            debugger;
            alert("team Updated");
          }
          if (res.error === true) {
            apiError = true;
          }
        } catch (e) {
          apiError = true;
          alert("err in update team-members", err);
          console.log("err in update team-members", err);
          debugger;
        }
        if (apiError === false) {
          dispatch(updateIsAddTeamClickedAction(false));
          dispatch(updateIsEditTeamClickedAction(false));
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
            dispatch(updateIsEditTeamClickedAction(false));
          }
        } catch (e) {
          console.log("error in addTeamApi", e);
          debugger;
        }
      }
    }
  };
  const doValidation = () => {
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = { ...errorInfo };
    debugger;

    Object.entries(fieldsWithError).forEach((x) => {
      debugger;
      if (tempTeam[x[0]] !== undefined) {
        if (tempTeam[x[0]] !== "") {
          if (x[0] === "email" || x[0] === "phoneNumber") {
            isError = fieldsWithError[x[0]];
          } else {
            tempFieldsWithError[x[0]] = false;
            tempErrorInfo[x[0]] = null;
            isError = false;
          }
        } else {
          tempFieldsWithError[x[0]] = true;
          tempErrorInfo[x[0]] = `${x[0]} cannot be empty`;
          isError = true;
        }
      } else {
        tempFieldsWithError[x[0]] = true;
        tempErrorInfo[x[0]] = `${x[0]} cannot be empty`;
        isError = true;
      }
    });
    debugger;
    setErrorInfo(tempErrorInfo);
    setFieldsWithError(tempFieldsWithError);
    Object.entries(tempFieldsWithError).forEach((x) => {
      if (x[1] === true) {
        isError = true;
      }
    });
    console.log("isError", isError);
    return isError;
  };

  const handleClientSelectChange = (param) => {
    setTempTeam({
      ...tempTeam,
      clientId: param.id,
    });
    setSelectedClient(param);
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
      members: param.map((item) => item.id),
    });

    if (teamsState.isEditTeamClicked == true) {
      var empToDelete = selectedTeamMembers.filter(
        (item) => param.indexOf(item) === -1
      );
      if (empToDelete.length > 0) {
        handleDeleteTeamMember(teamsState.newTeam.id, empToDelete[0].id);
      }
      console.log(empToDelete);
    }
    console.log(selectedTeamMembers);
    setSelectedTeamMembers(param);
  };

  const handleDeleteTeamMember = async (teamId, member) => {
    debugger;
    var res = await deleteTeamMemberApi(teamId, member);
    if (res.error === false) {
      console.log("team member removed", res.data);
    }
  };
  console.log("teamsState", teamsState);
  console.log("tempTeam", tempTeam);

  console.log("selectedClient", selectedClient);
  console.log("selectedTeamMembers", selectedTeamMembers);
  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="card">
          <div className="form-card">
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Team Name<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  value={tempTeam.teamName}
                  onChange={handleChange}
                  type="text"
                  id="teamName"
                  name="teamName"
                  placeholder="Enter Team Name"
                  className={
                    fieldsWithError.teamName === true ? "redBorder" : ""
                  }
                />{" "}
                {fieldsWithError.teamName === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.teamName}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">
                  Client<span className="text-danger"> *</span>
                </label>{" "}
                <Select
                  // defaultValue={selectedClient}
                  value={selectedClient}
                  id="clientId"
                  name="clientId"
                  options={clients}
                  onChange={handleClientSelectChange}
                  className={
                    fieldsWithError.teamName === true ? "redBorder" : ""
                  }
                ></Select>
                {fieldsWithError.clientId === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.clientId}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Project Manager <span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    defaultValue={{
                      label: teamsState.newTeam.managerName,
                      value: teamsState.newTeam.managerName,
                    }}
                    id="manager"
                    name="manager"
                    options={employees}
                    onChange={handleProjectManagerSelectChange}
                    className={
                      fieldsWithError.teamName === true ? "redBorder" : ""
                    }
                  ></Select>
                  {fieldsWithError.manager === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.manager}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Members<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    value={selectedTeamMembers}
                    isMulti
                    id="members"
                    name="members"
                    options={employees}
                    onChange={handleEmployeesSelectChange}
                  ></Select>
                  {fieldsWithError.members === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.members}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    {" "}
                    <div className="form-group">
                      {" "}
                      <label for="form_need">Team Lead *</label>
                      <Select
                        defaultValue={{
                          label: teamsState.newTeam.teamLeadName,
                          value: teamsState.newTeam.teamLeadName,
                        }}
                        id="teamLead"
                        name="teamLead"
                        onChange={handleTeamLeadSelectChange}
                        options={employees}
                      ></Select>
                      {fieldsWithError.teamLead === true ? (
                        <>
                          <label className="error form-control-label px-3">
                            {errorInfo.teamLead}
                          </label>{" "}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    {" "}
                    <label className="form-control-label px-3">
                      Enter Start Date<span className="text-danger"> *</span>
                    </label>{" "}
                    <input
                      value={
                        tempTeam &&
                        tempTeam.startDate &&
                        tempTeam.startDate.slice(0, 10)
                      }
                      onChange={handleChange}
                      type="date"
                      id="startDate"
                      name="startDate"
                      placeholder="Enter start Date"
                    />{" "}
                    {fieldsWithError.startDate === true ? (
                      <>
                        <label className="error form-control-label px-3">
                          {errorInfo.startDate}
                        </label>{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 ">
                    <button
                      className="btn-block btn-primary"
                      onClick={handleCancel}
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
  );
};

export default Addteams;
