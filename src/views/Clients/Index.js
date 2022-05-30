import React, { useState, useEffect } from "react";
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
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import { MDBDataTable } from "mdbreact";
import { clientRequests } from "src/API/ClientApi";

function Clients() {
       
  var action = "";

  const clientsState = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const [columnsAndRows, setColumnsAndRows] = useState({});
  const currentUser = useSelector((state) => state.login.currentUser);

  useEffect(() => {
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
         
    setColumnsAndRows(clientsState.clientsDataTable);
  }, [clientsState.clientsDataTable]);

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
   // console.log("rowData", rowData);
    //console.log("action", action);
  }

  const handleDelete = async (client) => {
         
    try {
      const res = await clientRequests.deleteClientApi(client.id,currentUser.access_token);
      if (res.error === false) {
        handleGetClientsApi();
      }
    } catch (err) {
     // console.log(err);
    }
  };
  const handleEdit = (client) => {
         
    dispatch(updateNewClientAction(client));
    dispatch(updateIsEditClientClickedAction(true));
  };
  const handleView = async(client) => {
         
    try {
      const res = await clientRequests.GetClientProjectsApi(client.id,currentUser.access_token);
      if (res.error === false) {
        dispatch(updateIsViewClientClickedAction(true));
        dispatch(updateNewClientAction({client:client,projects:res.data}));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetClientsApi = async () => {
    try {
      const res = await clientRequests.getClientsApi(currentUser.access_token);
           
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
                  // onClick={() => (action = "delete")}
                  style={{
                    color: "red",
                    marginLeft: "20px",
                    cursor: "not-allowed",
                  }}
                />
              </>
            ),
            clickEvent: setSelectedRow,
          });
        });
             
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
        <ViewClient />
      ) : clientsState.isAddClientClicked === true ||
        clientsState.isEditClientClicked === true ? (
        <>
          <Addclients />
        </>
      ) : (
        <div className="card mt-0">
          <button
            type="button"
            className="btn btn-outline-primary col-sm-2"
            onClick={()=>handleAddClient()}
          >
            Add Client
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
