import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateIsAddPermissionClickedAction, updateIsAddRoleClickedAction, updateIsEditPermissionClickedAction, updatePermissionsAction } from "src/redux/UserManagment/userManagment.actions";
import { userManagmentRequests } from "src/API/UserManagmentApi";

export default function AddPermission() {
  const [tempPermission, setTempPermission] = useState({});
  const [roles, setRoles] = useState();
  const [users, setUsers] = useState();

  const dispatch = useDispatch();
  const userManagmentState = useSelector((state) => state.userManagment);
  const [fieldsWithError, setFieldsWithError] = useState({
    user: null,
    roles: null,
  });
  const [errorInfo, setErrorInfo] = useState({});

  useEffect(() => {
    getDataReadyforSelect();
  }, [userManagmentState.users]);

  const getDataReadyforSelect = () => {
    var tempUsers = userManagmentState.users.map((x) => {
      return { ...x, value: x.id, label: x.email };
    });
    setUsers(tempUsers);
  };

  const handleSelectChange = (param) => {
    setTempPermission({
      ...tempPermission,
      user: param.id,
    });
  };
  const handleChange = (evt) => {
    debugger;
    var temp = tempPermission.roles
      ? [...tempPermission.roles,evt.target.value]
      : [evt.target.value];
    setTempPermission({
      ...tempPermission,
      roles: temp,
    });
    debugger;
  };

	const doValidation = () => {
		debugger;
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = { ...errorInfo };
    debugger;

    Object.entries(fieldsWithError).forEach((x) => {
      debugger;
      if (tempPermission[x[0]] !== undefined) {
        if (tempPermission[x[0]] !== "") {
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
    debugger;
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
	const handleAddAndUpdatePermission = async () => {
    if (!doValidation()) {
      if (userManagmentState.isEditPermissionClicked === true) {
        // try {
        //   debugger;
        //   const res = await userManagmentRequests.updatePermission(tempRole);
        //   if (res.error === false) {
        //     debugger;
        //     toast.success("Permission Updated !");
        //     let temp = state.employees.filter((item) => item.id != res.data.id);
        //     dispatch(updatePermissionsAction([...temp, res.data]));
        //     dispatch(updateIsAddPermissionClickedAction(false));
        //     dispatch(updateIsEditPermissionClickedAction(false));
        //   }
        // } catch (e) {
        //   toast.error("error !");
        //   debugger;
        // }
      } else {
        try {
          debugger;
          const res = await userManagmentRequests.addPermission(tempPermission);
          if (res.error === false) {
            debugger;
            toast.success("Permission added !");
            dispatch(updatePermissionsAction([res.data]));
            dispatch(updateIsAddPermissionClickedAction(false));
            dispatch(updateIsEditPermissionClickedAction(false));
          }
        } catch (e) {
          toast.error("error !");
          debugger;
        }
      }
    } else {
      toast.error("validation failed");
      debugger;
    }
  };
  console.log("userManagmentState In addPermission", userManagmentState);
  console.log("tempPermission In addPermission", tempPermission);
  console.log("fieldsWithError In addPermission", fieldsWithError);
  console.log("errorInfo In addPermission", errorInfo);

  return (
    <>
      <div className="row justify-content-between text-left">
        <div className="form-group col-sm-6 flex-column d-flex">
          <label className="form-control-label ">
            Select User <span className="text-danger"> *</span>
          </label>
          <Select
            // defaultValue={{
            //   label: tempPermission.newTeam.teamLeadName,
            //   value: tempPermission.newTeam.teamLeadName,
            // }}
            // id="user"
            // name="user"
            onChange={handleSelectChange}
            options={users}
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
          <div className="d-flex">
            {userManagmentState?.roles?.map((role) => {
              return (
                <div key={role.id}>
                  <p className="form-control-label mr-5">{role.name}</p>
                  <input
                    type="checkbox"
                    id={role.id}
                    name={role.name}
                    value={role.id}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
          </div>
          {fieldsWithError.roles === true ? (
            <>
              <label className="error form-control-label px-3">
                {errorInfo.role}
              </label>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="row justify-content-between text-left">
        <div className="form-group col-sm-6 ">
          <button
            className="btn-block btn-primary"
            onClick={()=> dispatch(updateIsAddPermissionClickedAction(false))}
          >
            Cancel
          </button>
        </div>
        <div className="form-group col-sm-6 ">
          <button
            className="btn-block btn-primary"
            onClick={() => handleAddAndUpdatePermission()}
          >
            {userManagmentState.isEditUserClicked
              ? "Update Permission"
              : "Add Permission"}
          </button>
        </div>
      </div>
    </>
  );
}
