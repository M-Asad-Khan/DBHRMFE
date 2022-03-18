import { combineReducers } from 'redux';


import employeesReducer from './Employees/employees.reducer';
import clientsReducer from './Clients/clients.reducer'

const rootReducer = combineReducers({

	employees: employeesReducer,
	clients:clientsReducer

});

export default rootReducer;