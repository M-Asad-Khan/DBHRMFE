import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilPeople,cilArrowTop, cilOptions } from '@coreui/icons'
import { useHistory } from "react-router-dom";
import { employeeRequests } from "src/API/EmployeeApi";
import { useSelector, useDispatch } from "react-redux";

import { teamRequests } from "src/API/TeamApi";
import { candidateRequests } from "src/API/CandidateApi";
import { clientRequests } from "src/API/ClientApi";
import { helpDeskRequests } from 'src/API/helpDeskApi'

const WidgetsDropdown = () => {

const userManagmentState = useSelector((state) => state);
const [totalEmployee,setTotalEmployee]=useState(0);
const [totalClients,setTotalClients]=useState(0);
const [totalTeams,setTotalTeams]=useState(0);
const [ticketsStatusCount, setTicketsStatusCount] = useState({});

const [totalCandidates,setTotalCandidates]=useState(0);
const currentUser = useSelector((state) => state.login.currentUser);
const history = useHistory();

useEffect(() => {
  handleGetEmployeeApi();
}, []);

const handleGetEmployeeApi=async()=>{
    const result = await helpDeskRequests.getAllTicketsApi();


    const ticketStatus = {
        review: 0,
        progress: 0,
        resolved: 0,
        declined: 0
    };

    if (!result.error) {
        result.data.map(x => {
            if (x.status == "In Review") {
                ticketStatus.review = ticketStatus?.review + 1;
            }
            if (x.status == "In Progress") {
                ticketStatus.progress = ticketStatus?.progress + 1;
            }
            if (x.status == "Resolved") {
                ticketStatus.resolved = ticketStatus?.resolved + 1;
            }
            if (x.status == "Declined") {
                ticketStatus.declined = ticketStatus?.declined + 1;
            }
          
        })

        setTicketsStatusCount(ticketStatus)
    }



  const employees=await employeeRequests.getEmployeesApi();
  setTotalEmployee(employees.data.length);
  const clients= await clientRequests.getClientsApi();
  setTotalClients(clients.data.length);
  const candidates=await candidateRequests.getCandidatesApi();
  setTotalCandidates(candidates.data.length)
  const teams=await teamRequests.getTeamsApi();
  setTotalTeams(teams.data.length)
}

  return (
  <>
       { currentUser.userPermission.some(
          (x) => x.role.name === "Admin" || x.role.name === "HR"
        )==true&&
      <>
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
         onClick={()=>  history.push("/Employee")}
          className="mb-4"
          color="primary"
          value={
            <>
              {totalEmployee}{' '}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilPeople}
               
                />
              </span>
            </>
          }
          title="Employees"
          // action={
          //   <CDropdown alignment="end">
          //     <CDropdownToggle color="transparent" caret={false} className="p-0">
          //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
          //     </CDropdownToggle>
          //     <CDropdownMenu>
          //       <CDropdownItem>Action</CDropdownItem>
          //       <CDropdownItem>Another action</CDropdownItem>
          //       <CDropdownItem>Something else here...</CDropdownItem>
          //       <CDropdownItem disabled>Disabled action</CDropdownItem>
          //     </CDropdownMenu>
          //   </CDropdown>
          // }
    
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
            onClick={()=>  history.push("/clients")}
          className="mb-4"
          color="info"
          value={
            <>
             {totalClients}{' '}
              <span className="fs-6 fw-normal">
             <CIcon icon={cilPeople} />
              </span>
            </>
          }
          title="Clients"
          // action={
          //   <CDropdown alignment="end">
          //     <CDropdownToggle color="transparent" caret={false} className="p-0">
          //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
          //     </CDropdownToggle>
          //     <CDropdownMenu>
          //       <CDropdownItem>Action</CDropdownItem>
          //       <CDropdownItem>Another action</CDropdownItem>
          //       <CDropdownItem>Something else here...</CDropdownItem>
          //       <CDropdownItem disabled>Disabled action</CDropdownItem>
          //     </CDropdownMenu>
          //   </CDropdown>
          // }
       
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
             {totalCandidates}{' '}
              <span className="fs-6 fw-normal">
               <CIcon icon={cilArrowTop} />
              </span>
            </>
          }
          onClick={()=>  history.push("/candidates")}
          title="Candidates"
          // action={
          //   <CDropdown alignment="end">
          //     <CDropdownToggle color="transparent" caret={false} className="p-0">
          //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
          //     </CDropdownToggle>
          //     <CDropdownMenu>
          //       <CDropdownItem>Action</CDropdownItem>
          //       <CDropdownItem>Another action</CDropdownItem>
          //       <CDropdownItem>Something else here...</CDropdownItem>
          //       <CDropdownItem disabled>Disabled action</CDropdownItem>
          //     </CDropdownMenu>
          //   </CDropdown>
          // }
        
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              {totalTeams}{' '}
              <span className="fs-6 fw-normal">
               <CIcon icon={cilArrowBottom} />
              </span>
            </>
          }
          onClick={()=>  history.push("/teams")}
          title="Teams"
          // action={
          //   <CDropdown alignment="end">
          //     <CDropdownToggle color="transparent" caret={false} className="p-0">
          //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
          //     </CDropdownToggle>
          //     <CDropdownMenu>
          //       <CDropdownItem>Action</CDropdownItem>
          //       <CDropdownItem>Another action</CDropdownItem>
          //       <CDropdownItem>Something else here...</CDropdownItem>
          //       <CDropdownItem disabled>Disabled action</CDropdownItem>
          //     </CDropdownMenu>
          //   </CDropdown>
          // }
         
        />
      </CCol>
    </CRow>



