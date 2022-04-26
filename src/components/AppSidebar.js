import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import image2vector from 'src/assets/images/image2vector.svg'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { updateShowSidebarAction } from 'src/redux/AppSidebar/appSidebar.actions'
import { updateIsAddClientClickedAction, updateIsEditClientClickedAction, updateIsViewClientClickedAction } from 'src/redux/Clients/clients.actions'
import { updateIsAddEmployeeClickedAction, updateIsEditEmployeeClickedAction, updateIsViewEmpClickedAction } from 'src/redux/Employees/employees.actions'
import { updateIsAddTeamClickedAction, updateIsEditTeamClickedAction, updateIsViewTeamClickedAction } from 'src/redux/Teams/teams.actions'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const appSidebarState = useSelector((state) => state.appSidebar);

  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  console.log(appSidebarState)
  const handleSidebarClick = () => {
    debugger;
    console.log('flags resets')
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

  }
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
      <CSidebarBrand className="d-none d-md-flex" to="/" style={{ backgroundColor: "white" }}>


        <img className="sidebar-brand-full" src={image2vector} height={35} />

        <img className="sidebar-brand-narrow" src={image2vector} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => { debugger; dispatch(updateShowSidebarAction(!appSidebarState.showSidebar)); debugger; }}

      // onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
