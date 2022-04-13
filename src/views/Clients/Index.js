import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  updateNewClientAction,
  updateIsAddClientClickedAction,
  updateClientsAction,
  updateIsEditClientClickedAction,
  updateClientsDataTableAction,
  updateIsViewClientClickedAction,
} from "../../redux/Clients/clients.actions";
import { useSelector, useDispatch } from "react-redux";
import ViewClient from "./ViewClient/ViewClient";

import Addclients from "./Addclient/AddClient";
import { getClientsApi } from "../../API/getClientsApi";
import { deleteClientApi } from "src/API/DeleteClientApi";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import { MDBDataTable } from "mdbreact";

function Clients() {
  debugger;
  var action = "";

  const clientsState = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const [columnsAndRows, setColumnsAndRows] = useState({});

  useEffect(() => {
    debugger;
    handleGetClientsApi();
  }, []);
  useEffect(() => {
    if (
      clientsState.isAddClientClicked === false ||
      clientsState.isEditClientClicked === false
    ) {
      handleGetClientsApi();
    }
  }, [clientsState.isAddClientClicked, clientsState.isEditClientClicked]);

  useEffect(() => {
    debugger;
    setColumnsAndRows(clientsState.clientsDataTable);
  }, [clientsState.clientsDataTable]);

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
      const res = await deleteClientApi(client.id);
      if (res.error === false) {
        handleGetClientsApi();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (client) => {
    debugger;
    dispatch(updateNewClientAction(client));
    dispatch(updateIsEditClientClickedAction(true));
  };
  const handleView = (client) => {
    debugger;
    dispatch(updateIsViewClientClickedAction(true));
    dispatch(updateNewClientAction(client));
  };
  const handleGetClientsApi = async () => {
    try {
      const res = await getClientsApi();
      debugger;
      if (res.error === false) {
        dispatch(updateClientsAction(res.data));
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
        var tempObj = { ...clientsState.clientsDataTable, rows: tempArr };
        dispatch(updateClientsDataTableAction(tempObj));
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleAddClient() {
    dispatch(updateIsAddClientClickedAction(true));
  }
  console.log("clientsState", clientsState);

  return (
    <>
      {clientsState.isViewClientClicked ? (
        <ViewClient/>
      ) : clientsState.isAddClientClicked === true ||
        clientsState.isEditClientClicked === true ? (
        <>
          <Addclients/>
        </>
      ) : (
        <div className="card mt-0">
          <button
            type="button"
            className="btn btn-outline-primary col-sm-2"
            onClick={handleAddClient}
          >
            Add Clients
          </button>

          <MDBDataTable
            className="mdbDataTableDesign"
            infoLabel={["Showing", "to", "of", "clients"]}
            bordered
            displayEntries={false}
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={columnsAndRows}
          />
        </div>
      )}
    </>
  );
}
export default Clients;
