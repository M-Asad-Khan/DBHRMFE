import axios from "axios";
import moment from "moment";

class employeeApi {
    addEmployeeApi = async(newEmployee) => {


        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employees`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    name: newEmployee.name,
                    gender: newEmployee.gender,
                    dateOfBirth: newEmployee.dateOfBirth,
                    education: newEmployee.education ? newEmployee.education : "N/A",
                    email: newEmployee.email,
                    joiningDate: newEmployee.joiningDate,
                    designation: newEmployee.designation,
                    address: newEmployee.address,
                    phoneNumber: newEmployee.phoneNumber,
                    salary: newEmployee.salary ? newEmployee.salary : "0000",
                    permanentDate: newEmployee.permanentDate == "Same" ? newEmployee.joiningDate : newEmployee.permanentDate,
                    status: newEmployee.status,
                    appointmentLetterStatus: newEmployee.appointmentLetterStatus === "true",
                    agreementSignStatus: newEmployee.agreementSignStatus === "true",
                    linkedInProfile: newEmployee.linkedInProfile ? newEmployee.linkedInProfile : "N/A",
                    personalEmail: newEmployee.personalEmail,
                    cnic: newEmployee.cnic,
                    employee_No: newEmployee.employee_No,
                    workExperience: newEmployee.workExperience ? newEmployee.workExperience : "0",
                    technology: newEmployee.technology ? newEmployee.technology : "N/A",
                    profile_url: newEmployee.profile_url ? newEmployee.profile_url : ""
                },
            })
            .then((result) => {

                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {

                const error = JSON.stringify(err);
                console.log("Employee Error", error);
                return {
                    error: true,
                    data: err,
                };
            });
    };

    addBulkEmployeeApi = async(newEmployee) => {


        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employees/bulkCreate`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    name: newEmployee.name,
                    gender: newEmployee.gender,
                    dateOfBirth: newEmployee.dateOfBirth,
                    education: newEmployee.education ? newEmployee.education : "N/A",
                    email: newEmployee.email,
                    joiningDate: newEmployee.joiningDate,
                    designation: newEmployee.designation,
                    address: newEmployee.address,
                    phoneNumber: newEmployee.phoneNumber,
                    salary: newEmployee.salary ? newEmployee.salary : "0000",
                    permanentDate: newEmployee.permanentDate == "Same" ? newEmployee.joiningDate : newEmployee.permanentDate,
                    status: newEmployee.status,
                    appointmentLetterStatus: newEmployee.appointmentLetterStatus === "true",
                    agreementSignStatus: newEmployee.agreementSignStatus === "true",
                    linkedInProfile: newEmployee.linkedInProfile ? newEmployee.linkedInProfile : "N/A",
                    personalEmail: newEmployee.personalEmail,
                    cnic: newEmployee.cnic,
                    employee_No: newEmployee.employee_No,
                    workExperience: newEmployee.workExperience ? newEmployee.workExperience : "0",
                    technology: newEmployee.technology ? newEmployee.technology : "N/A",
                    profile_url: newEmployee.profile_url ? newEmployee.profile_url : ""
                },
            })
            .then((result) => {

                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {

                const error = JSON.stringify(err);
                console.log("Employee Error", error);
                return {
                    error: true,
                    data: err,
                };
            });
    };

    deleteLeaves(id) {
        return axios({
                method: "delete",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeLeaves/${id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {},
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                return {
                    error: true,
                    data: err,
                };
            });
    }



    updateEmployeeLeavesApi = async(leaves) => {
        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeLeaves`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    id: leaves.id,
                    EmployeeId: leaves.EmployeeId,
                    ApplicationDate: moment(),
                    LeavesDates: leaves.LeavesDates,
                    LeaveType: leaves.LeaveType,
                    ApplicationStatus: leaves.ApplicationStatus,
                    Reason: leaves.Reason,
                },
            })
            .then((result) => {

                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                const error = JSON.stringify(err);
                console.log("Employee Error", error);
                return {
                    error: true,
                    data: err,
                };
            });
    };

    addEmployeeLeavesApi = async(leaves) => {
        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeLeaves`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    EmployeeId: leaves.EmployeeId,
                    ApplicationDate: moment(),
                    LeavesDates: leaves.LeavesDates,
                    LeaveType: leaves.LeaveType,
                    ApplicationStatus: leaves.ApplicationStatus,
                    Reason: leaves.Reason,
                },
            })
            .then((result) => {

                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                const error = JSON.stringify(err);
                console.log("Employee Error", error);
                return {
                    error: true,
                    data: err,
                };
            });
    };

    getEmployeesLeavesApi = async(id) => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeLeaves/${id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                return {
                    error: true,
                    data: err,
                };
            });
    };

    getAllEmployeesLeavesApi = async() => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeLeaves`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                return {
                    error: true,
                    data: err,
                };
            });
    };

    deleteEmployeeApi = async(id) => {

        return axios({
                method: "delete",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employees/${id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
            })
            .then((result) => {

                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {

                return {
                    error: true,
                    data: err,
                };
            });
    };

    getEmployeesApi = async() => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employees`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                return {
                    error: true,
                    data: err,
                };
            });
    };
    getEmployeeApi = async(id) => {

        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employees/${id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                return {
                    error: true,
                    data: err,
                };
            });
    };


    updateEmployeeApi = async(newEmployee) => {

        return axios({
                method: "patch",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employees/${newEmployee.id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    name: newEmployee.name,
                    gender: newEmployee.gender,
                    dateOfBirth: newEmployee.dateOfBirth,
                    education: newEmployee.education,
                    email: newEmployee.email,
                    joiningDate: newEmployee.joiningDate,
                    designation: newEmployee.designation,
                    address: newEmployee.address,
                    phoneNumber: newEmployee.phoneNumber,
                    salary: newEmployee.salary,
                    permanentDate: newEmployee.permanentDate,
                    status: newEmployee.status,
                    appointmentLetterStatus: newEmployee.appointmentLetterStatus === "true",
                    agreementSignStatus: newEmployee.agreementSignStatus === "true",
                    linkedInProfile: newEmployee.linkedInProfile,
                    personalEmail: newEmployee.personalEmail,
                    cnic: newEmployee.cnic,
                    employee_No: newEmployee.employee_No,
                    profile_url: newEmployee.profile_url
                },
            })
            .then((result) => {

                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {

                return {
                    error: true,
                    data: err,
                };
            });
    };

    getEmployeeWorkHistory = async(empId) => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employees/work_history/${empId}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                return {
                    error: true,
                    data: err,
                };
            });
    };
}
export let employeeRequests = new employeeApi();