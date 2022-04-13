import React, { useState } from "react";
import "./viewTeam.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewTeamClickedAction,
  updateNewTeamAction,
} from "src/redux/Teams/teams.actions";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { RiTeamLine } from "react-icons/ri";
import { BsCalendar2Date } from "react-icons/bs";
const ViewTeam = () => {
  const teamsState = useSelector((state) => state.teams);

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(updateIsViewTeamClickedAction(false));
    dispatch(updateNewTeamAction({}));
  };
  console.log(teamsState);
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
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                    data-holder-rendered="true"
                  />
                </div>
                <div className="text-center">
                  <h2>{teamsState?.newTeam[0]?.team?.teamName}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <h2 className="border-bottom">Team Members</h2>
              <div className="d-flex">
                <FaUsers className="icon-design" />
                <h6 className="" style={{ color: "dimgrey" }}>
                  Team Members:
                </h6>
              </div>
              <ul>

                {teamsState?.newTeam.length > 0 &&
                  teamsState?.newTeam?.map((element,i) => {
                    return <li key={i}>{element.employee.name}</li>;
                  })}
              </ul>

            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">Team Details</h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <GrUserManager className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Project Manager:
                    </h6>
                  </div>
                  <div>{teamsState?.newTeam[0]?.team?.managerName?.name}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <RiTeamLine className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Team Lead:
                    </h6>
                  </div>
                  <div>{teamsState?.newTeam[0]?.team?.teamLeadName?.name}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsCalendar2Date className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Start Date:
                    </h6>
                  </div>
                  <div>
                    {teamsState?.newTeam[0]?.team?.startDate?.slice(0, 10)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewTeam;
