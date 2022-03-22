import {  updateNewEmployee, updateIsAddEmployeeClicked, updateEmployees, updateIsEditEmployeeClicked } from './employees.types';


const INITIAL_STATE = {

	count: 0,
	newEmployee: {},
	isAddEmployeeCicked: false,
	employees: [
		{
			id: "fa2478b5-96b4-4351-b1a5-0f26b06c799b",
			name: "Asad Khan 1",
			age: "24",
			gender: "Male",
			dateOfBirth: "1998-04-03T19:00:00.000Z",
			education: "BSCS",
			email: "asad.khan@devbox.co",
			joiningDate: "2022-07-01T23:28:56.782Z",
			designation: "BSCS",
			address: "lahore",
			phoneNumber: "03075278869",
			technology: "ReatJS",
			workExperience: "1 year",
			salary: "30000",
			createdAt: "2022-03-21T01:05:27.170Z",
			updatedAt: "2022-03-21T01:05:27.170Z"
		},
		{id: "fa2478b5-96b4-4351-b1a5-0f26b06c799b",
		name: "Mubashar hassan",
		age: "24",
		gender: "Male",
		dateOfBirth: "1998-04-03T19:00:00.000Z",
		education: "BSCS",
		email: "asad.khan@devbox.co",
		joiningDate: "2022-07-01T23:28:56.782Z",
		designation: "BSCS",
		address: "lahore",
		phoneNumber: "03075278869",
		technology: "ReatJS",
		workExperience: "1 year",
		salary: "30000",
		createdAt: "2022-03-21T01:05:27.170Z",
		updatedAt: "2022-03-21T01:05:27.170Z"
	}
	],
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