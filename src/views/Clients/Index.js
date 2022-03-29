import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  updateNewClientAction,
  updateIsAddClientClickedAction,
  updateClientsAction,
  updateIsEditClientClickedAction,
} from "../../redux/Clients/clients.actions";
import { useSelector, useDispatch } from "react-redux";
import Addclients from "./Addclients/AddClients";
import { getClientsApi } from "../../API/getClientsApi";
import { deleteClientApi } from "src/API/DeleteClientApi";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";

function Clients() {
  const dispatch = useDispatch();
  const clientsState = useSelector((state) => state.clients);

  useEffect(() => {
    handleGetClientsApi();
  }, []);

  const handleDelete = async (client) => {
    debugger;
    try {
      const res = await deleteClientApi(client.id);
      if (res.error === false) {
        debugger;
        dispatch(
          updateClientsAction(
            clientsState.clients.filter((item) => item.id != client.id)
          )
        );
        debugger;
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
  const handleView = () => {
    debugger;
  };
  const handleGetClientsApi = async () => {
    try {
      const res = await getClientsApi();
      debugger;
      if (res.error === false) {
        dispatch(updateClientsAction(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleAddClient() {
    dispatch(updateIsAddClientClickedAction(true));
  }
  console.log(clientsState);

  return (
    <>
      {clientsState.isAddClientClicked === true ||
      clientsState.isEditClientClicked === true ? (
        <>
          <Addclients />
        </>
      ) : (
        <>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleAddClient}
          >
            Add Clients
          </button>
          <br />
          <br />
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Client Name</th>
                <th scope="col">Client Country</th>
                <th scope="col"> Action</th>
              </tr>
            </thead>
            <tbody>
              {clientsState.clients &&
                clientsState.clients.map((client, i) => {
                  return (
                    <tr key={client.id} className="clickable text-center">
                      <th scope="row">{i + 1}</th>
                      <td>{client.name}</td>
                      <td>{client.country}</td>
                      <td>
                        <span
                          style={{ cursor: "pointer" , color:"blue" }}
                          onClick={() => {
                            handleEdit(client);
                          }}
                        >
                          <FiEdit />
                        </span>{"   |"}
                        <span
                          style={{ cursor: "pointer" , color:"red" }}
                          onClick={() => {
                            handleDelete(client);
                          }}
                        >
                          <FiTrash />
                        </span>{"   |"}
                        <span
													style={{ cursor: "pointer", color:"blue" }}
                          onClick={handleView}
                        >
                          <FiEye />
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
export default Clients;
