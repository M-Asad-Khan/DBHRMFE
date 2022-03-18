
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Login = React.lazy(() => import('./views/pages/login/Login.js'))
const Employee= React.lazy(()=> import('./views/Employees/Index'))
const Clients= React.lazy(()=> import('./views/Clients/Index'))
const Teams= React.lazy(()=> import('./views/Teams/index'))
const routes = [
  { path: '/Employee', exact: true, name: 'Employee',component: Employee },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
 {path:"/login" ,name:"Login" ,component:Login},
  { path: '/clients', exact: true, name: 'Clients',component: Clients },
  { path: '/teams', exact: true, name: 'Teams',component: Teams },
]

export default routes
