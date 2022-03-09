
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Login = React.lazy(() => import('./views/pages/login/Login.js'))
const Employee= React.lazy(()=> import('./Employees/employelist'))
const AddEmployee= React.lazy(()=> import('./Employees/Addemployee/addemployee'))
const routes = [
  { path: '/Employee', exact: true, name: 'Employee',component: Employee },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  {path:"/login" ,name:"Login" ,component:Login},
  {path: "/addEmployee", name:"AddEmployee",component:AddEmployee}
]

export default routes
