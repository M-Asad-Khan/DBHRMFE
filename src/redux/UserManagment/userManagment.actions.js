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

//user actions
export const updateNewUserAction = (params) => {
    return {
        type: updateNewUser,
        payload: params,
    };
};
export const updateIsAddUserClickedAction = (params) => {
    return {
        type: updateIsAddUserClicked,
        payload: params,
    };
};

export const updateUsersAction = (params) => {
    return {
        type: updateUsers,
        payload: params,
    };
};

export const updateIsEditUserClickedAction = (params) => {
    return {
        type: updateIsEditUserClicked,
        payload: params,
    };
};

export const updateUsersDataTableAction = (params) => {
    return {
        type: updateUsersDataTable,
        payload: params,
    };
};

// export const updateClientsAction = (params) => {
//   return {
//     type: updateClients,
//     payload: params,
//   };
// };
export const updateIsViewUserClickedAction = (params) => {
    return {
        type: updateIsViewUserClicked,
        payload: params,
    };
};

//Role actions
export const updateNewRoleAction = (params) => {
    return {
        type: updateNewRole,
        payload: params,
    };
};
export const updateIsAddRoleClickedAction = (params) => {
    return {
        type: updateIsAddRoleClicked,
        payload: params,
    };
};

export const updateRolesAction = (params) => {
    return {
        type: updateRoles,
        payload: params,
    };
};

export const updateIsEditRoleClickedAction = (params) => {
    return {
        type: updateIsEditRoleClicked,
        payload: params,
    };
};

export const updateRolesDataTableAction = (params) => {
    return {
        type: updateRolesDataTable,
        payload: params,
    };
};

export const updateIsViewRoleClickedAction = (params) => {
    return {
        type: updateIsViewRoleClicked,
        payload: params,
    };
};

//Permission actions
export const updateNewPermissionAction = (params) => {
    return {
        type: updateNewPermission,
        payload: params,
    };
};
export const updateIsAddPermissionClickedAction = (params) => {

    return {
        type: updateIsAddPermissionClicked,
        payload: params,
    };
};

export const updatePermissionsAction = (params) => {
    return {
        type: updatePermissions,
        payload: params,
    };
};

export const updateIsEditPermissionClickedAction = (params) => {
    return {
        type: updateIsEditPermissionClicked,
        payload: params,
    };
};

export const updatePermissionsDataTableAction = (params) => {
    return {
        type: updatePermissionsDataTable,
        payload: params,
    };
};

export const updateIsViewPermissionClickedAction = (params) => {
    return {
        type: updateIsViewPermissionClicked,
        payload: params,
    };
};