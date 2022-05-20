import React, { useState, useEffect } from "react";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
import AddUser from "./User/AddUser";
import { userManagmentRequests } from "src/API/UserManagmentApi";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsAddPermissionClickedAction,
  updateIsAddRoleClickedAction,
  updateIsAddUserClickedAction,
  updateIsEditPermissionClickedAction,
  updateIsEditRoleClickedAction,
  updateIsEditUserClickedAction,
  updateNewPermissionAction,
  updateNewRoleAction,
  updateNewUserAction,
  updatePermissionsAction,
  updatePermissionsDataTableAction,
  updateRolesAction,
  updateRolesDataTableAction,
  updateUsersAction,
  updateUsersDataTableAction,
} from "src/redux/UserManagment/userManagment.actions";
import { MDBDataTable } from "mdbreact";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import AddRole from "./Role/AddRole";
import AddPermission from "./Permission/AddPermission";

function UserManagment() {
  var action = "";
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("user");
  const userManagmentState = useSelector((state) => state.userManagment);

  useEffect(() => {
    handleGetUsers();
  }, [userManagmentState.isAddUserClicked]);
  useEffect(() => {
    handleGetPermissions();
  }, [userManagmentState.isAddPermissionClicked]);
  useEffect(() => {
    handleGetRoles();
  }, [userManagmentState.isAddRoleClicked]);

  const handleGetUsers = async () => {
    try {
      const res = await userManagmentRequests.getUsers();

      if (res.error === false) {
        dispatch(updateUsersAction(res.data));
        var tempArr = [];
        res.data.map((x) => {
          tempArr.push({
            ...x,
            action: (
              <>
                {/* <FiEye
                  onClick={() => (action = "viewUser")}
                  style={{ color: "blue", cursor: "pointer" }}
                /> */}
                <FiEdit
                  onClick={() => (action = "editUser")}
                  style={{
                    color: "orange",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                />
                <FiTrash
                  // onClick={() => (action = "deleteUser")}
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
        var tempObj = { ...userManagmentState.usersDataTable, rows: tempArr };
        dispatch(updateUsersDataTableAction(tempObj));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetRoles = async () => {
    try {
      const res = await userManagmentRequests.getRoles();

      if (res.error === false) {
        dispatch(updateRolesAction(res.data));
        var tempArr = [];
        res.data.map((x) => {
          tempArr.push({
            ...x,
            action: (
              <>
                {/* <FiEye
                  onClick={() => (action = "viewRole")}
                  style={{ color: "blue", cursor: "pointer" }}
                /> */}
                <FiEdit
                  onClick={() => (action = "editRole")}
                  style={{
                    color: "orange",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                />
                <FiTrash
                  // onClick={() => (action = "deleteRole")}
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
        var tempObj = { ...userManagmentState.rolesDataTable, rows: tempArr };
        dispatch(updateRolesDataTableAction(tempObj));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetPermissions = async () => {
    try {
      const res = await userManagmentRequests.getPermission();
        
      if (res.error === false) {
        dispatch(updatePermissionsAction(res.data));
        var tempArr = [];
        var dataAcquiredIds = [];
        res.data.map((x) => {
          if (!dataAcquiredIds.includes(x.userId)) {
            dataAcquiredIds.push(x.userId);
            var mutex = false;
            res.data
              .filter((item) => item.userId == x.userId)
              .map((y) => {
                if (mutex) return;
                tempArr.push({
                  action: (
                    <>
                      {/* <FiEye
												onClick={() => (action = "viewPermission")}
												style={{ color: "blue", cursor: "pointer" }}
											/> */}
                      <FiEdit
                        onClick={() => (action = "editPermission")}
                        style={{
                          color: "orange",
                          marginLeft: "20px",
                          cursor: "pointer",
                        }}
                      />
                      <FiTrash
                        // onClick={() => (action = "deletePermission")}
                        style={{
                          color: "red",
                          marginLeft: "20px",
                          cursor: "not-allowed",
                        }}
                      />
                    </>
                  ),
                  clickEvent: setSelectedRow,
                  email: y.user.email,
                  userId: y.userId,
                  roles: res.data
                    .filter((item) => item.userId == x.userId)
                    .map((z) => z.role.name + "  "),
                  prevRoles: res.data
                    .filter((item) => item.userId == x.userId)
                    .map((z) => z.role.id),
                });
                console.log("here000", tempArr);
                mutex = true;
              });
          }
        });
          
        console.log("tempArr 111222", tempArr);
        var tempObj = {
          ...userManagmentState.permissionsDataTable,
          rows: tempArr,
        };
        dispatch(updatePermissionsDataTableAction(tempObj));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditUser = (employee) => {
      
    dispatch(updateNewUserAction(employee));
    dispatch(updateIsEditUserClickedAction(true));
  };
  const handleEditRole = (role) => {
      
    dispatch(updateNewRoleAction(role));
    dispatch(updateIsEditRoleClickedAction(true));
  };

  const handleEditPermission = (permission) => {
      
    console.log("permission", permission);
    dispatch(updateNewPermissionAction(permission));
    dispatch(updateIsEditPermissionClickedAction(true));
  };
  function setSelectedRow(rowData) {
    if (action == "") {
      return;
    } else {
      switch (action) {
        case "deleteUser":
          handleDeleteUser(rowData);
          break;
        case "viewUser":
          // handleViewRole(rowData);
          break;
        case "editUser":
          handleEditUser(rowData);
          break;

        case "deleteRole":
          handleDeleteRole(rowData);
          break;
        case "viewRole":
          // handleViewRole(rowData);
          break;
        case "editRole":
          handleEditRole(rowData);
          break;

        case "deletePermission":
          handleDeletePermission(rowData);
          break;
        case "viewPermission":
          // handleViewPermission(rowData);
          break;
        case "editPermission":
          handleEditPermission(rowData);
          break;

        default:
          break;
      }
    }
    console.log("rowData", rowData);
    console.log("action", action);
  }

  console.log("userManagmentState Index", userManagmentState);
  return (
    <>
      <div className="card mt-0">
        <CNav variant="pills" role="tablist">
          <CNavItem>
            <CNavLink
              active={activeKey === "user"}
              onClick={() => setActiveKey("user")}
            >
              User
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeKey === "role"}
              onClick={() => setActiveKey("role")}
            >
              Role
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeKey === "permission"}
              onClick={() => setActiveKey("permission")}
            >
              Permission
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane
            role="tabpanel"
            aria-labelledby="user-tab"
            visible={activeKey === "user"}
          >
            {userManagmentState.isAddUserClicked ||
            userManagmentState.isEditUserClicked ? (
              <AddUser />
            ) : (
              <div className="mt-4">
                <button
                  type="button"
                  className="btn btn-outline-primary col-sm-2"
                  onClick={() => dispatch(updateIsAddUserClickedAction(true))}
                >
                  Add User
                </button>
                <MDBDataTable
                  className="mdbDataTableDesign"
                  infoLabel={["Showing", "to", "of", "Users"]}
                  bordered
                  displayEntries={false}
                  hover
                  entriesOptions={[5, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  data={userManagmentState.usersDataTable}
                />
              </div>
            )}
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="role-tab"
            visible={activeKey === "role"}
          >
            {userManagmentState.isAddRoleClicked ||
            userManagmentState.isEditRoleClicked ? (
              <AddRole />
            ) : (
              <div className="mt-4">
                <button
                  type="button"
                  className="btn btn-outline-primary col-sm-2"
                  onClick={() => dispatch(updateIsAddRoleClickedAction(true))}
                >
                  Add Role
                </button>
                <MDBDataTable
                  className="mdbDataTableDesign"
                  infoLabel={["Showing", "to", "of", "Roles"]}
                  bordered
                  displayEntries={false}
                  hover
                  entriesOptions={[5, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  data={userManagmentState.rolesDataTable}
                />
              </div>
            )}
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="profile-tab"
            visible={activeKey === "permission"}
          >
            {userManagmentState.isAddPermissionClicked ||
            userManagmentState.isEditPermissionClicked ? (
              <AddPermission />
            ) : (
              <div className="mt-4">
                <button
                  type="button"
                  className="btn btn-outline-primary col-sm-2"
                  onClick={() => {
                    dispatch(updateIsAddPermissionClickedAction(true));
                  }}
                >
                  Add Permission
                </button>
                <MDBDataTable
                  className="mdbDataTableDesign"
                  infoLabel={["Showing", "to", "of", "Permissions"]}
                  bordered
                  displayEntries={false}
                  hover
                  entriesOptions={[5, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  data={userManagmentState.permissionsDataTable}
                />
              </div>
            )}
          </CTabPane>
        </CTabContent>
      </div>
    </>
  );
}
export default UserManagment;
