import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { logoNegative } from "src/assets/brand/logo-negative";
import { sygnet } from "src/assets/brand/sygnet";
import image2vector from "src/assets/images/image2vector.svg";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../_nav";
import { updateShowSidebarAction } from "src/redux/AppSidebar/appSidebar.actions";
import {
  updateIsAddClientClickedAction,
  updateIsEditClientClickedAction,
  updateIsViewClientClickedAction,
} from "src/redux/Clients/clients.actions";
import {
  updateIsAddEmployeeClickedAction,
  updateIsEditEmployeeClickedAction,
  updateIsViewEmpClickedAction,
} from "src/redux/Employees/employees.actions";
import {
  updateIsAddTeamClickedAction,
  updateIsEditTeamClickedAction,
  updateIsViewTeamClickedAction,
} from "src/redux/Teams/teams.actions";

const AppSidebar = () => {
  let sidebarCotent = [];
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.currentUser);

  let currentUserPermissions = [];
  console.log("currentUser", currentUser);
  if (currentUser && currentUser !== null) {
    currentUserPermissions = currentUser.userPermission.map((x) => {
      return x.role.name;
    });
    console.log("permissions", currentUserPermissions);
  }
	debugger;
	

		//checks to set sidebarContent based on permission


  if (currentUserPermissions.includes("Admin")) {
    sidebarCotent = [...navigation];
  } else if (currentUserPermissions.includes("HR")) {
    sidebarCotent = navigation.filter((x) => {
      return x.name !== "User Managment";
    });
  } else if (currentUserPermissions.includes("Client")) {
    sidebarCotent = navigation.filter((x) => {
			if (
				x.name !== "User Managment" &&
				x.name !== "Candidates" &&
				x.name != "Interview Feedback" &&
				x.name != "Job Posting" &&
				x.name != "Teams" &&
				x.name != "Employee"
      ) return true;
    });
	}
	else if (currentUserPermissions.includes("Employee")) {
    sidebarCotent = navigation.filter((x) => {
			if (
				x.name !== "User Managment" &&
				x.name !== "Candidates" &&
				// x.name != "Interview Feedback" &&
				x.name != "Job Posting" &&
				x.name != "Teams"
				//&& x.name != "Employee"
      ) return true;
    });
	}
	

	currentUserPermissions &&
		currentUserPermissions?.forEach((x) => {
			if (x == "Admin") {
				sidebarCotent = navigation;
			} else if (x === "HR") {
				let sidebarOfHR = [];
				let tempContent = [];
				sidebarOfHR = navigation.filter((y) => {
					return y.name !== "User Managment";
				});
				if (sidebarCotent.length == 0) {
					sidebarCotent = [...sidebarOfHR];
				} else if (sidebarCotent.length > 0) {
					tempContent = sidebarOfHR.filter(
						({ name: id1 }) => !sidebarCotent.some(({ name: id2 }) => id2 === id1)
					);
					console.log("temproutes", tempContent);
					sidebarCotent = [...sidebarCotent, ...tempContent];
					console.log("routes 1233", sidebarCotent);
				}
			} else if (x == "Client") {
				let sidebarOfClient = [];
				let temp = [];
				sidebarOfClient =
				navigation.filter((y) => {
					if (
						y.name !== "User Managment" &&
						y.name !== "Candidates" &&
						y.name != "Interview Feedback" &&
						y.name != "Job Posting" &&
						y.name != "Teams" &&
						y.name != "Employee"
					)
						return true;
				});
			if (sidebarCotent.length == 0) {
				sidebarCotent = [...sidebarOfClient];
			} else if (sidebarCotent.length > 0) {
				temp = sidebarOfClient.filter(
					({ name: id1 }) => !sidebarCotent.some(({ name: id2 }) => id2 === id1)
				);
				console.log("tempRoutes", temp);
				sidebarCotent = [...sidebarCotent, ...temp];
				console.log("routes 1233", routes);
			}
		} else if (x == "Employee") {
		let	sidebarOfEmployee = [];
			let temp = [];
			sidebarOfEmployee = 
				navigation.filter((y) => {
					if (
						y.name !== "User Managment" &&
						y.name !== "Candidates" &&
						y.name != "Clients"
					)
						return true;
				});
			
			if (sidebarCotent.length == 0) {
				routes = [...sidebarOfEmployee];
			} else if (sidebarCotent.length > 0) {
				temp = sidebarCotent.filter(
					({ name: id1 }) => !sidebarCotent.some(({ name: id2 }) => id2 === id1)
				);
				console.log("temp", temp);
				sidebarCotent = [...sidebarCotent, ...temp];
				console.log("sidebarCotent 1233", sidebarCotent);
			}
		}
	});


















  console.log("sidebarCotent", sidebarCotent);

  const appSidebarState = useSelector((state) => state.appSidebar);

  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  // console.log(appSidebarState);
  const handleSidebarClick = () => {
    debugger;
    console.log("flags resets");
    //client flags
    dispatch(updateIsAddClientClickedAction(null));
    dispatch(updateIsEditClientClickedAction(null));
    dispatch(updateIsViewClientClickedAction(null));

    // Employee flags
    dispatch(updateIsAddEmployeeClickedAction(null));
    dispatch(updateIsEditEmployeeClickedAction(null));
    dispatch(updateIsViewEmpClickedAction(null));

    //team flags
    dispatch(updateIsAddTeamClickedAction(null));
    dispatch(updateIsEditTeamClickedAction(null));
    dispatch(updateIsViewTeamClickedAction(null));
  };
  return (
    <CSidebar
      position="fixed"
      // unfoldable={true}
      visible={appSidebarState.showSidebar}
      // onVisibleChange={(visible) => {
      //   dispatch({ type: 'set', sidebarShow: visible })
      // }}
      onClick={handleSidebarClick}
    >
      <CSidebarBrand
        className="d-none d-md-flex"
        to="/"
        style={{ backgroundColor: "white" }}
      >
        <img className="sidebar-brand-full" src={image2vector} height={35} />

        <img className="sidebar-brand-narrow" src={image2vector} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={sidebarCotent} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => {
          debugger;
          dispatch(updateShowSidebarAction(!appSidebarState.showSidebar));
          debugger;
        }}

        // onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
