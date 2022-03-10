
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Login = React.lazy(() => import('./views/pages/login/Login.js'))
const Employee= React.lazy(()=> import('./Employees/employelist'))
const AddEmployee= React.lazy(()=> import('./Employees/Addemployee/addemployee'))
const Clients= React.lazy(()=> import('./Clients/clientslist'))
const AddClients= React.lazy(()=> import('./Clients/Addclients/addclients'))
const Teams= React.lazy(()=> import('./Teams/teamlist'))
const AddTeams= React.lazy(()=> import('./Teams/Addteams/addteams'))
const routes = [
  { path: '/Employee', exact: true, name: 'Employee',component: Employee },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

 {path:"/login" ,name:"Login" ,component:Login},
  {path: "/addEmployee", name:"AddEmployee",component:AddEmployee},
  { path: '/clients', exact: true, name: 'Clients',component: Clients },
  { path: '/addClients', name: 'Addclients', component: AddClients },
  { path: '/teams', exact: true, name: 'Teams',component: Teams },
  { path: '/addteams', name: 'AddTeams', component: AddTeams }
]

export default routes
