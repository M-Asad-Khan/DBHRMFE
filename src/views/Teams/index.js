import React, { useState, useEffect } from "react";
import AddTeams from "./Addteams/AddTeams";
import { useSelector, useDispatch } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import {
  updateNewTeamAction,
  updateIsAddTeamClickedAction,
  updateTeamsAction,
  updateIsEditTeamClickedAction,
  updateTeamsDataTableAction,
  updateIsViewTeamClickedAction
} from "../../redux/Teams/teams.actions";
import { teamRequests } from "src/API/TeamApi";
import ViewTeam from "./ViewTeam/ViewTeam";
import { teamMembersRequests } from "src/API/teamMembersApi";
import { employeeRequests } from "src/API/EmployeeApi";
import {clientRequests} from "src/API/ClientApi";

function Teams() {
  var action = "";

  const teamsState = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const [columnsAndRows, setColumnsAndRows] = useState({});
  const currentUser = useSelector((state) => state.login.currentUser);
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    handleGetTeamsApi();
  }, []);
  useEffect(() => {
    if (
      teamsState.isAddTeamClicked === false ||
      teamsState.isEditTeamClicked === false
    ) {
      handleGetTeamsApi();
    }
  }, [teamsState.isAddTeamClicked, teamsState.isEditTeamClicked]);

  useEffect(() => {
    setColumnsAndRows(teamsState.teamsDataTable);
  }, [teamsState.teamsDataTable]);

  function setSelectedRow(rowData) {
    if (action == "") {
      return;
    } else {
      switch (action) {
        case "delete":
          handleDelete(rowData);
          break;
        case "view":
          handleView(rowData);
          break;
        case "edit":
          handleEdit(rowData);
          break;

        default:
          break;
      }
    }
    /* console.log("rowData", rowData);
    console.log("action", action); */
  }

  const handleDelete = async (team) => {
    try {
      const res = await teamRequests.deleteTeamsApi(team.id);
      if (res.error === false) {
        handleGetTeamsApi();
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const handleEdit = (team) => {
    dispatch(updateNewTeamAction(team));
    dispatch(updateIsEditTeamClickedAction(true));
  };
  const handleView = async (team) => {
    try {
      const res = await teamMembersRequests.getTeamMembersApi(team.id);
      if (res.error === false) {
        // handleGetTeamsApi()
        dispatch(updateIsViewTeamClickedAction(true));
        dispatch(updateNewTeamAction(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetTeamsApi = async () => {
    try {
      var temp;
      let res;
      var client;
      if (
        currentUser.userPermission.some(
          (x) => x.role.name === "Admin" || x.role.name === "HR"
        )
      ) {
        temp = false;
        setIsAdmin(true);
      } else {
        if( currentUser.userPermission.some(
          (x) => x.role.name === "Client"
        )) {
         client=true;
        }
        else{

          temp = true;
          setIsAdmin(false);
        }
      }
      if (temp) {
        res = await employeeRequests.getEmployeeWorkHistory(
          currentUser?.Profile?.id
        );

        console.log("Employee Teams Response ", res.data);

        if (res.error === false) {
          dispatch(updateTeamsAction(res.data));
          var tempArr = [];
          res.data.map((x) => {
            tempArr.push({
              ...x.team,
              action: (
                <>
                  <FiEye
                    onClick={() => (action = "view")}
                    style={{ color: "blue", cursor: "pointer" }}
                  />
                  {currentUser?.Profile?.id == x.team.managerName.id && (
                    <FiEdit
                      onClick={() => (action = "edit")}
                      style={{
                        color: "orange",
                        marginLeft: "20px",
                        cursor: "pointer"
                      }}
                    />
                  )}
                  <FiTrash
                    // onClick={() => (action = "delete")}
                    style={{
                      color: "red",
                      marginLeft: "20px",
                      cursor: "not-allowed"
                    }}
                  />
                </>
              ),

              clickEvent: setSelectedRow,
              managerName: x.team?.managerName?.name,
              teamLeadName: x.team?.teamLeadName?.name
            });

            var tempObj = { ...teamsState.teamsDataTable, rows: tempArr };
            dispatch(updateTeamsDataTableAction(tempObj));
          });
        }
      } else if (client) {
        res = await clientRequests.GetClientProjectsApi(currentUser?.Profile?.id);
        if (res.error === false) {
          dispatch(updateTeamsAction(res.data));
          var tempArr = [];
          res.data.map((x) => {
            tempArr.push({
              ...x.team,
              action: (
                <>
                  <FiEye
                    onClick={() => (action = "view")}
                    style={{ color: "blue", cursor: "pointer" }}
                  />
                  <FiEdit
                    onClick={() => (action = "edit")}
                    style={{
                      color: "orange",
                      marginLeft: "20px",
                      cursor: "pointer"
                    }}
                  />
                  <FiTrash
                    // onClick={() => (action = "delete")}
                    style={{
                      color: "red",
                      marginLeft: "20px",
                      cursor: "not-allowed"
                    }}
                  />
                </>
              ),
              clickEvent: setSelectedRow,
              managerName: x.team?.managerName?.name,
              teamLeadName: x.team?.teamLeadName?.name
            });
          });

          var tempObj = { ...teamsState.teamsDataTable, rows: tempArr };
          dispatch(updateTeamsDataTableAction(tempObj));
        }

      } else
      {
        res = await teamRequests.getTeamsApi();

        console.log("current user", res.data);
        if (res.error === false) {
          dispatch(updateTeamsAction(res.data));
          var tempArr = [];
          res.data.map((x) => {
            tempArr.push({
              ...x,
              action: (
                <>
                  <FiEye
                    onClick={() => (action = "view")}
                    style={{ color: "blue", cursor: "pointer" }}
                  />
                  <FiEdit
                    onClick={() => (action = "edit")}
                    style={{
                      color: "orange",
                      marginLeft: "20px",
                      cursor: "pointer"
                    }}
                  />
                  <FiTrash
                    // onClick={() => (action = "delete")}
                    style={{
                      color: "red",
                      marginLeft: "20px",
                      cursor: "not-allowed"
                    }}
                  />
                </>
              ),
              clickEvent: setSelectedRow,
              managerName: x?.managerName?.name,
              teamLeadName: x?.teamLeadName?.name
            });
          });

          var tempObj = { ...teamsState.teamsDataTable, rows: tempArr };
          dispatch(updateTeamsDataTableAction(tempObj));
        }
      }
    } catch (err) {
      //console.log(err);
    }
  };

  function handleAddClient() {
    dispatch(updateIsAddTeamClickedAction(true));
  }
  console.log("teamsState", teamsState);

  return (
    <>
      {teamsState.isViewTeamClicked ? (
        <ViewTeam />
      ) : teamsState.isAddTeamClicked === true ||
        teamsState.isEditTeamClicked === true ? (
        <>
          <AddTeams />
        </>
      ) : (
        <div className="card mt-0">
          {isAdmin && (
            <button
              type="button"
              className="btn btn-outline-primary col-sm-2"
              onClick={handleAddClient}
            >
              Add Team
            </button>
          )}

          <MDBDataTable
            className="mdbDataTableDesign"
            infoLabel={["Showing", "to", "of", "teams"]}
            bordered
            displayEntries={false}
            hover
            entriesOptions={[5, 20, 25]}
            entries={10}
            pagesAmount={4}
            data={columnsAndRows}
          />
        </div>
      )}
    </>
  );
}

export default Teams;