<CRow>
<CCol sm={6} lg={3}>
  <CWidgetStatsA
   onClick={()=>  history.push("/helpdesktickets")}
    className="mb-4"
    color="success"
    value={
      <>
        {ticketsStatusCount.resolved}{' '}
        <span className="fs-6 fw-normal">
          <CIcon icon={cilPeople}
         
          />
        </span>
      </>
    }
    title="Resolved Tickets"
    // action={
    //   <CDropdown alignment="end">
    //     <CDropdownToggle color="transparent" caret={false} className="p-0">
    //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
    //     </CDropdownToggle>
    //     <CDropdownMenu>
    //       <CDropdownItem>Action</CDropdownItem>
    //       <CDropdownItem>Another action</CDropdownItem>
    //       <CDropdownItem>Something else here...</CDropdownItem>
    //       <CDropdownItem disabled>Disabled action</CDropdownItem>
    //     </CDropdownMenu>
    //   </CDropdown>
    // }

  />
</CCol>
<CCol sm={6} lg={3}>
  <CWidgetStatsA
      onClick={()=>  history.push("/helpdesktickets")}
    className="mb-4"
    color="info"
    value={
      <>
       {ticketsStatusCount.review}{' '}
        <span className="fs-6 fw-normal">
       <CIcon icon={cilPeople} />
        </span>
      </>
    }
    title="In Review Tickets"
    // action={
    //   <CDropdown alignment="end">
    //     <CDropdownToggle color="transparent" caret={false} className="p-0">
    //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
    //     </CDropdownToggle>
    //     <CDropdownMenu>
    //       <CDropdownItem>Action</CDropdownItem>
    //       <CDropdownItem>Another action</CDropdownItem>
    //       <CDropdownItem>Something else here...</CDropdownItem>
    //       <CDropdownItem disabled>Disabled action</CDropdownItem>
    //     </CDropdownMenu>
    //   </CDropdown>
    // }
 
  />
</CCol>
<CCol sm={6} lg={3}>
  <CWidgetStatsA
    className="mb-4"
    color="warning"
    value={
      <>
       {ticketsStatusCount.progress}{' '}
        <span className="fs-6 fw-normal">
         <CIcon icon={cilArrowTop} />
        </span>
      </>
    }
    onClick={()=>  history.push("/helpdesktickets")}
    title="In Process Tickets"
    // action={
    //   <CDropdown alignment="end">
    //     <CDropdownToggle color="transparent" caret={false} className="p-0">
    //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
    //     </CDropdownToggle>
    //     <CDropdownMenu>
    //       <CDropdownItem>Action</CDropdownItem>
    //       <CDropdownItem>Another action</CDropdownItem>
    //       <CDropdownItem>Something else here...</CDropdownItem>
    //       <CDropdownItem disabled>Disabled action</CDropdownItem>
    //     </CDropdownMenu>
    //   </CDropdown>
    // }
  
  />
</CCol>
<CCol sm={6} lg={3}>
  <CWidgetStatsA
    className="mb-4"
    color="danger"
    value={
      <>
        {ticketsStatusCount.declined}{' '}
        <span className="fs-6 fw-normal">
         <CIcon icon={cilArrowBottom} />
        </span>
      </>
    }
    onClick={()=>  history.push("/helpdesktickets")}
    title="Declined Tickets"
    // action={
    //   <CDropdown alignment="end">
    //     <CDropdownToggle color="transparent" caret={false} className="p-0">
    //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
    //     </CDropdownToggle>
    //     <CDropdownMenu>
    //       <CDropdownItem>Action</CDropdownItem>
    //       <CDropdownItem>Another action</CDropdownItem>
    //       <CDropdownItem>Something else here...</CDropdownItem>
    //       <CDropdownItem disabled>Disabled action</CDropdownItem>
    //     </CDropdownMenu>
    //   </CDropdown>
    // }
   
  />
</CCol>
</CRow>
</>

        }
        </>
  )
}

export default WidgetsDropdown
