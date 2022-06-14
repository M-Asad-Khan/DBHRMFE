import React from 'react'
import "./viewJobposting.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewPostingClickedAction,
  updateNewPostingAction,
} from "src/redux/jobPosting/jobPosting.actions";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { RiSettings2Line } from "react-icons/ri";
import {  VscPersonAdd } from "react-icons/vsc";
import { BsCalendar2Date,BsBagPlus } from "react-icons/bs";
const ViewJobposting = () => {
    const hrState = useSelector((state) =>  state.jobPosting);

    const dispatch = useDispatch();
    const handleCancel = () => {
      dispatch(updateIsViewPostingClickedAction(false));
      dispatch(updateNewPostingAction({}));
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
                    <h2>{hrState?.newPosting?.jobTitle}</h2>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="row">
            <div className="col-sm-4">
              <div className="card" style={{ height: "338px" }}>
                <h2 className="border-bottom">Job Details</h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FiUser className="icon-design" />
                    <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                      Department:
                    </h6>
                  </div>
                  <div className='w-50 text-right'>{hrState?.newPosting?.department}</div>
                </div>
                
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaUsers className="icon-design" />
                    <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                      Reports To:
                    </h6>
                  </div>
                  <div className='w-50 text-right'>{hrState?.newPosting.managerName.name}</div>
                </div>
              </div>
            </div>
  
            <div className="col-sm-4">
              <div className="card" style={{ height: "338px" }}>
                <div className="row d-flex justify-content-center">
                  <h2 className="border-bottom">Positions Details</h2>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                    <VscPersonAdd className="icon-design" />
                      <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                        Vacant Positions:
                      </h6>
                    </div>
                    <div className='w-50 text-right'>{hrState?.newPosting?.vacantPositions}</div>
                  </div>

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsCalendar2Date className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Effective Date:
                    </h6>
                  </div>
                  <div className='w-50 text-right'>{hrState?.newPosting?.effectiveDate?.slice(0, 10)}</div>
                </div>
                </div>
              </div>
            </div>
  
            <div className="col-sm-4">
              <div className="card" style={{ height: "338px" }}>
                <div className="row d-flex justify-content-center">
                  <h2 className="border-bottom">Work Details</h2>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                    <BsBagPlus className="icon-design" />
                      <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                        Work Experience:
                      </h6>
                    </div>
                    <div className='w-50 text-right'>{hrState?.newPosting?.workExperience}</div>
                  </div>
  
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <RiSettings2Line className="icon-design" />
                      <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                        Qualification:
                      </h6>
                    </div>
                    <div className='w-50 text-right'>{hrState?.newPosting?.qualification}</div>
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

export default ViewJobposting
