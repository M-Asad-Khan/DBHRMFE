import React, { useState } from "react";
import "./viewTeam.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewClickedAction,
  updateNewTeamAction,
} from "src/redux/Teams/teams.actions";
import { IoArrowBackSharp } from "react-icons/io5";

const ViewTeam = () => {
  const teamsState = useSelector((state) => state.teams);

  const dispatch = useDispatch();

 
  const handleCancel = () => {
    dispatch(updateIsViewClickedAction(false));
    dispatch(updateNewTeamAction({}));
  };
  console.log(teamsState)
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
                  <h1>Team Name:{teamsState.newTeam.name}</h1>
                 
                </div>
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <div className="col-lg-6 border-left">
                <h1>Team Members</h1>
                <h5 className="" style={{ color: "dimgrey" }}>
								Team Members:{teamsState.newTeam.Member}
                </h5>
              </div>
              <div className="col-lg-6 border-left">
                <h1>Team Details</h1>
                <h5 className="" style={{ color: "dimgrey" }}>
								Project Manager:{teamsState.newTeam.projectManager}
                </h5>
                <h5 className="" style={{ color: "dimgrey" }}>
								Team Lead:{teamsState.newTeam.teamLead}
                </h5>
                <h5 className="" style={{ color: "dimgrey" }}>
								Start Date:{teamsState.newTeam.startDate}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewTeam;
