import axios from "axios";

class candidateApi {
  addCandidateApi = async (newCandidate) => {
    console.log(newCandidate);
    debugger;
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/candidates`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        name: newCandidate.name,
        gender: newCandidate.gender,
        dateOfBirth: newCandidate.dateOfBirth,
        education: newCandidate.education,
        email: newCandidate.email,
        joiningDate: newCandidate.joiningDate,
        designation: newCandidate.designation,
        address: newCandidate.address,
        phoneNumber: newCandidate.phoneNumber,
        salary: newCandidate.salary,
        permanentDate: newCandidate.permanentDate,
        status: newCandidate.status,
        appointmentLetterStatus: newCandidate.appointmentLetterStatus === "true",
        agreementSignStatus: newCandidate.agreementSignStatus === "true",
        linkedInProfile: newCandidate.linkedInProfile,
        personalEmail: newCandidate.personalEmail,
        cnic: newCandidate.cnic,
        employee_No: newCandidate.employee_No,
        workExperience: newCandidate.workExperience,
        technology: newCandidate.technology,
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
        console.log("Candidate Error", error);
        return {
          error: true,
          data: err,
        };
      });
  };
}
export let candidateRequests = new candidateApi();