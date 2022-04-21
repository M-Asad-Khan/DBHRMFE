import React from "react";
import "./jobPosting.css";

const jobPosting = () => {
  return (
    <div>
      <div class="container-fluid px-1 py-5 mx-auto">
        <div class="row d-flex justify-content-center">
        
            
            <div class="card">
              
                <div class="row justify-content-between text-left">
                  <div class="form-group col-sm-6 flex-column d-flex">
                    <label class="form-control-label">
                    Job Title <span class="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="jobtitle"
                      name="jobtitle"
                      placeholder="Enter job title"
                     
                    />{" "}
                  </div>
                  <div class="form-group col-sm-6 flex-column d-flex">
                    <label class="form-control-label px-3">
                      Deparrtment<span class="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      placeholder="Enter Department"
                      onblur="validate(2)"
                    />{" "}
                  </div>
                </div>
                <div class="row justify-content-between text-left">
                  <div class="form-group col-sm-6 flex-column d-flex">
                    <label class="form-control-label">
                      Reports to<span class="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="report"
                      name="report"
                      placeholder=""
                      onblur="validate(3)"
                    />{" "}
                  </div>
                  <div class="form-group col-sm-6 flex-column d-flex">
                    <label class="form-control-label">
                      Effective Date<span class="text-danger"> *</span>
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
                      Qualification<span class="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="qualification"
                      name="qualification"
                      placeholder=""
                      onblur="validate(5)"
                    />{" "}
                  </div>
                  <div class="form-group col-sm-6 flex-column d-flex">
                    <label class="form-control-label ">
                      Work Experience<span class="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="workExperience"
                      name="workExperience"
                      placeholder=""
                      onblur="validate(2)"
                    />{" "}
                  </div>
                </div>
                <div class="row justify-content-between text-left">
                  <div class="form-group col-sm-6 flex-column d-flex">
                    <label class="form-control-label ">
                    Vacant Positions<span class="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="vacantPosition"
                      name="vacantPosition"
                      placeholder=""
                      onblur="validate(5)"
                    />{" "}
                  </div>
                  </div>
                
                <div class="row justify-content-between text-left">
                  <div class="form-group col-12 flex-column d-flex">
                    <label class="form-control-label">
                      Job Description
                      <span class="text-danger"> *</span>
                    </label>
                    <textarea
                              id="description"
                              name="description"
                              placeholder="Write your description here."
                              rows="4"
                              required="required"
                              
                            ></textarea>{" "}
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

export default jobPosting;
