import React from "react";
import "./interviewFeedback.css";

const interviewFeedback = () => {
  return (
    <div>
      <div class="container-fluid px-1 py-5 mx-auto">
        <div class="row d-flex justify-content-center">
          <div class="card">
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label">
                  Interviewer <span class="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  id="interviewer"
                  name="interviewer"
                  placeholder=""
                />{" "}
              </div>
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label">
                  Date of Interview<span class="text-danger"> *</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder=""
                  onblur="validate(4)"
                />{" "}
              </div>
            </div>
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label">
                  Candidate Name<span class="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder=""
                  onblur="validate(3)"
                />{" "}
              </div>
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3">
                  Position<span class="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Enter position"
                  onblur="validate(2)"
                />{" "}
              </div>
            </div>
            
 

            <div class="row justify-content-end">
              <div class="form-group col-sm-6">
                {" "}
                <button type="submit" class="btn-block btn-primary">
                  submit
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default interviewFeedback;
