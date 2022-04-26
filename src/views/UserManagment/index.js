import React, { useState, useEffect } from "react";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
import AddUser from "./User/AddUser";
import { userManagmentRequests } from "src/API/UserManagmentApi";
import { useSelector, useDispatch } from "react-redux";
import {
	updateIsAddUserClickedAction,
  updateUsersAction,
  updateUsersDataTableAction,
} from "src/redux/UserManagment/userManagment.actions";
import { MDBDataTable } from "mdbreact";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import AddRole from "./Role/AddRole";

function UserManagment() {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("user");
  const userManagmentState = useSelector((state) => state.userManagment);

  useEffect(() => {
    handlegetUsers();
  }, []);

  const handlegetUsers = async () => {
    try {
      const res = await userManagmentRequests.getUsers();
      debugger;
      if (res.error === false) {
        dispatch(updateUsersAction(res.data));
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
        debugger;
        console.log("eventarr", tempArr);
        var tempObj = { ...userManagmentState.usersDataTable, rows: tempArr };
        dispatch(updateUsersDataTableAction(tempObj));
      }
    } catch (err) {
      console.log(err);
    }
  };

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
            {userManagmentState.isAddUserClicked ? (
              <AddUser />
            ) : (
              <div className="mt-4">
                <button
                  type="button"
                  className="btn btn-outline-primary col-sm-2"
                  onClick={() =>dispatch(updateIsAddUserClickedAction(true))}
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
             {userManagmentState.isAddRoleClicked ? (
              <AddRole />
            ) : (
              <div className="mt-4">
                <button
                  type="button"
                  className="btn btn-outline-primary col-sm-2"
                  onClick={() =>dispatch(updateIsAddUserClickedAction(true))}
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
                  // data={userManagmentState.usersDataTable}
                />
              </div>
            )}
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="profile-tab"
            visible={activeKey === "permission"}
          >
            Etsy mixtape wayfarers, ethical wes anderson tofu before they sold
            out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table
            readymade. Messenger bag gentrify pitchfork tattooed craft beer,
            iphone skateboard locavore carles etsy salvia banksy hoodie
            helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit
            cred pitchfork. Williamsburg banh mi whatever gluten-free, carles
            pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester
            cred you probably haven't heard of them, vinyl craft beer blog
            stumptown. Pitchfork sustainable tofu synth chambray yr.
          </CTabPane>
        </CTabContent>
      </div>
    </>
  );
}
export default UserManagment;
