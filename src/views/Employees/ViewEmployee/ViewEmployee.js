import React, { useState } from "react";
import "./viewEmployee.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewClickedAction,
  updateNewEmployeeAction,
} from "src/redux/Employees/employees.actions"
import { IoArrowBackSharp } from "react-icons/io5";
import { FiUser, FiLayers } from "react-icons/fi";
import { MdCastForEducation  } from "react-icons/md";
import { BsFillCalendarDateFill, BsCalendar2Date ,BsTelephoneForward, BsBagPlus} from "react-icons/bs";
import {BiTimeFive } from "react-icons/bi";
import { FaRegAddressBook,FaUserTie } from "react-icons/fa";
import { RiSettings2Line} from "react-icons/ri";


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
  const handleCancel = () => {
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
      <div >
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
               <div className="card" style={{height: "338px"}}>
               
                <h1 className="border-bottom">Personal Details</h1>
                <div className="d-flex">
              
                <BiTimeFive className="icon-design"/>
                <h5 className="" style={{ color: "dimgrey" }}>
               	Age:{state.newEmployee.age}
                </h5>
                </div>
                <div className="d-flex">
                <FiUser className="icon-design"/>
                <h5 className="" style={{ color: "dimgrey" }}>
								gender:{state.newEmployee.gender}
                </h5>
                </div>
                <div className="d-flex">
                <FiLayers className="icon-design"/>
                <h5 className="" style={{ color: "dimgrey" }}>
								Salary:{state.newEmployee.salary}
                </h5>
                </div>
                <div className="d-flex">
                <MdCastForEducation className="icon-design"/>
                <h5 className="" style={{ color: "dimgrey" }}>
								Education:{state.newEmployee.education}
                </h5>
                </div>
                <div className="d-flex">
                <BsFillCalendarDateFill className="icon-design"/>
                <h5 className="" style={{ color: "dimgrey" }}>
								Date of Birth:{state.newEmployee.dateOfBirth}
                </h5>
                </div>
                <div className="d-flex">
                    {/* <div className="icon-design"> */}
                <BsCalendar2Date className="icon-design"/>
                
                <h5 className="" style={{ color: "dimgrey" }}>
								joiningDate:{state.newEmployee.joiningDate}
                </h5>
                </div>

            
              </div>
              </div>
              
              <div className="col-sm-4">
                <div className="card" style={{height: "338px"}}>
                <div className="row d-flex justify-content-center">

                <h1 className="border-bottom">Contact Details</h1>
                <div className="d-flex">
                <BsTelephoneForward className="icon-design"/>
                <h5 className="" style={{ color: "dimgrey" }}>
								Phone Number:{state.newEmployee.phoneNumber}
                </h5>
                </div>
                <div className="d-flex">
                    <FaRegAddressBook className="icon-design"/>
                <h5 className="" style={{ color: "dimgrey" }}>
								Address:{state.newEmployee.address}
                </h5>
                </div>
                <div className="d-flex">
                    <FaUserTie className="icon-design"/>
                 <h5 className="" style={{ color: "dimgrey" }}>
                    Designation:{state.newEmployee.designation}
                    </h5>
                    </div>
                  <div className="d-flex">
                      <BsBagPlus className="icon-design"/>
                  <h5 className="" style={{ color: "dimgrey" }}>
                    Work Experience:{state.newEmployee.workExperience}
                  </h5>
                  </div>
                  <div className="d-flex">
                      <RiSettings2Line className="icon-design"/>
                  <h5 className="" style={{ color: "dimgrey" }}>
                    Technology:{state.newEmployee.technology}
                  </h5>
                  </div>
                
              </div>
              </div>
              </div>

               <div className="col-sm-4">
                <div className="card" style={{height: "338px"}}>
                <div className="row d-flex justify-content-center">

                <h1 className="border-bottom">Employee History</h1>
                <div className="d-flex">
               
                <h5 className="" style={{ color: "dimgrey" }}>
								Phone Number:{state.newEmployee.phoneNumber}
                </h5>
                </div>
                <h5 className="" style={{ color: "dimgrey" }}>
								Address:{state.newEmployee.address}
                </h5>
                <h5 className="" style={{ color: "dimgrey" }}>
								Email:{state.newEmployee.email}
                </h5> </div></div>
              </div>
            </div>
          </div>
      
    </>
  );
};
export default ViewEmployee;
