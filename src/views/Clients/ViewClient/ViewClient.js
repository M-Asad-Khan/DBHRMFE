import React, { useState } from "react";
import "./viewClient.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewClientClickedAction,
  updateNewClientAction,
} from "src/redux/Clients/clients.actions";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { RiSettings2Line } from "react-icons/ri";
import { AiOutlineFundProjectionScreen, AiOutlineMail } from "react-icons/ai";
import { BsTelephoneForward, BsGlobe } from "react-icons/bs";
import { useHistory } from "react-router-dom";



const ViewClient = () => {
	let history = useHistory();

  const clientsState = useSelector((state) => state.clients);

  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(updateIsViewClientClickedAction(false));
    dispatch(updateNewClientAction({}));
  };
  return (
    <>
      <div className="container-fluid px-1 mx-auto">
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
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
                    data-holder-rendered="true"
                  />
                </div>
                <div className="text-center">
                  <h2>{clientsState.newClient.name}</h2>
                  <h6 className="mx-auto" style={{ color: "dimgrey" }}>
                    {clientsState.newClient.email}
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
                  <FiUser className="icon-design" />
                  <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                    Gender:
                  </h6>
                </div>
                <div>{clientsState.newClient.gender}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <AiOutlineFundProjectionScreen className="icon-design" />
                  <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                    Project:
                  </h6>
                </div>
                <div>{clientsState.newClient.project}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <RiSettings2Line className="icon-design" />
                  <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                    Technology:
                  </h6>
                </div>
                <div>{clientsState.newClient.technology}</div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">Contact Details</h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsGlobe className="icon-design" />
                    <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                      Country:
                    </h6>
                  </div>

                  <div>{clientsState.newClient.country}</div>
                </div>
               
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsTelephoneForward className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Phone Number:
                    </h6>
                  </div>
                  <div>{clientsState.newClient.contactNumber}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <AiOutlineMail className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Email:
                    </h6>
                  </div>
                  <div>{clientsState.newClient.email}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">Team Details</h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsGlobe className="icon-design" />
                    <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                      Country:
                    </h6>
                  </div>

                  <div onClick={ () => history.push("/teams")}>{clientsState.newClient.country}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewClient;
