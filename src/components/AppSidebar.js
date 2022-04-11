import React, { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { updateShowSidebarAction } from 'src/redux/AppSidebar/appSidebar.actions'

const AppSidebar = () => {
	const dispatch = useDispatch()
	const appSidebarState = useSelector((state) => state.appSidebar);

  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)
	console.log(appSidebarState)
  return (
    <CSidebar
      position="fixed"
      // unfoldable={true}
      visible={appSidebarState.showSidebar}
      // onVisibleChange={(visible) => {
      //   dispatch({ type: 'set', sidebarShow: visible })
      // }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
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
