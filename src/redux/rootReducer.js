import { combineReducers } from 'redux';


import employeesReducer from './Employees/employees.reducer';


const rootReducer = combineReducers({

		employees: employeesReducer,

});

export default rootReducer;