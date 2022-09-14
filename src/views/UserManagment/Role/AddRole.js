import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userManagmentRequests } from "src/API/UserManagmentApi";
import {
  updateIsAddRoleClickedAction,
  updateIsEditRoleClickedAction,
  updateRolesAction,
} from "src/redux/UserManagment/userManagment.actions";
import { toast } from "react-toastify";
import Select from "react-select";

const roles = [
  { label: "Admin", value: "Admin" },
  { label: "Employee", value: "Employee" },
  { label: "HR", value: "HR" },

]
export default function AddRole() {
  const dispatch = useDispatch();
  const userManagmentState = useSelector((state) => state.userManagment);

  const [tempRole, setTempRole] = useState({});
  useEffect(() => {
    if (userManagmentState.isEditRoleClicked) {
      setTempRole(userManagmentState.newRole)
    }
  }, [userManagmentState.isEditRoleClicked])


  const handleChange = (evt) => {
    const value = evt.target.value;
    setTempRole({
      ...tempRole,
      [evt.target.name]: value,
    });
  };

  const handleReactChange = (evt) => {
    const value = evt.value;
    setTempRole({
      ...tempRole,
      name: value,
    });
  };

  const handleCancel = () => {
    dispatch(updateIsAddRoleClickedAction(false));
    dispatch(updateIsEditRoleClickedAction(false));
  };

  const handleAddAndUpdateRole = async () => {
    if (tempRole.name) {
      if (userManagmentState.isEditRoleClicked === true) {
        try {

          const res = await userManagmentRequests.updateRole(tempRole);
          if (res.error === false) {

            toast.success("Role Updated !");
            dispatch(updateRolesAction([res.data]));
            dispatch(updateIsAddRoleClickedAction(false));
            dispatch(updateIsEditRoleClickedAction(false));
          }
        } catch (e) {
          toast.error("error !");

        }
      } else {
        try {

          const res = await userManagmentRequests.addRole(tempRole);
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
      toast.error("Role Name required");

    }
  };

  return (
    <>
      <div className="row justify-content-between text-left mt-3">
        <div className="form-group col-sm-6 flex-column d-flex">
          <label className="form-control-label ">
            Select Role Name <span className="text-danger"> *</span>
          </label>

          <Select
            type="text"
            id="name"
            name="name"
            options={roles}
            onChange={handleReactChange}
          ></Select>

        </div>
        <div className="form-group col-sm-6 flex-column d-flex">
          <label className="form-control-label">
            Description
          </label>
          <input
            value={tempRole.description}
            onChange={handleChange}
            id="description"
            name="description"
          ></input>

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
