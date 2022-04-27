import React from "react";
import Select from "react-select";
import {
  updateNewCandidateAction,
  updateCandidatesAction,
  updateIsAddCandidateClickedAction,
  updateIsEditCandidateClickedAction,
} from "../../../redux/Candidates/candidates.actions";
import { CButton } from "@coreui/react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { candidateRequests } from "src/API/CandidateApi";
import { IoArrowBackSharp } from "react-icons/io5";

const addcandidates = ({}) => {
  const [fieldsWithError, setFieldsWithError] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phoneNumber: false,
    gender:false,
    status:false,
    postAplliedFor:false,
    appliedDate: false,
    skills:false,
    
  });
  const [errorInfo, setErrorInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const hrState = useSelector((state) => state.candidates);

  function handleChange(evt) {
    debugger;
    const value = evt.target.value;
    dispatch(
      updateNewCandidateAction({
        ...hrState.newCandidate,
        [evt.target.name]: value,
      })
    );
  }
  const handleCancel = () => {
    dispatch(updateNewCandidateAction({}));
    dispatch(updateIsAddCandidateClickedAction(false));
    dispatch(updateIsEditCandidateClickedAction(false));
  };

  const addAndUpdateCandidate = async () => {
    debugger;
    if (!doValidation()) {
      if (hrstate.isEditCandidateClicked === true) {
        try {
          debugger;
          const res = await candidateRequests.updateCandidateApi(
            hrstate.newCandidate
          );
          console.log("updateCandidate Response", res);
          if (res.error === false) {
            debugger;
            toast.success("Candidate Updated !");
            let temp = state.candidates.filter(
              (item) => item.id != res.data.id
            );
            dispatch(updateCandidatesAction([...temp, res.data]));
            dispatch(updateIsAddCandidateClickedAction(false));
            dispatch(updateIsEditCandidateClickedAction(false));
          }
        } catch (e) {
          toast.error("error !");
          debugger;
        }
      } else {
        try {
          debugger;
          const res = await candidateRequests.addCandidateApi(
            state.newCandidate
          );
          console.log("addCandidateApi Response", res);
          debugger;
          if (res.error === false) {
            toast.success("Candidate Added !");
            debugger;
            dispatch(updateCandidatesAction([...hrstate.candidates, res.data]));
            dispatch(updateIsAddCandidateClickedAction(false));
            dispatch(updateIsEditCandidateClickedAction(false));
          }
        } catch (e) {
          debugger;
          toast.error("error");
        }
      }
    } else {
      toast.error("validation failed");
      console.log("validation failed");
      debugger;
    }
  };
  const doValidation = () => {
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = { ...errorInfo };
    debugger;

    Object.entries(fieldsWithError).forEach((x) => {
      debugger;
      if (hrState.newCandidate[x[0]] !== undefined) {
        if (hrState.newCandidate[x[0]] !== "") {
          if (x[0] === "email" || x[0] === "phoneNumber") {
            isError = fieldsWithError[x[0]];
          } else {
            tempFieldsWithError[x[0]] = false;
            tempErrorInfo[x[0]] = null;
            isError = false;
          }
        } else {
          tempFieldsWithError[x[0]] = true;
          tempErrorInfo[x[0]] = `${x[0]} cannot be empty`;
          isError = true;
        }
      } else {
        tempFieldsWithError[x[0]] = true;
        tempErrorInfo[x[0]] = `${x[0]} cannot be empty`;
        isError = true;
      }
    });
    debugger;
    setErrorInfo(tempErrorInfo);
    setFieldsWithError(tempFieldsWithError);
    Object.entries(tempFieldsWithError).forEach((x) => {
      if (x[1] === true) {
        isError = true;
      }
    });
    console.log("isError", isError);
    return isError;
  };

  function validateEmail(email) {
    {
      var regx = /\S+@\S+\.\S+/;
      if (regx.test(email)) {
        console.log(true);
        setFieldsWithError({
          ...fieldsWithError,
          email: false,
        });
      } else {
        console.log(false);
        setFieldsWithError({
          ...fieldsWithError,
          email: true,
        });
        setErrorInfo({
          ...errorInfo,
          email: "You have entered an invalid email address!",
        });
      }
    }
  }
  function validateNumberOnly(num) {
    var reg = new RegExp("^[0-9]*$");

    if (reg.test(num) == false) {
      console.log(false);
      setFieldsWithError({
        ...fieldsWithError,
        phoneNumber: true,
      });
      setErrorInfo({
        ...errorInfo,
        phoneNumber: "only Numbers allowed",
      });
    } else {
      setFieldsWithError({
        ...fieldsWithError,
        phoneNumber: false,
      });
    }
  }
  console.log("fieldsWithError", fieldsWithError);
  console.log("errorInfo", errorInfo);


  const candStatusOptions = [
    { value: "Applied", label: "Applied", field: "status" },
    { value: "Scheduled", label: "Scheduled Interview", field: "status" },
    { value: "Offered", label: "Offered", field: "status" },
    { value: "Hired", label: "Hired", field: "status" },
    { value: "Rejected", label: "Rejected", field: "status" },
    { value: "NotAppeared", label: "Not Appeared", field: "status" },
  ];
  return (
    <>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="card">
            <form className="form-card">
            <button
                className="btn btn-outline-primary mb-3"
                onClick={handleCancel}
              >
                <IoArrowBackSharp />
              </button>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    First name<span className="text-danger"> *</span>
                  </label>
                  <input
                  className={
                    fieldsWithError.firstname === true ? "redBorder" : ""
                  }
                    value={hrState.newCandidate.firstname}
                    onChange={handleChange}
                    type="text"
                    id="FirstName"
                    name="FirstName"
                    placeholder="Enter your first name"
                  />{" "}
                  {fieldsWithError.firstname === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.firstname}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}

                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Last name<span className="text-danger"> *</span>
                  </label>
                  <input
                   
                   className=
                   {fieldsWithError.lastname === true ? "redBorder" : ""}
                   value={hrState.newCandidate.lastname}
                   onChange={handleChange}
                   type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Enter your last name"
                 />{" "}
                 {fieldsWithError.lastname === true ? (
                   <>
                     <label className="error form-control-label px-3">
                       {errorInfo.lastname}
                     </label>{" "}
                   </>
                 ) : (
                   ""
                 )}
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Email<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder=""
                    onblur="validate(3)"
                  />
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Phone number<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder=""
                    onblur="validate(4)"
                  />
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Gender<span className="text-danger"> *</span>
                  </label>
                  {""}

                  <Select
                    id="gender"
                    name="gender"
                    options={[
                      { label: "Male", value: "male", field: "gender" },
                      { label: "Female", value: "female", field: "gender" },
                    ]}
                  ></Select>
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Status<span className="text-danger"> *</span>
                  </label>
                  <Select
                    /* value={} */

                    id="status"
                    name="status"
                    options={candStatusOptions}
                  ></Select>
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Post Applied for?
                    <span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="postAppliedFor"
                    name="postAppliedFor"
                    placeholder=""
                    onblur="validate(6)"
                  />
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Applied Date<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="date"
                    id="AppliedDate"
                    name="AppliedDate"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-12 flex-column d-flex">
                  <label className="form-control-label">
                    Skills
                    <span className="text-danger"> *</span>
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    placeholder="Write your skills here"
                    rows="4"
                    required="required"
                  ></textarea>
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 ">
                  <button
                    className="btn-block btn-primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                <div className="form-group col-sm-6 ">
                  <CButton
                    className="btn-block btn-primary"
                    onClick={() => addAndUpdateEmployee()}
                  >
                    {state.isEditEmployeeClicked
                      ? "Update Employee"
                      : "Add Employee"}
                  </CButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default addcandidates;
