import React, { useState } from "react";
import "./viewClient.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewClickedAction,
  updateNewClientAction,
} from "src/redux/Clients/clients.actions";
import { IoArrowBackSharp } from "react-icons/io5";

const ViewClient = () => {
  const clientsState = useSelector((state) => state.clients);

  const dispatch = useDispatch();

  const client = {
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
    dispatch(updateNewClientAction({}));
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
                  onClick={handleCancel}
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
                  <h1>Name:{clientsState.newClient.name}</h1>
                  <h5 className="mx-auto" style={{ color: "dimgrey" }}>
                    email:{clientsState.newClient.email}
                  </h5>
                  <h5 className="mx-auto" style={{ color: "dimgrey" }}>
                    project:{clientsState.newClient.project}
                  </h5>
                  <h5 className="mx-auto" style={{ color: "dimgrey" }}>
                    technology:{clientsState.newClient.technology}
                  </h5>
                </div>
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <div className="col-lg-6 border-left">
                <h1>Personal Details</h1>
                <h5 className="" style={{ color: "dimgrey" }}>
								gender:{clientsState.newClient.gender}
                </h5>
              </div>
              <div className="col-lg-6 border-left">
                <h1>Contact Details</h1>
                <h5 className="" style={{ color: "dimgrey" }}>
								country:{clientsState.newClient.country}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewClient;
