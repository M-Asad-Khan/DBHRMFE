import React, { useState } from "react";
import "./addclient.css";
import {
  updateNewClientAction,
  updateClientsAction,
  updateIsAddClientClickedAction,
  updateIsEditClientClickedAction,
} from "../../../redux/Clients/clients.actions";
import { useSelector, useDispatch } from "react-redux";
import { addClientApi } from "src/API/AddClientApi";
import { updateClientApi } from "src/API/UpdateClientApi";

const addclients = ({}) => {
  const [fieldsWithError, setFieldsWithError] = useState({
    country: false,
    gender: false,
    name: false,
    email: false,
    contactNumber: false,
    technology: false,
    // project: false,
  });
  const [errorInfo, setErrorInfo] = useState({});
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
  const handleCancel = () => {
    dispatch(updateNewClientAction({}));
    dispatch(updateIsAddClientClickedAction(false));
    dispatch(updateIsEditClientClickedAction(false));
  };
  const addAndUpdateClient = async () => {
    if (!doValidation()) {
      if (clientsState.isEditClientClicked === true) {
        try {
          debugger;
          const res = await updateClientApi(clientsState.newClient);
          console.log("updateClient Response", res);

          debugger;
          if (res.error === false) {
            debugger;
            alert("Client Updated");
            let temp = clientsState.clients.filter(
              (item) => item.id != res.data.id
            );
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
    } else {
      console.log("validation failed");
      debugger;
    }
  };
  const doValidation = () => {
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = {...errorInfo};
    debugger;
    
		Object.entries(fieldsWithError).forEach((x) => {
      debugger;
      if (clientsState.newClient[x[0]] !== undefined) {
        if (clientsState.newClient[x[0]] !== "") {
          if (x[0] === "email" || x[0] === "contactNumber") {
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
    })
    console.log("isError", isError);
    return isError;
  };

  function validateEmail(email) {
    {
      var regx = /\S+@\S+\.\S+/;
      if (regx.test(email)) {
        console.log(true);
        setFieldsWithError({
          ...fieldsWithError,
          email: false,
        });
      } else {
        console.log(false);
        setFieldsWithError({
          ...fieldsWithError,
          email: true,
        });
        setErrorInfo({
          ...errorInfo,
          email: "You have entered an invalid email address!",
        });
      }
    }
  }
  function validateNumberOnly(num) {
    var reg = new RegExp("^[0-9]*$");

    if (reg.test(num) == false) {
			console.log(false);
			setFieldsWithError({
				...fieldsWithError,
				contactNumber: true,
			});
			setErrorInfo({
				...errorInfo,
				contactNumber: "only Numbers allowed",
			});
		} else {
			setFieldsWithError({
				...fieldsWithError,
				contactNumber: false,
			});
		}
  }
  console.log("fieldsWithError", fieldsWithError);
  console.log("errorInfo", errorInfo);

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
                  className={
                    fieldsWithError.country === true ? "redBorder" : ""
                  }
                  value={clientsState.newClient.country}
                  onChange={handleChange}
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Enter country"
                  // onBlur={}
                />{" "}
                {fieldsWithError.country === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.country}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Name<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={fieldsWithError.name === true ? "redBorder" : ""}
                  value={clientsState.newClient.name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter name"
                />{" "}
                {fieldsWithError.name === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.name}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Business email<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={fieldsWithError.email === true ? "redBorder" : ""}
                  value={clientsState.newClient.email}
                  onChange={handleChange}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  onBlur={(e) => validateEmail(e.target.value)}
                />{" "}
                {fieldsWithError.email === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.email}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Phone number<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={
                    fieldsWithError.contactNumber === true ? "redBorder" : ""
                  }
                  value={clientsState.newClient.contactNumber}
                  onChange={handleChange}
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
									placeholder="Enter contact number"
									onBlur={e=>validateNumberOnly(e.target.value)}
                />{" "}
                {fieldsWithError.contactNumber === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.contactNumber}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Technology<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={
                    fieldsWithError.technology === true ? "redBorder" : ""
                  }
                  value={clientsState.newClient.technology}
                  onChange={handleChange}
                  type="text"
                  id="technology"
                  name="technology"
                  placeholder="Enter technology"
                />{" "}
                {fieldsWithError.technology === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.technology}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Project<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={
                    fieldsWithError.project === true ? "redBorder" : ""
                  }
                  value={clientsState.newClient.project}
                  onChange={handleChange}
                  type="text"
                  id="project"
                  name="project"
                  placeholder="Enter project name"
                />{" "}
                {fieldsWithError.project === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.project}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div> */}
            </div>

            <div className="row justify-content-between text-left">
              <div className="form-group">
                <div className="maxl">
                  <label className="radio inline">
                    <input
                      checked={clientsState.newClient.gender === "male"}
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={(e) => handleChange(e)}
                    />
                    <span> Male </span>
                  </label>
                  <label
                    style={{ marginLeft: "20px" }}
                    className="radio inline"
                  >
                    <input
                      checked={clientsState.newClient.gender === "female"}
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="ml-1">Female </span>
                  </label>

                  {fieldsWithError.gender === true ? (
                    <div>
                      <label style={{ color: "red" }}>please select one</label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="row justify-content-between text-left"></div>

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
