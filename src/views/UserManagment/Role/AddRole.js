import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userManagementRequests } from "src/API/UserManagmentApi";
import {
  updateIsAddRoleClickedAction,
  updateIsEditRoleClickedAction,
  updateRolesAction,
} from "src/redux/UserManagment/userManagment.actions";
import { toast } from "react-toastify";


export default function AddRole() {
  const dispatch = useDispatch();
  const userManagmentState = useSelector((state) => state.userManagment);
  const currentUser = useSelector((state) => state.login.currentUser);
  const [tempRole, setTempRole] = useState({});
  const [roles, setRoles] = useState([]);
  const [fieldsWithError, setFieldsWithError] = useState({
    name: null,
    description: null,
	});
	useEffect(() => {
		if (userManagmentState.isEditRoleClicked) {
			setTempRole(userManagmentState.newRole)
		}
	}, [userManagmentState.isEditRoleClicked ])
	
  const [errorInfo, setErrorInfo] = useState({});

  const handleChange = (evt) => {
         
    const value = evt.target.value;
    setTempRole({
      ...tempRole,
      [evt.target.name]: value,
    });
  };

  const doValidation = () => {
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = { ...errorInfo };
         

    Object.entries(fieldsWithError).forEach((x) => {
           
      if (tempRole[x[0]] !== undefined) {
        if (tempRole[x[0]] !== "") {
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
    console.log("isError", isError);
    return isError;
  };
  const handleCancel = () => {
    dispatch(updateIsAddRoleClickedAction(false));
    dispatch(updateIsEditRoleClickedAction(false));
  };

  const handleAddAndUpdateRole = async () => {
    if (!doValidation()) {
      if (userManagmentState.isEditRoleClicked === true) {
        try {
               
          const res = await userManagementRequests.updateRole(tempRole,currentUser.access_token);
          if (res.error === false) {
                 
            toast.success("Role Updated !");
            dispatch(updateRolesAction([ res.data]));
            dispatch(updateIsAddRoleClickedAction(false));
            dispatch(updateIsEditRoleClickedAction(false));
          }
        } catch (e) {
          toast.error("error !");
               
        }
      } else {
        try {
               
          const res = await userManagementRequests.addRole(tempRole,currentUser.access_token);
          if (res.error === false) {
                 
            toast.success("Role added !");
            dispatch(updateRolesAction([res.data]));
            dispatch(updateIsAddRoleClickedAction(false));
            dispatch(updateIsEditRoleClickedAction(false));
          }
        } catch (e) {
          toast.error("error !");
               
        }
      }
    } else {
      toast.error("validation failed");
           
    }
  };

  console.log("tempRole", tempRole);

  return (
    <>
      <div className="row justify-content-between text-left mt-3">
        <div className="form-group col-sm-6 flex-column d-flex">
          <label className="form-control-label ">
            Enter Role Name <span className="text-danger"> *</span>
          </label>
					<input
						value={tempRole.name}
            id="name"
            name="name"
            onChange={handleChange}
          ></input>
          {fieldsWithError.name === true ? (
            <>
              <label className="text-danger form-control-label px-3">
                {errorInfo.name}
              </label>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="form-group col-sm-6 flex-column d-flex">
          <label className="form-control-label">
            Description<span className="text-danger"> *</span>
          </label>
          <input
            value={tempRole.description}
            onChange={handleChange}
            id="description"
            name="description"
          ></input>
          {fieldsWithError.description === true ? (
            <>
              <label className="error form-control-label px-3">
                {errorInfo.description}
              </label>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="row justify-content-between text-left">
        <div className="form-group col-sm-6 ">
          <button className="btn-block btn-primary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        <div className="form-group col-sm-6 ">
          <button
            className="btn-block btn-primary"
            onClick={() => handleAddAndUpdateRole()}
          >
            {userManagmentState.isEditRoleClicked ? "Update Role" : "Add Role"}
          </button>
        </div>
      </div>
    </>
  );
}
