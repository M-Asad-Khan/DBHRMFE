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
  let sidebarContent = [];
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
  const ActiveRoutes = (x)=>{
    const tempSidebar = x.filter(
      ({ name: id1 }) => !sidebarContent.some(({ name: id2 }) => id2 === id1));
      sidebarContent = [...sidebarContent, ...tempSidebar];
    }
  currentUserPermissions &&
    currentUserPermissions?.map((x) => {
      if (x == "Admin") {
        sidebarContent = navigation;
      } else if (x === "HR") {
       let  sidebarOfHR = navigation.filter((y) => {
          return y.name !== "User Managment";
        });
        sidebarContent.length <= 0 ? sidebarContent = [...sidebarOfHR] : ActiveRoutes(sidebarOfHR);
      } else if (x == "Client") {
        let sidebarOfClient =
        navigation.filter((x) => {
          if (
            x.name !== "User Managment" &&
            x.name !== "HR"&&
            x.name !=="Accounts"&&
            x.name !=="Attendence"
          )
            return true;
        });
        sidebarContent.length <= 0 ? sidebarContent = [...sidebarOfClient] : ActiveRoutes(sidebarOfClient);
    } else if (x == "Employee") {
      let sidebarOfEmployee =
        navigation.filter((y) => {
          if (
            y.name !== "User Managment" &&
            y.name !=="Accounts"&&
            y.name !=="HR" ){
             
             /*  let temp = sidebarOfEmployee.filter(item => {
                if( item.name == "Resource Plaining") {
       
                item.items.filter((x)=>{return  x.name != "Client"} )
                    
                 }
                  }) */
                  return true
            }
            
        });
        
        
        sidebarContent.length <= 0 ? sidebarContent = [...sidebarOfEmployee] : ActiveRoutes(sidebarOfEmployee);
    }
  });
  const appSidebarState = useSelector((state) => state.appSidebar);
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
      visible={appSidebarState.showSidebar}
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
          <AppSidebarNav items={sidebarContent} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => {
          debugger;
          dispatch(updateShowSidebarAction(!appSidebarState.showSidebar));
          debugger;
        }}
      />
    </CSidebar>
  );
};
export default React.memo(AppSidebar);