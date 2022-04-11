import React, { useState } from "react";
import "./viewEmployee.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewClickedAction,
  updateNewEmployeeAction,
} from "src/redux/Employees/employees.actions";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiUser, FiLayers } from "react-icons/fi";
import { MdCastForEducation } from "react-icons/md";
import {
  BsFillCalendarDateFill,
  BsCalendar2Date,
  BsTelephoneForward,
  BsBagPlus,
} from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { FaRegAddressBook, FaUserTie } from "react-icons/fa";
import { RiSettings2Line } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";

const ViewEmployee = () => {
  const state = useSelector((state) => state.employees);

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(updateIsViewClickedAction(false));
    dispatch(updateNewEmployeeAction({}));
  };

  return (
    <>
      <div>
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12">
            <div className="card">
              <div className="">
                <div className="">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleCancel}
                  >
                    <IoArrowBackSharp />
                  </button>
                </div>
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
                  <h1>{state.newEmployee.name}</h1>
                  <h5 className="" style={{ color: "dimgrey" }}>
                    {state.newEmployee.email}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <h1 className="border-bottom">Personal Details</h1>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <BiTimeFive className="icon-design" />
                  <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Age:
                  </h5>
                </div>
                <div>{state.newEmployee.age}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <FiUser className="icon-design" />
                  <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Gender:
                  </h5>
                </div>

                <div>{state.newEmployee.gender}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <FiLayers className="icon-design" />
                  <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Salary:
                  </h5>
                </div>
                <div>{state.newEmployee.salary}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <MdCastForEducation className="icon-design" />
                  <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Education:
                  </h5>
                </div>
                <div>{state.newEmployee.education}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <BsFillCalendarDateFill className="icon-design" />
                  <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Date of Birth:
                  </h5>
                </div>

                <div>{state?.newEmployee?.dateOfBirth?.slice(0, 10)}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <BsCalendar2Date className="icon-design" />

                  <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    joiningDate:
                  </h5>
                </div>
                <div>{state?.newEmployee?.joiningDate?.slice(0, 10)}</div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h1 className="border-bottom">Contact Details</h1>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsTelephoneForward className="icon-design" />
                    <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Phone Number:
                    </h5>
                  </div>
                  <div>{state.newEmployee.phoneNumber}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <AiOutlineMail className="icon-design" />
                    <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Business Email:
                    </h5>
                  </div>
                  <div>{state.newEmployee.email}</div>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaRegAddressBook className="icon-design" />
                    <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Address:
                    </h5>
                  </div>
                  <div>{state.newEmployee.address}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaUserTie className="icon-design" />
                    <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Designation:
                    </h5>
                  </div>
                  <div>{state.newEmployee.designation}</div>
                </div>

              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h1 className="border-bottom">Employee History</h1>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                  <GrProjects className="icon-design" />
                    <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Projects:
                    </h5>
                  </div>
                  {state.newEmployee.phoneNumber}
                </div>
                
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsBagPlus className="icon-design" />
                    <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Work Experience:
                    </h5>
                  </div>
                  <div>{state.newEmployee.workExperience}</div>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <RiSettings2Line className="icon-design" />
                    <h5 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Technology:
                    </h5>
                  </div>
                  <div>{state.newEmployee.technology}</div>
                </div>
                {" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewEmployee;
