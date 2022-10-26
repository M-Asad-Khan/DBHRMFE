import React from 'react'
import {
    CAvatar,

    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import {
 
    cilLockLocked,
 
    cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useSelector, useDispatch } from "react-redux";
import avatar8 from './../../assets/images/team.jpeg'

const AppHeaderDropdown = () => {
    const handleLogout = () => {

        localStorage.clear();
        window.location.reload();
    }

    const userManagmentState = useSelector((state) => state?.login?.currentUser?.user);

    return ( 
        <CDropdown variant = "nav-item" >
        <CDropdownToggle placement = "bottom-end"
        className = "py-0"
        caret = { false } >
        <CAvatar src = { userManagmentState?.picture?userManagmentState?.picture:avatar8}
        size = "md" />
        {userManagmentState?.name}
        </CDropdownToggle> 
       
        <CDropdownMenu className = "pt-0"
        placement = "bottom-end" >
        <CDropdownHeader className = "bg-light fw-semibold py-2" > Account 
        </CDropdownHeader>
        <CDropdownHeader className = "bg-light fw-semibold py-2" > {userManagmentState?.name} 
        </CDropdownHeader>
        <CDropdownItem href = "#" >
        <CIcon icon = { cilUser }
        className = "me-2" />
        Profile </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem onClick = {
            () => handleLogout() } >
        <CIcon icon = { cilLockLocked }
        className = "me-2" />
        Logout </CDropdownItem>
         </CDropdownMenu> 
         </CDropdown>
    )
}

export default AppHeaderDropdown