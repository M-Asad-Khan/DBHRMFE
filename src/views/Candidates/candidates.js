import React from "react";
import Select from "react-select";
const candidates = () => {
  const candStatusOptions = [
    { value: "Scheduled", label: "Scheduled Interview", field: "status" },
    { value: "Offered", label: "Offered", field: "status" },
    { value: "Hired", label: "Hired", field: "status" },
    { value: "Rejected", label: "Rejected", field: "status" },
    { value: "NotAppeared", label: "Not Appeared", field: "status" },
  ];
  return (
    <div>
      <div class="container-fluid px-1 py-5 mx-auto">
        <div class="row d-flex justify-content-center">
          <div class="card">
            <form class="form-card" onsubmit="event.preventDefault()">
              <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3">
                    First name<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Enter your first name"
                    onblur="validate(1)"
                  />{" "}
                </div>
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3">
                    Last name<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Enter your last name"
                    onblur="validate(2)"
                  />{" "}
                </div>
              </div>
              <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3">
                    Email<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder=""
                    onblur="validate(3)"
                  />{" "}
                </div>
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3">
                    Phone number<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="mob"
                    name="mob"
                    placeholder=""
                    onblur="validate(4)"
                  />{" "}
                </div>
              </div>
              <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3">
                    Gender<span class="text-danger"> *</span>
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
                  </label>{" "}
                  <Select
                    /* value={} */
                   
                    id="status"
                    name="status"
                    options={candStatusOptions}
                  ></Select>{" "}
                </div>
              </div>
              <div class="row justify-content-between text-left">
                <div class="form-group col-6 flex-column d-flex">
                  <label class="form-control-label px-3">
                    Post Applied for?
                    <span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder=""
                    onblur="validate(6)"
                  />{" "}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Applied Date<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    type="date"
                    id="permanentDate"
                    name="permanentDate"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default candidates;
