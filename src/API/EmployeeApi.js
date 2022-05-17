import axios from "axios";

class employeeApi {
  addEmployeeApi = async (newEmployee) => {
    console.log(newEmployee);
    debugger;
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/employees`,
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
        workExperience: newEmployee.workExperience,
        technology: newEmployee.technology,
      },
    })
      .then((result) => {
        debugger;
        return {
          error: false,
          data: result.data,
        };
      })
      .catch((err) => {
        debugger;
        const error = JSON.stringify(err);
        console.log("Employee Error", error);
        return {
          error: true,
          data: err,
        };
      });
  };

  deleteEmployeeApi = async (id) => {
    debugger;
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/employees/${id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
    })
      .then((result) => {
        debugger;
        return {
          error: false,
          data: result.data,
        };
      })
      .catch((err) => {
        debugger;
        return {
          error: true,
          data: err,
        };
      });
  };

  getEmployeesApi = async () => {
    debugger
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/employees`,
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

  updateEmployeeApi = async (newEmployee) => {
    debugger;
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/employees/${newEmployee.id}`,
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
      },
    })
      .then((result) => {
        debugger;
        return {
          error: false,
          data: result.data,
        };
      })
      .catch((err) => {
        debugger;
        return {
          error: true,
          data: err,
        };
      });
  };

  getEmployeeWorkHistory = async (empId) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/employees/work_history/${empId}`,
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
