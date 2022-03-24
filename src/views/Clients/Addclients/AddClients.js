import React from "react";
import "./addclients.css";
import {
  updateNewClientAction,
  updateClientsAction,
  updateIsAddClientClickedAction,
  updateIsEditClientClickedAction,
} from "../../../redux/Clients/clients.actions";
import { useSelector, useDispatch } from "react-redux";
import { addClientApi } from "src/API/AddClientApi";
import { updateClientApi } from "src/API/UpdateClientApi";

const addclients = ({ }) => {
	const dispatch = useDispatch();
  const clientsState = useSelector((state) => state.clients);

	function handleChange(evt) {
    debugger;
    const value = evt.target.value;
    dispatch(
      updateNewClientAction({
        ...clientsState.newClient,
        [evt.target.name]: value,
      })
    );
  }
  const handleCancle = () => {
    dispatch(updateNewClientAction({}));
    dispatch(updateIsAddClientClickedAction(false));
    dispatch(updateIsEditClientClickedAction(false));
  };
  const addAndUpdateClient = async () => {
    if (clientsState.isEditClientClicked === true) {
      try {
				debugger;
        const res = await updateClientApi(clientsState.newClient);
        console.log("updateClient Response", res);

        debugger;
        if (res.error === false) {
          debugger;
					alert("Client Updated");
					let temp=clientsState.clients.filter(item=>item.id!=res.data.id)
          dispatch(updateClientsAction([...temp, res.data]));
          dispatch(updateIsAddClientClickedAction(false));
          dispatch(updateIsEditClientClickedAction(false));
        }
      } catch (e) {
        debugger;
      }
    } else {
      try {
        debugger;
        const res = await addClientApi(clientsState.newClient);
        console.log("addClientApi Response", res);

        debugger;
				if (res.error === false) {
					debugger;
          alert("Client Created");
          dispatch(updateClientsAction([...clientsState.clients, res.data]));
          dispatch(updateIsAddClientClickedAction(false));
        }
      } catch (e) {
        debugger;
      }
    }
  };
  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="card">
          <div className="form-card">
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Country<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={clientsState.newClient.country}
                  onChange={handleChange}
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Enter country"
                />{" "}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Name<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={clientsState.newClient.name}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter name"
                />{" "}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Business email<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={clientsState.newClient.email}
                  onChange={handleChange}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                />{" "}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Phone number<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={clientsState.newClient.contactNumber}
                  onChange={handleChange}
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter contact number"
                />{" "}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Technology<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={clientsState.newClient.technology}
                  onChange={handleChange}
                  type="text"
                  id="technology"
                  name="technology"
                  placeholder="Enter technology"
                />{" "}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Project<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={clientsState.newClient.project}
                  onChange={handleChange}
                  type="text"
                  id="project"
                  name="project"
                  placeholder="Enter project name"
                />{" "}
              </div>
						</div>
						
						<div className="row justify-content-between text-left">
						<div className="form-group">
              <div className="maxl">
                <label className="radio inline">
										<input
										checked={clientsState.newClient.gender==='male'}
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) => handleChange(e)}
                  />
                  <span> Male </span>
                </label>
                <label className="radio inline">
										<input
										checked={clientsState.newClient.gender==='female'}
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) => handleChange(e)}
                  />
                  <span>Female </span>
                </label>
              </div>
            </div>
              
            </div>

            <div className="row justify-content-between text-left"></div>

            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 ">
                <button
                  className="btn-block btn-primary"
                  onClick={handleCancle}
                >
                  Cancle
                </button>
              </div>
              <div className="form-group col-sm-6 ">
							<button
									className="btn-block btn-primary"
									onClick={addAndUpdateClient}
                >
                  {clientsState.isEditClientClicked
                    ? "Update Client"
                    : "Add Client"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addclients;
