import React, { useState } from "react";
import "./viewClient.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewClickedAction,
  updateNewClientAction,
} from "src/redux/Clients/clients.actions";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { RiSettings2Line } from "react-icons/ri";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";

const ViewClient = () => {
  const clientsState = useSelector((state) => state.clients);

  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(updateIsViewClickedAction(false));
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
                  <h1>{clientsState.newClient.name}</h1>
                  <h5 className="mx-auto" style={{ color: "dimgrey" }}>
                    {clientsState.newClient.email}
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
                  <FiUser className="icon-design" />
                  <h5 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                    gender:
                  </h5>
                </div>
                <div>{clientsState.newClient.gender}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <AiOutlineFundProjectionScreen className="icon-design" />
                  <h5 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                    project:
                  </h5>
                </div>
                <div>{clientsState.newClient.project}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <RiSettings2Line className="icon-design" />
                  <h5 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                    technology:
                  </h5>
                </div>
                <div>{clientsState.newClient.technology}</div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h1 className="border-bottom">Contact Details</h1>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsGlobe className="icon-design" />
                    <h5 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                      country:
                    </h5>
                  </div>

                  <div>{clientsState.newClient.country}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h1 className="border-bottom">Team Details</h1>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsGlobe className="icon-design" />
                    <h5 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                      country:
                    </h5>
                  </div>

                  <div>{clientsState.newClient.country}</div>
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
