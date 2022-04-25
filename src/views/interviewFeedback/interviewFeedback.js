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
                      
                      <label className="option">1<input type="radio" name="radio" value="1" /> </label>
                      <label className="option">2<input type="radio" name="radio" value="2"/> <span className="checkmark"/></label>
                      <label className="option">3<input type="radio" name="radio" value="3" /> <span className="checkmark"/></label>
                      <label className="option">4<input type="radio" name="radio" value="4" /> <span className="checkmark"/></label>
                      <label className="option">5<input type="radio" name="radio" value="5"/> <span className="checkmark"/></label>
                  </td>

                  <td> <div><input type="string"/></div> </td>
                
                </tr>

                <tr>
                  <td scope="row">Prior Work Experience</td>
                  <td>
                      
                  <label className="option">1<input type="radio" name="radio" value="1" /> </label>
                      <label className="option">2<input type="radio" name="radio" value="2"/> <span className="checkmark"/></label>
                      <label className="option">3<input type="radio" name="radio" value="3" /> <span className="checkmark"/></label>
                      <label className="option">4<input type="radio" name="radio" value="4" /> <span className="checkmark"/></label>
                      <label className="option">5<input type="radio" name="radio" value="5"/> <span className="checkmark"/></label>
                  </td>

                  <td> <div><input type="string"/></div> </td>
                
                </tr>
                <tr>
                  <td scope="row">Qualification</td>
                  <td>
                      
                  <label className="option">1<input type="radio" name="radio" value="1" /> </label>
                      <label className="option">2<input type="radio" name="radio" value="2"/> <span className="checkmark"/></label>
                      <label className="option">3<input type="radio" name="radio" value="3" /> <span className="checkmark"/></label>
                      <label className="option">4<input type="radio" name="radio" value="4" /> <span className="checkmark"/></label>
                      <label className="option">5<input type="radio" name="radio" value="5"/> <span className="checkmark"/></label>
                  </td>

                  <td> <div><input type="string"/></div> </td>
                
                </tr>

                <tr>
                  <td scope="row">Verbal Communication</td>
                  <td>
                      
                  <label className="option">1<input type="radio" name="radio" value="1" /> </label>
                      <label className="option">2<input type="radio" name="radio" value="2"/> <span className="checkmark"/></label>
                      <label className="option">3<input type="radio" name="radio" value="3" /> <span className="checkmark"/></label>
                      <label className="option">4<input type="radio" name="radio" value="4" /> <span className="checkmark"/></label>
                      <label className="option">5<input type="radio" name="radio" value="5"/> <span className="checkmark"/></label>
                  </td>

                  <td> <div><input type="string"/></div> </td>
                
                </tr>
                 
                <tr>
                  <td scope="row">Candidate Interest</td>
                  <td>
                      
                  <label className="option">1<input type="radio" name="radio" value="1" /> </label>
                      <label className="option">2<input type="radio" name="radio" value="2"/> <span className="checkmark"/></label>
                      <label className="option">3<input type="radio" name="radio" value="3" /> <span className="checkmark"/></label>
                      <label className="option">4<input type="radio" name="radio" value="4" /> <span className="checkmark"/></label>
                      <label className="option">5<input type="radio" name="radio" value="5"/> <span className="checkmark"/></label>
                  </td>

                  <td> <div><input type="string"/></div> </td>
                
                </tr>

                <tr>
                  <td scope="row">Knowledge of Organisation</td>
                  <td>
                      
                  <label className="option">1<input type="radio" name="radio" value="1" /> </label>
                      <label className="option">2<input type="radio" name="radio" value="2"/> <span className="checkmark"/></label>
                      <label className="option">3<input type="radio" name="radio" value="3" /> <span className="checkmark"/></label>
                      <label className="option">4<input type="radio" name="radio" value="4" /> <span className="checkmark"/></label>
                      <label className="option">5<input type="radio" name="radio" value="5"/> <span className="checkmark"/></label>
                  </td>

                  <td> <div><input type="string"/></div> </td>
                
                </tr>

                <tr>
                  <td scope="row">Team Building skills</td>
                  <td>
                      
                  <label className="option">1<input type="radio" name="radio" value="1" /> </label>
                      <label className="option">2<input type="radio" name="radio" value="2"/> <span className="checkmark"/></label>
                      <label className="option">3<input type="radio" name="radio" value="3" /> <span className="checkmark"/></label>
                      <label className="option">4<input type="radio" name="radio" value="4" /> <span className="checkmark"/></label>
                      <label className="option">5<input type="radio" name="radio" value="5"/> <span className="checkmark"/></label>
                  </td>

                  <td> <div><input type="string"/></div> </td>
                
                </tr>
                <tr>
                  <td scope="row">Initiative</td>
                  <td>
                      
                  <label className="option">1<input type="radio" name="radio" value="1" /> </label>
                      <label className="option">2<input type="radio" name="radio" value="2"/> <span className="checkmark"/></label>
                      <label className="option">3<input type="radio" name="radio" value="3" /> <span className="checkmark"/></label>
                      <label className="option">4<input type="radio" name="radio" value="4" /> <span className="checkmark"/></label>
                      <label className="option">5<input type="radio" name="radio" value="5"/> <span className="checkmark"/></label>
                  </td>

                  <td> <div><input type="string"/></div> </td>
                
                </tr>
                <tr>
                  <td scope="row">Time Management</td>
                  <td>
                      
                  <label className="option">1<input type="radio" name="radio" value="1" /> </label>
                      <label className="option">2<input type="radio" name="radio" value="2"/> <span className="checkmark"/></label>
                      <label className="option">3<input type="radio" name="radio" value="3" /> <span className="checkmark"/></label>
                      <label className="option">4<input type="radio" name="radio" value="4" /> <span className="checkmark"/></label>
                      <label className="option">5<input type="radio" name="radio" value="5"/> <span className="checkmark"/></label>
                  </td>

                  <td> <div><input type="string"/></div> </td>
                
                </tr>
                <tr>
                  <td scope="row">Overall Impression and Recommendations</td>
                  <td>
                      
                  <label className="option">1<input type="radio" name="radio" value="1" /> </label>
                      <label className="option">2<input type="radio" name="radio" value="2"/> <span className="checkmark"/></label>
                      <label className="option">3<input type="radio" name="radio" value="3" /> <span className="checkmark"/></label>
                      <label className="option">4<input type="radio" name="radio" value="4" /> <span className="checkmark"/></label>
                      <label className="option">5<input type="radio" name="radio" value="5"/> <span className="checkmark"/></label>
                  </td>

                  <td> <div><input type="string"/></div> </td>
                
                </tr>











              </tbody>
            </table>

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
