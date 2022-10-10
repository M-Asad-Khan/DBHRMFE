import React, { useEffect, useState } from "react";
import "./viewcandidate.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewCandidateClickedAction,
  updateNewCandidateAction,
} from "src/redux/Candidates/candidates.actions";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { RiSettings2Line } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephoneForward, BsCalendar2Date, BsBagPlus } from "react-icons/bs";
import { candidateRequests } from "src/API/CandidateApi";
import { CLink, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from "@coreui/react";
import { toast } from "react-toastify";


const ViewCandidate = () => {

  const hrState = useSelector((state) => state.candidate);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState({
    footer:'Arooba Saghir\n'+
    'HR Executive Devbox Private Ltd.\n'+
    'mob: +92 (423) 518 9250 address: 253 F1, Wapda Town, Lahore\n'+
    'web: www.devbox.co\n'

  })
  const [fieldsWithError, setFieldsWithError] = useState({
    emailTitle: false,
    greating: '',
    heading: '',
    emailMessage: false,
    to: '',
    footer:''

  });
  const [errorInfo, setErrorInfo] = useState({});

  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(updateIsViewCandidateClickedAction(false));
    dispatch(updateNewCandidateAction({}));
  };


  useEffect(() => {

    setEmail({
      ...email,
      to: hrState.newCandidate.email,
      name: hrState.newCandidate.FirstName
    })


  }, [])

  const doValidation = () => {
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = { ...errorInfo };


    Object.entries(fieldsWithError).forEach((x) => {

      if (email !== undefined) {
        if (email.title) {

          tempFieldsWithError[x[0]] = true;
          tempErrorInfo[x[0]] = "Please enter required fields";
          isError = true;

        } else {
          tempFieldsWithError[x[0]] = true;
          tempErrorInfo[x[0]] = "Please enter required fields";
          isError = true;
        }
      }
    });

    setErrorInfo(tempErrorInfo);
    setFieldsWithError(tempFieldsWithError);
    Object.entries(tempFieldsWithError).forEach((x) => {
      if (x[1] === true) {
        isError = true;
      }
    });
    // console.log("isError", isError);
    return isError;
  };

  function handleChange(evt) {

    const value = evt.target ? evt.target.value : evt.value;
    const name = evt.target ? evt.target.name : evt.field;

    setEmail({
      ...email,
      [name]: value,
    })
  }


  const sendEmail = async () => {
    email.emailMessage=email.emailMessage.split(/\r?\n/)
    email.footer=email.footer.split(/\r?\n/)

    const res = await candidateRequests.sendInterviewEmail(email);
    if(!res.error){
      toast.success("Email Sent !");
    }


  }
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
                    style={{ "width": "200px", "height": "200px" }}
                    src={hrState?.newCandidate?.picture}
                    data-holder-rendered="true"
                  />
                </div>
                <div className="text-center">
                  <h2>{hrState?.newCandidate?.FirstName + " " + hrState.newCandidate.lastName}</h2>
                  <CButton
                    className="btn-block btn-primary"
                    onClick={() => setVisible(!visible)}
                  >


                    Interview Invite
                  </CButton>
                  <h6 className="mx-auto" style={{ color: "dimgrey" }}>
                    {hrState.newCandidate.resumelink ?
                      <CLink
                        href={hrState.newCandidate.resumelink}
                        target="_blank"
                      >
                        {hrState.newCandidate.FirstName}  Resume Link
                      </CLink>
                      : <></>}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>



        <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Send Interview Invite</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">
                  Email Title<span className="text-danger"> *</span>
                </label>
                <input
                  className={
                    fieldsWithError.emailTitle === true ? "redBorder" : ""
                  }
                  value={email.title}
                  onChange={handleChange}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter your email title"
                />{" "}
                {fieldsWithError.title === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.lastName}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">
                  Candidate Email<span className="text-danger"> *</span>
                </label>
                <input
                  disabled
                  className={
                    fieldsWithError.to === true ? "redBorder" : ""
                  }
                  value={email.to}
                  onChange={handleChange}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter your email title"
                />{" "}
                {fieldsWithError.to === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.to}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">
                  Greating Message<span className="text-danger"> *</span>
                </label>
                <input
                  className={
                    fieldsWithError.greating === true ? "redBorder" : ""
                  }
                  value={email.greating}
                  onChange={handleChange}
                  type="text"
                  id="greating"
                  name="greating"
                  placeholder="Enter your email greating"
                />{" "}
                {fieldsWithError.greating === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.greating}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">
                  Heading<span className="text-danger"> *</span>
                </label>
                <input
                 
                  className={
                    fieldsWithError.heading === true ? "redBorder" : ""
                  }
                  value={email.heading}
                  onChange={handleChange}
                  type="text"
                  id="heading"
                  name="heading"
                  placeholder="Enter your email heading"
                />{" "}
                {fieldsWithError.heading === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.heading}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>



            <div className="form-group col-sm-12 flex-column d-flex">
              <label className="form-control-label px-3">
                Email Message<span className="text-danger"> *</span>
              </label>
              <textarea
                className={
                  fieldsWithError.emailMessage === true ? "redBorder" : ""
                }
                style={{ height: "330px" }}
                value={email.emailMessage}
                onChange={handleChange}
                type="textarea"
                id="emailMessage"
                name="emailMessage"
                placeholder="Enter your email email Message"
              />{" "}
              {fieldsWithError.emailMessage === true ? (
                <>
                  <label className="error form-control-label px-3">
                    {errorInfo.emailMessage}
                  </label>{" "}
                </>
              ) : (
                ""
              )}
            </div>





            <div className="form-group col-sm-12 flex-column d-flex">
              <label className="form-control-label px-3">
                Email Signature<span className="text-danger"> *</span>
              </label>
              <textarea
              disabled
                className={
                  fieldsWithError.footer === true ? "redBorder" : ""
                }
                style={{ height: "230px" }}
                value={email.footer}
                onChange={handleChange}
                type="textarea"
                id="footer"
                name="footer"
                placeholder="Enter your email email signature"
              />{" "}
              {fieldsWithError.footer === true ? (
                <>
                  <label className="error form-control-label px-3">
                    {errorInfo.footer}
                  </label>{" "}
                </>
              ) : (
                ""
              )}
            </div>




          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
            <CButton color="primary" onClick={() => sendEmail()}>Send  Email</CButton>
          </CModalFooter>
        </CModal>

        <div className="row">
          <div className="col-sm-12">
            <div className="card" >
              <h2 className="border-bottom">Personal Details</h2>
              <div className="d-flex justify-content-between" >
                <div className="d-flex">
                  <FiUser className="icon-design" />
                  <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                    Gender:
                  </h6>
                </div>
                <div className='w-50 text-right'>{hrState?.newCandidate?.gender}</div>
              </div>

              <div className="d-flex justify-content-between" >
                <div className="d-flex">
                  <RiSettings2Line className="icon-design" />
                  <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                    Status:
                  </h6>
                </div>
                <div className='w-50 text-right'>{hrState?.newCandidate?.status}</div>
              </div>
              <h2 className="border-bottom">Contact Details</h2>
              <div className="d-flex justify-content-between" >

                <div className="d-flex">
                  <BsTelephoneForward className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Phone Number:
                  </h6>
                </div>
                <div className='w-50 text-right'>{hrState?.newCandidate?.phoneNumber}</div>
              </div>

              <div className="d-flex justify-content-between" >
                <div className="d-flex">
                  <AiOutlineMail className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Email:
                  </h6>
                </div>
                <div className='w-50 text-right'>{hrState?.newCandidate?.email}</div>
              </div>

              <h2 className="border-bottom">Skills</h2>




              <div className="d-flex justify-content-between" >
                <div className="d-flex">
                  <RiSettings2Line className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Skills:
                  </h6>
                </div>
                <div className='w-50 text-right'>{hrState?.newCandidate?.skills}</div>
              </div>
              <div className="d-flex justify-content-between" >
                <div className="d-flex">
                  <AiOutlineMail className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Position:
                  </h6>
                </div>
                <div className='w-50 text-right'>{hrState?.newCandidate?.postAppliedFor?.jobTitle}</div>
              </div>
              <div className="d-flex justify-content-between" >
                <div className="d-flex">
                  <BsCalendar2Date className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Applied Date:
                  </h6>
                </div>
                <div className='w-50 text-right'>{hrState?.newCandidate?.AppliedDate?.slice(0, 10)}</div>
              </div>

            </div>
          </div>

          {/* <div className="col-sm-4">
            <div className="card" >
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">Contact Details</h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                  <BsTelephoneForward className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Phone Number:
                    </h6>
                  </div>
                  <div className='w-50 text-right'>{hrState?.newCandidate?.phoneNumber}</div>
                </div>

                
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <AiOutlineMail className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Email:
                    </h6>
                  </div>
                  <div className='w-50 text-right'>{hrState?.newCandidate?.email}</div>
                </div>
                
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <BsCalendar2Date className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Applied Date:
                  </h6>
                </div>
                <div className='w-50 text-right'>{hrState?.newCandidate?.AppliedDate?.slice(0, 10)}</div>
              </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card">
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">Details</h2>
               
                  

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <RiSettings2Line className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Skills:
                    </h6>
                  </div>
                  <div className='w-50 text-right'>{hrState?.newCandidate?.skills}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <AiOutlineMail className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Position:
                    </h6>
                  </div>
                  <div className='w-50 text-right'>{hrState?.newCandidate?.postAppliedFor?.jobTitle}</div>
                </div>
                <div></div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default ViewCandidate;
