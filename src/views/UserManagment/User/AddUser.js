import React, { useState, useEffect } from "react";
import { employeeRequests } from "src/API/EmployeeApi";
import Select from "react-select";
import { clientRequests } from "src/API/ClientApi";
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsAddUserClickedAction,
  updateIsEditUserClickedAction,
  updateUsersAction,
} from "src/redux/UserManagment/userManagment.actions";
import { toast } from "react-toastify";
import { userManagmentRequests } from "src/API/UserManagmentApi";
import { CLink } from "@coreui/react";
import CIcon from '@coreui/icons-react';
import {PickerDropPane, PickerOverlay} from 'filestack-react';
import { cibAddthis } from '@coreui/icons'
export default function AddUser({isprofile = false}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.currentUser);
  const userManagmentState = useSelector((state) => state.userManagment);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [tempUser, setTempUser] = useState(isprofile ? {...currentUser?.user, user : currentUser?.user?.id} : {});
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [reload,setReload]=useState(false);
  const [fieldsWithError, setFieldsWithError] = useState({
    user: null,
    email: null,
    type: null,
    password: null,
    confirmPassword: null,
  });
  const [errorInfo, setErrorInfo] = useState({});
  useEffect(() => {
    if (userManagmentState.isEditUserClicked) {
      var tempObj = { ...userManagmentState.newUser };
      tempObj.user=userManagmentState.newUser.id
      setTempUser(tempObj);
    }
  }, [userManagmentState.isEditUserClicked]);
  const handleEmpSelectChange = (param) => {
    let tempEmail;
    employees !== null
      ? (tempEmail = employees.find((x) => x.id === param.id).email)
      : (tempEmail = clients.find((x) => x.id === param.id).email);
    setTempUser({
      ...tempUser,
      name:param.name,
      user: param.id,
      email: tempEmail,
    });
    console.log("tempEmail",tempEmail);
  };
  const handlePasswordChange = (evt) => {
    setTempUser({
      ...tempUser,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleGetClientsApi = async () => {
    try {
      const res = await clientRequests.getClientsApi();
      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
          return { ...x, value: x.name, label: x.name };
        });
        console.log("tempArr", tempArr);
        setClients(tempArr);
        setEmployees(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetEmployeesApi = async () => {
    try {
      const res = await employeeRequests.getEmployeesApi();
      if (res.error === false) {
        var tempArr = [];
        console.log("data of  get emp in addUser", res.data);
        var tempArr = res.data.map((x) => {
          return { ...x, value: x.name, label: x.name };
        });
        console.log("tempArr", tempArr);
        setEmployees(tempArr);
        setClients(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddAndUpdateUser = async () => {
    if (!doValidation()) {
      if (tempUser.password === tempUser.confirmPassword) {
        if (userManagmentState.isEditUserClicked || isprofile === true) {
          try {
            const res = await userManagmentRequests.updateUser(tempUser);
            console.log("updateEmployee Response", res);
            if (res.error === false) {
              toast.success("User Updated !");
              let temp = userManagmentState.users.filter(
                (item) => item.id != res.data.id
              );
              dispatch(updateUsersAction([...temp, res.data]));
              dispatch(updateIsEditUserClickedAction(false));
            }
          } catch (e) {
            console.log(e)
            toast.error("error !",e);
          }
        } else {
          try {
            const res = await userManagmentRequests.addUser(tempUser);
            console.log("updateEmployee Response", res);
            if (res.error === false) {
              toast.success("User added !");
              dispatch(updateUsersAction([res.data]));
              dispatch(updateIsAddUserClickedAction(false));
            }
          } catch (e) {
            console.log(e)
            toast.error("error !",e);
          }
        }
      } else {
        toast.error("Password don't Match");
      }
    } else {
      toast.error("validation failed");
    }
  };
  const doValidation = () => {
    debugger
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = { ...errorInfo };
    Object.entries(fieldsWithError).forEach((x) => {
      debugger
      if (tempUser[x[0]] !== undefined) {
        if (tempUser[x[0]] !== "") {
          if (x[0] === "email" || x[0] === "phoneNumber") {
          } else {
            tempFieldsWithError[x[0]] = false;
            tempErrorInfo[x[0]] = null;
          }
        } else {
          tempFieldsWithError[x[0]] = true;
          tempErrorInfo[x[0]] = `${x[0]} cannot be empty`;
        }
      } else {
        tempFieldsWithError[x[0]] = true;
        tempErrorInfo[x[0]] = `${x[0]} cannot be empty`;
      }
    });
    setErrorInfo(tempErrorInfo);
    setFieldsWithError(tempFieldsWithError);
    Object.entries(tempFieldsWithError).forEach((x) => {
      if (x[1] === true) {
        isError = true;
      }
    });
   // console.log("isError", isError);
    return isError;
  };
  const uploadDone = (res) => {
    tempUser.picture = res.filesUploaded[0].url;
    setReload(!reload);
  }
  const handleTypeChange = (e) => {
    if (e.target.value === "client") {
      handleGetClientsApi();
    } else if (e.target.value === "employee") {
      handleGetEmployeesApi();
    }
    setTempUser({
      ...tempUser,
      type: e.target.value,
    });
  };
  const handleCancel = () => {
    dispatch(updateIsAddUserClickedAction(false));
    dispatch(updateIsEditUserClickedAction(false));
  };

  /* console.log("tempUser", tempUser);
  console.log("userManagmentState In adduser", userManagmentState); */
  return (
    <>
      {!isprofile && <div className="row justify-content-between text-left mt-3">
        <div className="form-group col-sm-6 flex-column d-flex">
          <label className="form-control-label mb-1">
            Select Type <span className="text-danger"> *</span>
          </label>
          <div className="d-flex">
            <input
              checked={tempUser.type === "client"}
              disabled={userManagmentState.isEditUserClicked}
              type="radio"
              id="type"
              name="type"
              value="client"
              onChange={handleTypeChange}
            />
            <span className="ml-2">Client</span>
          </div>
          <div className="d-flex">
            <input
              checked={tempUser.type === "employee"}
              disabled={userManagmentState.isEditUserClicked}
              type="radio"
              id="type"
              name="type"
              value="employee"
              onChange={handleTypeChange}
            />
            <span className="ml-2">Employee</span>
          </div>
          {fieldsWithError.type === true ? (
            <>
              <label className="text-danger form-control-label px-3">
                {errorInfo.type}
              </label>
            </>
          ) : (
            ""
          )}
        </div>
      </div>}
{tempUser.type || isprofile ?
<div>
      <div className="row justify-content-between text-left">
        <div className="form-group col-sm-6 flex-column d-flex">
          <label className="form-control-label ">
            {!isprofile ? 'Select User' :" User"} <span className="text-danger"> *</span>
          </label>
          <Select
            isDisabled={userManagmentState.isEditUserClicked || isprofile}
            defaultValue={{
              label: tempUser?.name,
              value: tempUser?.name,
            }}
            id='userclients'
            name="userclients"
            autocomplete="off"
            value={{
              label: tempUser?.name,
              value: tempUser?.name,
            }}
            onChange={handleEmpSelectChange}
            options={employees || clients}
          ></Select>
          {fieldsWithError.user === true ? (
            <>
              <label className="text-danger form-control-label px-3">
                {errorInfo.user}
              </label>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="form-group col-sm-6 flex-column d-flex">
          <label className="form-control-label">
            Email<span className="text-danger"> *</span>
          </label>
          <input value={isprofile ? currentUser?.user?.email : tempUser.email} disabled={true} className="inputField"></input>
          {fieldsWithError.email === true ? (
            <>
              <label className="error form-control-label px-3">
                {errorInfo.email}
              </label>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="row ">
        <div className="col-sm-6 flex-column d-flex">
          <label className="form-control-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
          ></input>
          {fieldsWithError.password === true ? (
            <>
              <label className="text-danger form-control-label px-3">
                {errorInfo.password}
              </label>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="form-group col-sm-6 flex-column d-flex">
          <label className="form-control-label">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            onChange={handlePasswordChange}
            type="password"
          ></input>
          {fieldsWithError.confirmPassword === true ? (
            <>
              <label className="text-danger form-control-label px-3">
                {errorInfo.confirmPassword}
              </label>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="form-group col-6 flex-column d-flex">
                  <label className="form-control-label">
                    Upload profile picture
                  </label>
                  <CIcon size={'3xl'} icon={cibAddthis} onClick={() => setIsFilePicked(true)} />
                  {tempUser.picture ?
                    <CLink
                      href={tempUser.picture}
                      target="_blank"
                    >
                      {tempUser.picture}
                    </CLink>
                    : <></>}
                  {isFilePicked ?
                    <PickerOverlay
                    pickerOptions={{
                      accept:"image/*",
                      onClose: (res) => {
                        setIsFilePicked(false);
                      }
                    }}
                      apikey={'AUs6NdV3RbWNpyzRd3VH1z'}
                      onSuccess={(res) => console.log(res)}
                      onUploadDone={(res) => uploadDone(res)}
                    />
                    : <></>}
                </div>
      <div className="row justify-content-between text-left">
        {!isprofile && <div className="form-group col-sm-6 ">
          <button className="btn-block btn-primary" onClick={handleCancel}>
            Cancel
          </button>
        </div>}
        <div className={`form-group col-sm-6 ${isprofile && 'mx-auto'}`}>
          <button
            className="btn-block btn-primary"
            onClick={() => handleAddAndUpdateUser()}
          >
            {userManagmentState.isEditUserClicked || isprofile ? (isprofile ? "Update Profile":"Update User") : "Add User"}
          </button>
        </div>
      </div>
      </div>
:<></>}
    </>
  );
}