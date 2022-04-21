import React from "react";
import "./interviewFeedback.css";

const interviewFeedback = () => {
  return (
    <div>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="card">
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label">
                  Interviewer <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  id="interviewer"
                  name="interviewer"
                  placeholder=""
                />{" "}
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
                />{" "}
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
                />{" "}
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
                />{" "}
              </div>
            </div>
            

           
        <div className="d-flex justify-content-between align-items-center">
            <div className="ratings"> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star"></i> </div>
            <h6 className="review-count">12 Reviews</h6>
        </div>
        <div className="mt-5 d-flex justify-content-between align-items-center">
            <h6 className="review-stat">Educational Background</h6>
            <div className="small-ratings"> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </div>
        </div>
        <div className="mt-1 d-flex justify-content-between align-items-center">
            <h6 className="review-stat">Work Experience</h6>
            <div className="small-ratings"> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star"></i> </div>
        </div>
        <div className="mt-1 d-flex justify-content-between align-items-center">
            <h6 className="review-stat">Qualification</h6>
            <div className="small-ratings"> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </div>
        </div>
        <div className="mt-1 d-flex justify-content-between align-items-center">
            <h6 className="review-stat">Verbal Communication</h6>
            <div className="small-ratings"> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> </div>
        </div>
        <div className="mt-1 d-flex justify-content-between align-items-center">
            <h6 className="review-stat">Candidate Interest</h6>
            <div className="small-ratings"> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </div>
        </div>
        <div className="mt-1 d-flex justify-content-between align-items-center">
            <h6 className="review-stat">Overall Impression and Recommendation</h6>
            <div className="small-ratings"> <i className="fa fa-star rating-color"></i> <i className="fa fa-star rating-color"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </div>
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

export default interviewFeedback;
