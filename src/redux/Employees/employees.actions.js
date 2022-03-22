
import {updateNewEmployee,updateIsAddEmployeeClicked,updateEmployees } from './employees.types';




export const updateNewEmployeeAction = (params) => {

	return {

		type: updateNewEmployee,
		payload: params

	};
}
	export const updateIsAddEmployeeClickedAction = (params) => {

		return {

			type: updateIsAddEmployeeClicked,
			payload: params

		};
	};

	export const updateEmployeesAction = (params) => {

		return {

			type: updateEmployees,
			payload: params

		};
	};