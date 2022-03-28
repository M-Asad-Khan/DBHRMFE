import React, { useState } from "react";
import "./addteams.css";
import Select from "react-select";
import Teams from "..";

const Addteams = ({ setState, state, isNewTeam, setIsNewTeam, setTeams }) => {
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  const handleCancle = () => {
    setState({});
    setIsNewTeam(false);
  };
  const handleAddTeam = () => {
    setTeams((oldArray) => [...oldArray, state]);
    setIsNewTeam(false);
  };
  const options = [
    { value: "andy", label: "Andy" },
    { value: "Aysha", label: "Aysha" },
    { value: "Amna", label: "Amna" },
    { value: "Nancy", label: "Nancy" },
    { value: "El", label: "Eleven" },
    { value: "cadillac", label: "Cadillac" },
  ];
  const team = [
    { value: "Ali", label: "1" },
    { value: "Amir", label: "2" },
    { value: "Hussain", label: "3" },
  ];
  const employee = [
    { value: "Asad", label: "1" },
    { value: "Mubashir", label: "2" },
    { value: "Wajeeha", label: "3" },
  ];

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="card">
          <div className="form-card" onsubmit="event.preventDefault()">
            <div className="row justify-content-between text-left">
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  {" "}
                  <label className="form-control-label px-3">
                    Team Name<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    onChange={handleChange}
                    type="text"
                    id="teamName"
                    name="teamName"
                    placeholder=""
                    onblur="validate(10)"
                  />{" "}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  {" "}
                  <div className="form-group">
                    {" "}
                    <label for="form_need">Client ID *</label>
                    <Select
                      className="selectpicker"
                      data-style="btn-inverse"
                      style="display: none;"
                    >
                      options={options}
                    </Select>
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="form-group">
                      {" "}
                      <label for="form_need">ProjectManager ID *</label>
                      <Select
                        className="selectpicker"
                        data-style="btn-inverse"
                        style="display: none;"
                      >
                        options={options}
                      </Select>
                    </div>
                  </div>

                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="form-group">
                      {" "}
                      <label for="form_need">Team ID *</label>
                      <Select
                        className="selectpicker"
                        data-style="btn-inverse"
                        style="display: none;"
                      >
                        teams={team}
                      </Select>
                    </div>
                  </div>
                  <div className="row justify-content-between text-left">
                    <div className="form-group col-sm-6 flex-column d-flex">
                      {" "}
                      <div className="form-group">
                        {" "}
                        <label for="form_need">EmployeeID *</label>
                        <Select
                          className="selectpicker"
                          data-style="btn-inverse"
                          style="display: none;"
                        >
                          employee={employee}
                        </Select>
                      </div>
                    </div>
                    <div className="form-group col-sm-6 flex-column d-flex">
                      {" "}
                      <label className="form-control-label px-3">
                        Enter Start Date<span className="text-danger"> *</span>
                      </label>{" "}
                      <input
                        onChange={handleChange}
                        type="date"
                        id="edate"
                        name="edate"
                        placeholder=""
                        onblur="validate(4)"
                      />{" "}
                    </div>
                  </div>
                  <div className="row justify-content-between text-left">
                    <div className="form-group col-sm-6 ">
                      <button
                        className="btn-block btn-primary"
                        onClick={handleCancle}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="form-group col-sm-6 ">
                      <button
                        className="btn-block btn-primary"
                        onClick={handleAddTeam}
                      >
                        Add Employee
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addteams;
