import { combineReducers } from 'redux';


import employeesReducer from './Employees/employees.reducer';
import clientsReducer from './Clients/clients.reducer'
import teamsReducer from './Teams/teams.reducer'


const rootReducer = combineReducers({

	employees: employeesReducer,
	clients: clientsReducer,
	teams:teamsReducer

});

export default rootReducer;