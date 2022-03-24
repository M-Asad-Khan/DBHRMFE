import {  updateNewEmployee, updateIsAddEmployeeClicked, updateEmployees, updateIsEditEmployeeClicked } from './employees.types';


const INITIAL_STATE = {

	count: 0,
	newEmployee: {},
	isAddEmployeeCicked: false,
	employees: [],
	isEditEmployeeClicked:false
};

const reducer = (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case updateNewEmployee:

			return {
				...state, newEmployee: action.payload

			};

		case updateEmployees:

			return {
				...state, employees: action.payload

			};

		case updateIsAddEmployeeClicked:

			return {
				...state, isAddEmployeeCicked: action.payload

			};
		
			case updateIsEditEmployeeClicked:

				return {
					...state, isEditEmployeeClicked: action.payload
	
				};

		default: return state;
	}

};

export default reducer;