import {  updateNewEmployee, updateIsAddEmployeeClicked, updateEmployees } from './employees.types';


const INITIAL_STATE = {

	count: 0,
	newEmployee: {},
	isAddEmployeeCicked: false,
	employees: [

		{ Id: 101, fname: 'Aysha', email: 'Lahore', mob: 12345 },

		{ Id: 102, fname: 'Asad', email: 'Lahore', mob: 23456, },

		{ Id: 103, fname: 'Mubashir', email: 'Lahore', mob: 34567 }

	]
};

const reducer = (state = INITIAL_STATE, action) => {

	switch (action.type) {

		case INCREMENT:

			return {

				...state, count: state.count + 1,

			};

		case DECREMENT:

			return {
				...state, count: state.count - 1,

			};


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

		default: return state;
	}

};

export default reducer;