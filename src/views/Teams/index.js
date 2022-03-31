import React, { useState ,useEffect} from "react";
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
} from "../../redux/Teams/teams.actions";
import { getTeamsApi } from "src/API/GetTeamsApi";
import { deleteTeamsApi } from "src/API/DeleteTeamsApi";

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

  const handleDelete = async (client) => {
    debugger;
    try {
      const res = await deleteTeamsApi(client.id);
      if (res.error === false) {
        handleGetTeamsApi();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (client) => {
    debugger;
    dispatch(updateNewTeamAction(client));
    dispatch(updateIsEditTeamClickedAction(true));
  };
  const handleView = () => {
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
      {teamsState.isAddTeamClicked === true ||
      teamsState.isEditTeamClicked === true ? (
        <>
          <AddTeams />
        </>
      ) : (
        <>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleAddClient}
          >
            Add teams
          </button>

          <MDBDataTable
            // striped
            bordered
            small
            displayEntries={false}
            hover
            entriesOptions={[5, 20, 25]}
            entries={10}
            pagesAmount={4}
            data={columnsAndRows}
            // data={teamsState.teamsDatatable}
            // searchTop
            // searchBottom={false}
          />
        </>
      )}
    </>
  );
}

export default Teams;
