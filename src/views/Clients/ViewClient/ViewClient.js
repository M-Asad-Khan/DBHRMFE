import React, { useState } from "react";
import "./viewClient.css";

const ViewClient = () => {
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
  return (
    <>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="card">
            <div className="d-flex">
              <div className="form-card mx-auto">
                <img
                  className="rounded-circle"
                  alt="100x100"
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                  data-holder-rendered="true"
                />

                <h1>Name:{client.name}</h1>
                <h5 className="" style={{ color: "dimgrey" }}>
                  email:{client.email}
                </h5>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-6" >
								<h1>Personal Details</h1>
								<h5 className="" style={{ color: "dimgrey" }}>
                  email:{client.email}
                </h5>
							</div>
							<div className="col-lg-6">
								<h1>Contact Details</h1>
								<h5 className="" style={{ color: "dimgrey" }}>
                  email:{client.email}
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
