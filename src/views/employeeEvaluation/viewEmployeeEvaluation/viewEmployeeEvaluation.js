import React, { useState } from "react";
import "./viewEmployeeEvaluation.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewEmpEvaluationClickedAction,
  updateNewEmployeeEvaluationAction
} from "src/redux/EmployeeEvaluation/employeeEvaluation.action";
import { employeeEvaluationRequests } from "src/API/employeeEvaluationApi";
import { IoArrowBackSharp } from "react-icons/io5";
import { GrUserSettings } from "react-icons/gr";
import { BsHandThumbsUp } from "react-icons/bs";
import { GiPlayerTime } from "react-icons/gi";
import { FaUsers, FaHandRock, FaUserClock, FaUsersCog } from "react-icons/fa";
import { RiUserSearchLine, RiUserFollowLine, RiTimeLine } from "react-icons/ri";
import { FcIdea } from "react-icons/fc";
import { MdPermDataSetting } from "react-icons/md";
const viewEmployeeEvaluation = () => {
  const evaluationState = useSelector((state) => state.employeeEvaluation);

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(updateIsViewEmpEvaluationClickedAction(false));
    dispatch(updateNewEmployeeEvaluationAction({}));
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
                    src="http://devbox.co/wp-content/uploads/2016/09/logo2-1.png"
                    data-holder-rendered="true"
                  />
                </div>
                <div className="text-center">
                  <h2>{evaluationState?.newEvaluation?.team?.teamName}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card" style={{ height: "338px" }}>
              <h2 className="border-bottom">Employee Details</h2>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <FaUsers className="icon-design" />
                  <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                    Employee Name:
                  </h6>
                </div>
                <div>{evaluationState?.newEvaluation?.employee?.name}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <GrUserSettings className="icon-design" />
                  <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                    Work Quality:
                  </h6>
                </div>
                <div>{evaluationState?.newEvaluation?.employeeWorkQuality}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <RiUserSearchLine className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Employee Observation:
                  </h6>
                </div>
                <div>{evaluationState?.newEvaluation?.employeeObservation}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <FaHandRock className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Employee Strength:
                  </h6>
                </div>
                <div>{evaluationState?.newEvaluation?.employeeStrength}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <GiPlayerTime className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Employee Discipline:
                  </h6>
                </div>
                <div>{evaluationState?.newEvaluation?.employeeDiscipline}</div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">Work Details</h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <RiUserFollowLine className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Decision Ability:
                    </h6>
                  </div>
                  <div>
                    {evaluationState?.newEvaluation?.decisionMakingAbility}
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <MdPermDataSetting className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Productivity:
                    </h6>
                  </div>
                  <div>{evaluationState?.newEvaluation?.productivity}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaUserClock className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Punctuality:
                    </h6>
                  </div>
                  <div>{evaluationState?.newEvaluation?.punctuality}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaUsersCog className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Job Knowledge:
                    </h6>
                  </div>
                  <div>
                    {evaluationState?.newEvaluation?.jobKnowledgeAndProficiency}
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaUsersCog className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Involvement in Team:
                    </h6>
                  </div>
                  <div>
                    {
                      evaluationState?.newEvaluation
                        ?.involvementOfWorkerInTeamEffort
                    }
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <RiTimeLine className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Work Consistency:
                    </h6>
                  </div>
                  <div>{evaluationState?.newEvaluation?.workConsistency}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">Suggestions</h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FcIdea className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Suggestions:
                    </h6>
                  </div>
                  <div className="w-50 text-right">{evaluationState?.newEvaluation?.suggestions}</div>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsHandThumbsUp className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Supervisor Recommendations:
                    </h6>
                  </div>
                  <div className="w-50 text-right">
                    {evaluationState?.newEvaluation?.supervisorRecommendations}
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

export default viewEmployeeEvaluation;
