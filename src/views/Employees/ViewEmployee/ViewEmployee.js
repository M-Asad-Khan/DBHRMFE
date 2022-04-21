import React, { useState } from "react";
import "./viewEmployee.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewEmpClickedAction,
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
    dispatch(updateIsViewEmpClickedAction(false));
    dispatch(updateNewEmployeeAction({}));
  };
  console.log("viewState", state);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
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
                  <h2>{state?.newEmployee?.employee?.name}</h2>
                  <h6 className="" style={{ color: "dimgrey" }}>
                    {state?.newEmployee?.employee?.email}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <h2 className="border-bottom">Personal Details</h2>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <BiTimeFive className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Age:
                  </h6>
                </div>
                <div>{state?.newEmployee?.employee?.dateOfBirth &&getAge(state?.newEmployee?.employee?.dateOfBirth?.slice(0, 10))}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <FiUser className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Gender:
                  </h6>
                </div>
                <div>{state?.newEmployee?.employee?.gender}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <FiLayers className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Salary:
                  </h6>
                </div>
                <div>{state?.newEmployee?.employee?.salary}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <MdCastForEducation className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Education:
                  </h6>
                </div>
                <div>{state?.newEmployee?.employee?.education}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <BsFillCalendarDateFill className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Date of Birth:
                  </h6>
                </div>

                <div>{state?.newEmployee?.employee?.dateOfBirth?.slice(0, 10)}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <BsCalendar2Date className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    joiningDate:
                  </h6>
                </div>
                <div>{state?.newEmployee?.employee?.joiningDate?.slice(0, 10)}</div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">Contact Details</h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsTelephoneForward className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Phone Number:
                    </h6>
                  </div>
                  <div>{state?.newEmployee?.employee?.phoneNumber}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <AiOutlineMail className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Email:
                    </h6>
                  </div>
                  <div>{state?.newEmployee?.employee?.email}</div>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaRegAddressBook className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Address:
                    </h6>
                  </div>
                  <div>{state?.newEmployee?.employee?.address}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaUserTie className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Designation:
                    </h6>
                  </div>
                  <div>{state?.newEmployee?.employee?.designation}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">History</h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsBagPlus className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Work Experience:
                    </h6>
                  </div>
                  <div>{state?.newEmployee?.employee?.workExperience}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <RiSettings2Line className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Technology:
                    </h6>
                  </div>
                  <div>{state?.newEmployee?.employee?.technology}</div>
                </div>
                <div>
                  <div className="d-flex">
                    <GrProjects className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Teams:
                    </h6>
                  </div>
                  <ul>
                    {state?.newEmployee?.workHistory?.map((item, i) => {
                      return <li key={i}>{item.team.teamName}</li>;
                    })}
                  </ul>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewEmployee;
