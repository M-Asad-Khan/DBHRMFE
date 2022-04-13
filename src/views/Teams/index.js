import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  updateIsViewTeamClickedAction,
} from "../../redux/Teams/teams.actions";
import { getTeamsApi } from "src/API/GetTeamsApi";
import { deleteTeamsApi } from "src/API/DeleteTeamsApi";
import ViewTeam from "./ViewTeam/ViewTeam";
import { getTeamMembersApi } from "src/API/GetTeamMembersAPI";

function Teams() {
  debugger;
  var action = "";

  const teamsState = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const [columnsAndRows, setColumnsAndRows] = useState({});

  useEffect(() => {
    debugger;
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
    debugger;
    setColumnsAndRows(teamsState.teamsDataTable);
  }, [teamsState.teamsDataTable]);

  function setSelectedRow(rowData) {
    debugger;
    if (action == "") {
      return;
    } else {
      switch (action) {
        case "delete":
          debugger;
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
    console.log("rowData", rowData);
    console.log("action", action);
  }

  const handleDelete = async (team) => {
    debugger;
    try {
      const res = await deleteTeamsApi(team.id);
      if (res.error === false) {
        handleGetTeamsApi();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (team) => {
    debugger;
    dispatch(updateNewTeamAction(team));
    dispatch(updateIsEditTeamClickedAction(true));
  };
  const handleView = async (team) => {
    debugger;
    try{
      const res =await getTeamMembersApi(team.id);
      if(res.error === false){
        debugger;
        // handleGetTeamsApi()
        dispatch(updateIsViewTeamClickedAction(true));
        dispatch(updateNewTeamAction(res.data));
      }
    } catch(err){
      console.log(err);
    }
 
    debugger;
  };
  const handleGetTeamsApi = async () => {
    try {
      const res = await getTeamsApi();
      debugger;
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
                    cursor: "pointer",
                  }}
                />
                <FiTrash
                  onClick={() => (action = "delete")}
                  style={{
                    color: "red",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                />
              </>
            ),
            clickEvent: setSelectedRow,
            managerName: x.managerName.name,
            teamLeadName: x.teamLeadName.name,
          });
        });
        debugger;
        console.log("eventarr", tempArr);
        var tempObj = { ...teamsState.teamsDataTable, rows: tempArr };
        dispatch(updateTeamsDataTableAction(tempObj));
      }
    } catch (err) {
      console.log(err);
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
          <button
            type="button"
            className="btn btn-outline-primary col-sm-2"
            onClick={handleAddClient}
          >
            Add team
          </button>

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
