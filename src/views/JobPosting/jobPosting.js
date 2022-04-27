import React from "react";
import "./jobPosting.css";

const jobPosting = () => {
  return (
    <div>
      <div className="container-fluid px-1 py-5 mx-auto">

        <div className="row d-flex justify-content-center">

        
            
            <div className="card">

              
                <div className="row justify-content-between text-left">

                  <div className="form-group col-sm-6 flex-column d-flex">

                    <label className="form-control-label">

                    Job Title <span className="text-danger"> *</span>

                    </label>
                    <input
                      type="text"
                      id="jobtitle"
                      name="jobtitle"
                      placeholder="Enter job title"
                     
                    />{" "}
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">

                    <label className="form-control-label px-3">

                      Department<span className="text-danger"> *</span>
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
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label">
                      Reports to<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="report"
                      name="report"
                      placeholder=""
                      onblur="validate(3)"
                    />{" "}
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label">
                      Effective Date<span className="text-danger"> *</span>
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
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label">
                      Qualification<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="qualification"
                      name="qualification"
                      placeholder=""
                      onblur="validate(5)"
                    />{" "}
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label ">
                      Work Experience<span className="text-danger"> *</span>
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
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label ">
                    Vacant Positions<span className="text-danger"> *</span>
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
                
                <div className="row justify-content-between text-left">
                  <div className="form-group col-12 flex-column d-flex">
                    <label className="form-control-label">
                      Job Description
                      <span className="text-danger"> *</span>
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
                <div className="row justify-content-end">
                  <div className="form-group col-sm-6">
                    {" "}
                    <button type="submit" className="btn-block btn-primary">
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
