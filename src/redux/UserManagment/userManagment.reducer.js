import {
  updateNewUser,
  updateIsAddUserClicked,
  updateUsers,
  updateIsEditUserClicked,
  updateUsersDataTable,
  updateIsViewUserClicked,
  updateNewRole,
  updateIsAddRoleClicked,
  updateRoles,
  updateIsEditRoleClicked,
  updateRolesDataTable,
	updateIsViewRoleClicked,
	
	updateNewPermission,
  updateIsAddPermissionClicked,
  updatePermissions,
  updateIsEditPermissionClicked,
  updatePermissionsDataTable,
  updateIsViewPermissionClicked,
} from "./userManagment.types";

const INITIAL_STATE = {
  users: [],
  newUser: {},
  isAddUserClicked: null,
  isEditUserClicked: null,
  usersDataTable: {
    columns: [
      // {
      //   label: "User",
      //   field: "user",
      //   width: 270,
      // },
      {
        label: "Email",
        field: "email",
        width: 200,
      },
      {
        label: "Action",
        field: "action",
        width: 200,
      },
    ],
    rows: [],
  },
  isViewUserClicked: null,

  roles: [],
  newRole: {},
  isAddRoleClicked: null,
  isEditRoleClicked: null,
  rolesDataTable: {
    columns: [
      // {
      //   label: "User",
      //   field: "user",
      //   width: 270,
      // },
      {
        label: "Name",
        field: "name",
        width: 200,
      },
      {
        label: "Description",
        field: "description",
        width: 200,
			},
			{
        label: "Action",
        field: "action",
        width: 270,
      }
    ],
    rows: [],
  },
  isViewRoleClicked: null,

  permissions: [],
  newPermission: {},
  isAddPermissionClicked: null,
  isEditPermissionClicked: null,
  permissionsDataTable: {
    columns: [
      {
        label: "Email",
        field: "email",
        width: 200,
      },
      {
        label: "Roles",
        field: "roles",
        width: 200,
      },
    ],
    rows: [],
  },
  isViewRoleClicked: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //user
    case updateNewUser:
      return {
        ...state,
        newUser: action.payload,
      };

    case updateUsers:
      return {
        ...state,
        users: action.payload,
      };

    case updateIsAddUserClicked:
      return {
        ...state,
        isAddUserClicked: action.payload,
      };

    case updateIsEditUserClicked:
      return {
        ...state,
        isEditUserClicked: action.payload,
      };

    case updateUsersDataTable:
      return {
        ...state,
        usersDataTable: action.payload,
      };
    case updateIsViewUserClicked:
      return {
        ...state,
        isViewUserClicked: action.payload,
      };

    //role
    case updateNewRole:
      return {
        ...state,
        newRole: action.payload,
      };

    case updateRoles:
      return {
        ...state,
        roles: action.payload,
      };

    case updateIsAddRoleClicked:
      return {
        ...state,
        isAddRoleClicked: action.payload,
      };

    case updateIsEditRoleClicked:
      return {
        ...state,
        isEditRoleClicked: action.payload,
      };

    case updateRolesDataTable:
      return {
        ...state,
        rolesDataTable: action.payload,
      };
    case updateIsViewRoleClicked:
      return {
        ...state,
        isViewRoleClicked: action.payload,
      };

    //permission
    case updateNewPermission:
      return {
        ...state,
        newPermission: action.payload,
      };

    case updatePermissions:
      return {
        ...state,
        permissions: action.payload,
      };

    case updateIsAddPermissionClicked:
      return {
        ...state,
        isAddPermissionClicked: action.payload,
      };

    case updateIsEditPermissionClicked:
      return {
        ...state,
        isEditPermissionClicked: action.payload,
      };

    case updatePermissionsDataTable:
      return {
        ...state,
        permissionsDataTable: action.payload,
      };
    case updateIsViewPermissionClicked:
      return {
        ...state,
        isViewPermissionClicked: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
