import React, { useState, useEffect  } from "react";
import {
  updateNewFeedbackAction,
  updateFeedbacksAction,
  updateIsAddFeedbackClickedAction,
  updateIsEditFeedbackClickedAction,
} from "../../../redux/interviewFeedback/interviewFeedback.actions";
import { useSelector, useDispatch } from "react-redux";
import { employeeRequests } from "../../../API/EmployeeApi";
import { IoArrowBackSharp } from "react-icons/io5";
import { CButton } from "@coreui/react";
import Select from "react-select";
import {  toast } from "react-toastify";
import { interviewFeedbackRequests } from "src/API/interviewFeedbackApi";

import RatingAtom from "./rating";

const interviewFeedback = () => {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const hrState = useSelector((state) => state.interviewFeedback);
  useEffect(() => {
    handleGetEmployeesApi();
  }, []);
  const handleGetEmployeesApi = async () => {
    try {
      const res = await employeeRequests.getEmployeesApi();
      debugger;
      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
          return { ...x, value: x.name, label: x.name };
        });
        console.log("tempArr", tempArr);
        setEmployees(tempArr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(evt) {
    debugger;
    const value = evt.target ? evt.target.value : evt.value;
    const name = evt.target ? evt.target.name : evt.field;
    dispatch(
      updateNewFeedbackAction({
        ...hrState.newFeedback,
        name: value,
      })
    );
  }
  const handleCancel = () => {
    dispatch(updateNewFeedbackAction({}));
    dispatch(updateIsAddFeedbackClickedAction(false));
    dispatch(updateIsEditFeedbackClickedAction(false));
  };
  const addAndUpdateFeedback = async () => {
    if (!doValidation()) {
      if (hrState.isEditFeedbackClicked === true) {
        try {
          debugger;
          const res = await interviewFeedbackRequests.updateFeedbackApi(hrState.newFeedback);
          console.log("updateFeedback Response", res);

          debugger;
          if (res.error === false) {
            debugger;
            toast.success("Feedback Updated");
            let temp = hrState.interviewFeedback.filter(
              (item) => item.id != res.data.id
            );
            dispatch(updateFeedbacksAction([...temp, res.data]));
            dispatch(updateIsAddFeedbackClickedAction(false));
            dispatch(updateIsEditFeedbackClickedAction(false));
          }
        } catch (e) {
          toast.error("error");

          debugger;
        }
      } else {
        try {
          debugger;
          const res = await interviewFeedbackRequests.addFeedbackApi(hrState.newFeedback);
          console.log("addFeedbackApi Response", res);

          debugger;
          if (res.error === false) {
            debugger;
            toast.success("Feedback Added");

            dispatch(updateFeedbacksAction([...hrState.interviewFeedback, res.data]));
            dispatch(updateIsAddFeedbackClickedAction(false));
          }
        } catch (e) {
          toast.error("error");

          debugger;
        }
      }
    } else {
      console.log("validation failed");
      toast.error("validation failed");
      debugger;
    }
  };
  const [rating, setRating] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    8: 0,
    9: 0,
    10: 0,
  }); // initial rating value

  // Catch Rating value
  const handleRating = (rate, question) => {
    setRating((prevState) => ({
      ...prevState,
      [question]: rate,
    }));
    // Some logic
  };
  return (
    <div>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="card">
          <div className="form-card">
              <button
                className="btn btn-outline-primary mb-3"
                onClick={handleCancel}
              >
                <IoArrowBackSharp />
              </button>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label">
                  Interviewer <span className="text-danger"> *</span>
                </label>
                <Select
                 
                    type="text"
                    id="interviewer"
                    name="interviewer"
                    
                    
                    options={employees}
                    onChange={handleChange}
                  ></Select>{" "}
                  
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label">
                  Date of Interview<span className="text-danger"> *</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder=""
                  onblur="validate(4)"
                />
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label">
                  Candidate Name<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder=""
                  onblur="validate(3)"
                />
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">
                  Position<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Enter position"
                  onblur="validate(2)"
                />
              </div>
            </div>
            <p>
              <strong>
                Overall how would you rate this individual's performance based
                on your expectations for the role?
              </strong>
            </p>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Job Interview Criteria</th>
                  <th scope="col">Ranking</th>
                  <th scope="col">Comments</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">Educational Background</td>
                  <td>
                    <RatingAtom
                      handleRating={(rate) => handleRating(rate, "1")}
                      rating={rating["1"]}
                    />
                  </td>

                  <td>
                    <div>
                      <input type="string" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td scope="row">Prior Work Experience</td>
                  <td>
                    <RatingAtom
                      handleRating={(rate) => handleRating(rate, "2")}
                      rating={rating["2"]}
                    />
                  </td>

                  <td>
                    <div>
                      <input type="string" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td scope="row">Qualification</td>
                  <td>
                    <RatingAtom
                      handleRating={(rate) =>
                        handleRating(rate, "Educational Background")
                      }
                      rating={rating["3"]}
                    />
                  </td>

                  <td>
                    <div>
                      <input type="string" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td scope="row">Verbal Communication</td>
                  <td>
                    <RatingAtom
                      handleRating={(rate) =>
                        handleRating(rate, "Educational Background")
                      }
                      rating={rating["4"]}
                    />
                  </td>

                  <td>
                    <div>
                      <input type="string" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td scope="row">Candidate Interest</td>
                  <td>
                    <RatingAtom
                      handleRating={(rate) =>
                        handleRating(rate, "Educational Background")
                      }
                      rating={rating["5"]}
                    />
                  </td>

                  <td>
                    <div>
                      <input type="string" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td scope="row">Knowledge of Organisation</td>
                  <td>
                    <RatingAtom
                      handleRating={(rate) =>
                        handleRating(rate, "Educational Background")
                      }
                      rating={rating["6"]}
                    />
                  </td>

                  <td>
                    <div>
                      <input type="string" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td scope="row">Team Building skills</td>
                  <td>
                    <RatingAtom
                      handleRating={(rate) =>
                        handleRating(rate, "Educational Background")
                      }
                      rating={rating["7"]}
                    />
                  </td>

                  <td>
                    <div>
                      <input type="string" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td scope="row">Initiative</td>
                  <td>
                    <RatingAtom
                      handleRating={(rate) =>
                        handleRating(rate, "Educational Background")
                      }
                      rating={rating["8"]}
                    />
                  </td>

                  <td>
                    <div>
                      <input type="string" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td scope="row">Time Management</td>
                  <td>
                    <RatingAtom
                      handleRating={(rate) =>
                        handleRating(rate, "Educational Background")
                      }
                      rating={rating["9"]}
                    />
                  </td>

                  <td>
                    <div>
                      <input type="string" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td scope="row">Overall Impression and Recommendations</td>
                  <td>
                    <RatingAtom
                      handleRating={(rate) =>
                        handleRating(rate, "Educational Background")
                      }
                      rating={rating["10"]}
                    />
                  </td>

                  <td>
                    <div>
                      <input type="string" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="row justify-content-end">
            <div className="form-group col-sm-6 ">
                  <button
                    className="btn-block btn-primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>

              <div className="form-group col-sm-6">
              <CButton
                  type="submit"
                  className="btn-block btn-primary"
                  onClick={() => {
                    addAndUpdateClient()
                    alert(JSON.stringify(rating));
                  }}
                >
                  {hrState.isEditFeedbackClicked
                      ? "Update Feedback"
                      : "Add Feedback"}
                  
                </CButton>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default interviewFeedback;
