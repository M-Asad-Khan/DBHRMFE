import React, { useEffect } from "react";
import "./viewTicket.css";
import { useSelector, useDispatch } from "react-redux";

import { IoArrowBackSharp } from "react-icons/io5";
import { CButton } from "@coreui/react";
import {
  isViewTicketClickedAction,
  viewTicketDataAction,
  newTicketCommentActions,
  viewTicketCommentsAction
} from "src/redux/HelpDesk/helpDesk.actions";
import moment from "moment";
import { helpDeskRequests } from "src/API/helpDeskApi";

const colors={
  "In Review":"#3399FF",
  "In Progress":"#E59F14",
  "Resolved":"green",
  "Declined":"#E55353"
}
const ViewTicket = () => {

  const currentUser = useSelector((state) => state.login.currentUser);
  const state = useSelector((state) => state.helpDesk);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchComments();

  }, [state.isViewTicketClicked])



  const fetchComments = async () => {
    const ticketComments = await helpDeskRequests.getTicketsCommentApi(state?.viewTicketData?.id);
    if (!ticketComments.error) {
      dispatch(
        viewTicketCommentsAction(ticketComments.data)
      );
    }
  }

  const handleCancel = () => {
    dispatch(isViewTicketClickedAction(false));
    dispatch(viewTicketDataAction({}));
  };

  const postCommnet = async () => {
    if (state.ticketComments.length == 0) {
      state.newTicketComment.parentcommentid = state.viewTicketData.id;
    }
    else {
      state.newTicketComment.parentcommentid = state.ticketComments[state.ticketComments.length - 1].id;
    }
    state.newTicketComment.ticketid = state.viewTicketData.id;
    state.newTicketComment.employeeid = currentUser?.Profile?.id;


    const result = await helpDeskRequests.addTicketCommentsApi(state.newTicketComment);
    if (!result.error) {

      dispatch(viewTicketCommentsAction(result.data));
      dispatch(newTicketCommentActions({}));
    }

  }

  function handleChange(evt) {
    const value = evt.target.value;
    dispatch(
      newTicketCommentActions({
        ...state.newTicketComment,
        [evt.target.name]: value,
      })
    );
  }


  return (
    
    <>
      <div>
        <div className="row">
          <div className="col-sm-6">
            <div className="card"  style={{height:"400px",overflow: "scroll"}}>
              <div className="">
                <button
                  className="btn btn-outline-primary"
                  onClick={handleCancel}
                >
                  <IoArrowBackSharp />
                </button>
              </div>
              <h2 className="border-bottom">Ticket Details</h2>
              <div className="d-flex justify-content-between" style={{ marginBottom: "10px",  }}>
                <div className="d-flex">
                 
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" ,padding:"5px"}}>
                    Title
                  </h6>
                </div>
                <div className='w-50 text-right' style={{padding:"5px"}}>{state?.viewTicketData?.title}</div>
              </div>

              <div className="d-flex justify-content-between" style={{ marginBottom: "10px" ,backgroundColor: "#3D4B64",borderRadius:"20px"}}>
                <div className="d-flex" style={{padding:"5px"}}>
                  
                  <h6 className="d-flex w-full" style={{ color: "white" }}>
                    Category
                  </h6>
                </div>
                <div className='w-50 text-right' style={{color:"white",padding:"5px"}}>{state?.viewTicketData?.category}</div>
              </div>

              <div className="d-flex justify-content-between" style={{ marginBottom: "10px",  }}>
                <div className="d-flex" style={{padding:"5px"}}>
                
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Status
                  </h6>
                </div>
                <div className='w-50 text-right' style={{fontWeight:"bold",padding:"5px", color:colors[state?.viewTicketData?.status]}}>{state?.viewTicketData?.status}</div>
              </div>

              <div className="d-flex justify-content-between" style={{ marginBottom: "10px", backgroundColor: "#3D4B64",borderRadius:"20px" }}>
                <div className="d-flex" style={{padding:"5px"}}>
                  
                  <h6 className="d-flex w-full" style={{ color: "white" }}>
                    Description
                  </h6>
                </div>
                <div className='w-50 text-right'  style={{ color: "white",padding:"5px" }}>{state?.viewTicketData?.description}</div>
              </div>

             
              <div className="d-flex justify-content-between" style={{ marginBottom: "10px",  }}>
                <div className="d-flex">
                
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" ,padding:"5px"}}>
                    Ticket Date
                  </h6>
                </div>

                <div className='w-50 text-right' style={{padding:"5px"}}>{moment(state?.viewTicketData?.date).format("DD MMM YYYY")}</div>
              </div>
            </div>
          </div>


          <div className="col-sm-6">
          {state?.ticketComments.length > 0 &&
            <>
             
           
                <div className="card" style={{height:"400px",overflow: "scroll"}}>
                <h2 className="border-bottom">Ticket Comments</h2>
                  {state?.ticketComments?.map((comment,index) => (
                    <div className="form-card">
                      <p style={{ color: comment.employee.id==currentUser?.user.id?"#3D4B64":"green" }}>{comment.employee.id==currentUser?.user.id?"You": comment.employee.name}</p>
                      <div className="d-flex" >
                        <p style={{ backgroundColor: comment.employee.id==currentUser?.user.id?"#3D4B64":"green", color: "white", borderRadius: "10px", height: "30px", paddingLeft: "12px", paddingRight: "12px"}}>{comment.message}</p>
                        {/* <p style={{ height: "30px", paddingLeft: "12px", paddingRight: "12px" }}>{moment(comment.createdAt).format("DD MMM YYYY hh:mm:A")}</p> */}
                      </div>
                    </div>

                  ))}

                </div>
              
            </>
          }

            </div>



        </div>

        <div className="row d-flex justify-content-center">

        

          {state?.viewTicketData?.status != "Resolved" && state?.viewTicketData?.status != "Declined" ?
            <>
              <h2 className="border-bottom">Post new comment</h2>
              <div className="row justify-content-between text-left">
                <div className="form-group col-12 flex-column d-flex">

                  <textarea

                    value={state?.newTicketComment.message?state?.newTicketComment.message:""}
                    onChange={handleChange}

                    id="message"
                    name="message"
                    placeholder="Write your comment here."
                    rows="4"

                  ></textarea>

                </div>
              </div>
              <div className="form-group col-sm-6">
                <CButton
                  className="btn-block btn-primary"
                  onClick={() => postCommnet()}
                >
                  Post
                </CButton>
              </div>
            </>
            : <></>
          }


        </div>

      </div>
    </>
  );
};
export default ViewTicket;
