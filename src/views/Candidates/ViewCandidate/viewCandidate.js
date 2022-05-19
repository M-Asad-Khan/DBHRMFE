import React from "react";
import "./viewcandidate.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewCandidateClickedAction,
  updateNewCandidateAction,
} from "src/redux/Candidates/candidates.actions";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { RiSettings2Line } from "react-icons/ri";
import {  AiOutlineMail } from "react-icons/ai";
import { BsTelephoneForward,  BsCalendar2Date,BsBagPlus } from "react-icons/bs";





const ViewCandidate = () => {
  
  const hrState = useSelector((state) => state.candidate);

  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(updateIsViewCandidateClickedAction(false));
    dispatch(updateNewCandidateAction({}));
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
                  <h2>{hrState?.newCandidate?.FirstName}</h2>
                  <h6 className="mx-auto" style={{ color: "dimgrey" }}>
                    {hrState?.newCandidate?.email}
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
                <div>{hrState?.newCandidate?.gender}</div>
              </div>
            
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <RiSettings2Line className="icon-design" />
                  <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                    Status:
                  </h6>
                </div>
                <div>{hrState?.newCandidate?.status}</div>
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
                  <div>{hrState?.newCandidate?.phoneNumber}</div>
                </div>

                
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <AiOutlineMail className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Email:
                    </h6>
                  </div>
                  <div>{hrState?.newCandidate?.email}</div>
                </div>
                
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <BsCalendar2Date className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Applied Date:
                  </h6>
                </div>
                <div>{hrState?.newCandidate?.AppliedDate?.slice(0, 10)}</div>
              </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">Details</h2>
               
                  

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <RiSettings2Line className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Skills:
                    </h6>
                  </div>
                  <div>{hrState?.newCandidate?.skills}</div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewCandidate;
