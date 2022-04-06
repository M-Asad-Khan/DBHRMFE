import React, { useState } from "react";
import "./viewEmployee.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewClickedAction,
  updateNewEmployeeAction,
} from "src/redux/Employees/employees.actions"
import { IoArrowBackSharp } from "react-icons/io5";

const ViewEmployee = () => {
  const state = useSelector((state) => state.employees);

  const dispatch = useDispatch();

  const employee = {
    contactNumber: "123123123",
    country: "usa",
    createdAt: "2022-04-01T06:34:56.385Z",
    email: "client1@loki.com",
    gender: "male",
    id: "aa1c8701-f0b5-435f-87c7-4c09837f1d1c",
    name: "client 1",
    project: "Dbhrm",
    technology: "react",
    updatedAt: "2022-04-01T06:34:56..385Z",
  };
  const handleCancle = () => {
    dispatch(updateIsViewClickedAction(false));
    dispatch(updateNewEmployeeAction({}));
  };
  // 	contactNumber: "123123123"
  // country: "usa"
  // createdAt: "2022-04-01T06:34:56.385Z"
  // email: "client1@loki.com"
  // gender: "male"
  // id: "aa1c8701-f0b5-435f-87c7-4c09837f1d1c"
  // name: "client 1"
  // project: "Dbhrm"
  // technology: "react" IoChevronBackCircleOutline
  return (
    <>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="card">
            <div className="">
              <div className="">
                <button
                  className="btn btn-outline-primary"
                  onClick={handleCancle}
                >
                  <IoArrowBackSharp />
                </button>
              </div>
              <div className="form-card">
                <div className="d-flex">
                  <img
                    className="rounded-circle mx-auto"
                    alt="100x100"
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                    data-holder-rendered="true"
                  />
                </div>
                <div className="text-center">
                  <h1>Name:{state.newEmployee.name}</h1>
                  <h5 className="mx-auto" style={{ color: "dimgrey" }}>
                    Designation:{state.newEmployee.designation}
                  </h5>
                  <h5 className="mx-auto" style={{ color: "dimgrey" }}>
                    Work Experience:{state.newEmployee.workExperience}
                  </h5>
                  <h5 className="mx-auto" style={{ color: "dimgrey" }}>
                    Technology:{state.newEmployee.technology}
                  </h5>
                </div>
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <div className="col-lg-6 border-left">
                <h1>Personal Details</h1>
                <h5 className="" style={{ color: "dimgrey" }}>
								Age:{state.newEmployee.age}
                </h5>
                <h5 className="" style={{ color: "dimgrey" }}>
								gender:{state.newEmployee.gender}
                </h5>
                <h5 className="" style={{ color: "dimgrey" }}>
								Salary:{state.newEmployee.salary}
                </h5>
                <h5 className="" style={{ color: "dimgrey" }}>
								Education:{state.newEmployee.education}
                </h5>
                <h5 className="" style={{ color: "dimgrey" }}>
								Date of Birth:{state.newEmployee.dateOfBirth}
                </h5>
                <h5 className="" style={{ color: "dimgrey" }}>
								joiningDate:{state.newEmployee.joiningDate}
                </h5>
              </div>
              <div className="col-lg-6 border-left">
                <h1>Contact Details</h1>
                <h5 className="" style={{ color: "dimgrey" }}>
								Phone Number:{state.newEmployee.phoneNumber}
                </h5>
                <h5 className="" style={{ color: "dimgrey" }}>
								Address:{state.newEmployee.address}
                </h5>
                <h5 className="" style={{ color: "dimgrey" }}>
								Email:{state.newEmployee.email}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewEmployee;
